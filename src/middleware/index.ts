import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import CustomError from "../helpers/CustomError";
import getCountries from "../helpers/getCountries";
import handleError from "../helpers/handleError";
import { validateEmail, validatePassword } from "../helpers/validate";
import verifyJWT from "../helpers/verifyJWT";
import { SatelliteModel, UserModel } from "../models";
import { CatchError, UserRegisterRequestBody } from "../types";

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const auth = req.headers.authorization;
		if (!auth) throw new CustomError(401, "Authorization process failed.");

		const token = auth.split(" ")[1];
		const verified = verifyJWT(token);
		res.locals.email = verified.email;
		res.locals.userId = verified._id;
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export function verifyEmail(req: Request, res: Response, next: NextFunction) {
	try {
		const { email } = res.locals;
		if (!validateEmail(email))
			throw new CustomError(400, "Provided email is invalid.");

		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export function verifyPassword(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { password } = res.locals;
		if (!validatePassword(password))
			throw new CustomError(400, "Provided password is invalid.");

		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function isSatelliteOwner(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log("isSatelliteOwner");
	try {
		const { satelliteId, userId } = res.locals;
		const found = SatelliteModel.findOne({
			_id: new Types.ObjectId(satelliteId),
			ownedBy: new Types.ObjectId(userId),
		});

		if (!found)
			throw new CustomError(
				401,
				"You don't have the permission to access this satellite."
			);
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function checkSatelliteExist(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id =
			req.params.slug || req.body.satelliteId || res.locals.satelliteId;
		const exist = await SatelliteModel.exists({ _id: new Types.ObjectId(id) });
		if (!exist) throw new CustomError(404, "There is no such satellite.");

		res.locals.satelliteId = id;
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export function checkSatelliteBodyRequest(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const method = req.method as "POST" | "PUT";
		const {
			sideNumber,
			producent,
			model,
			version,
			launchedAt,
			numberOfMissiles,
			orbitAltitude,
			isAI,
			builtAt,
		} = req.body;
		const body = {
			sideNumber,
			producent,
			model,
			version,
			launchedAt,
			numberOfMissiles,
			orbitAltitude,
			isAI,
			builtAt,
		};

		switch (method) {
			case "POST":
				{
					const invalid = Object.values(body).some(
						(field) => field == undefined
					);
					if (invalid) throw new CustomError(400, "All fields are required.");
				}
				break;
			case "PUT":
				{
					const invalid = Object.values(body).every(
						(field) => field == undefined
					);
					if (invalid)
						throw new CustomError(400, "At least one field is required.");
				}
				break;
			default:
				throw new CustomError(
					405,
					"The only availabe methods are: POST & PUT."
				);
		}
		res.locals = { ...res.locals, ...body };
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function checkLoginRequest(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			throw new CustomError(400, "All fields are required.");

		res.locals = { ...res.locals, email, password };
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function checkAvailableCountry(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const countries = getCountries();
		const { country } = res.locals;

		type Countries = keyof typeof countries;

		if (!Object.keys(countries).includes(country))
			throw new CustomError(404, `Country doesn't exist.`);
		if (await UserModel.exists({ country }))
			throw new CustomError(
				401,
				`${countries[country as Countries]} already has registered president.`
			);
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function checkRegisterRequest(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email, password, fullName, country, isRedButton } =
			req.body as UserRegisterRequestBody;

		const reject = !email || !password || !fullName || !country || !isRedButton;

		if (reject) throw new CustomError(400, "All fields are required.");

		res.locals = {
			...res.locals,
			email,
			password,
			fullName,
			country,
			isRedButton,
		};
		next();
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function checkUserExist(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { email } = res.locals;
		const doc = await UserModel.findOne({ email });
		if (!doc) next();
		else
			throw new CustomError(
				403,
				`Email: ${email} is already used to describe other account.`
			);
	} catch (e) {
		handleError(res, e as CatchError);
	}
}
