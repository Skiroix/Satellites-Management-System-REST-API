import { Request, Response } from "express";
import comparePasswords from "../helpers/comparePasswords";
import createNewPassword from "../helpers/createNewPassword";
import CustomError from "../helpers/CustomError";
import { UserModel } from "../models";
import {
	UserRegisterRequestBody,
	UserLoginRequestBody,
	CatchError,
} from "../types";
import createJWT from "../helpers/createJWT";
import handleError from "../helpers/handleError";

export async function registerUser(req: Request, res: Response) {
	try {
		const { email, password, fullName, country, isRedButton } =
			res.locals as UserRegisterRequestBody;
		const hashedPassword = await createNewPassword(password);
		const doc = new UserModel({
			email,
			password: hashedPassword,
			fullName,
			country,
			isRedButton,
			createdAt: new Date().getTime(),
		});
		await doc.save();
		const _id = doc.id;
		const token = createJWT(_id, email);

		return res.status(200).json({
			status: 200,
			message: "Successfully registered an account.",
			token: token,
			president: doc,
		});
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function loginUser(req: Request, res: Response) {
	try {
		const { email, password } = res.locals as UserLoginRequestBody;
		const doc = await UserModel.findOne({ email: email });
		if (!doc)
			throw new CustomError(404, "User with the given email does not exist.");
		const hashedPassword = doc.password;

		const isCorrect = await comparePasswords(password, hashedPassword);
		if (!isCorrect)
			throw new CustomError(401, `Entered wrong password for the ${email}.`);

		const _id = doc.id;
		const token = createJWT(_id, email);
		return res.status(200).json({
			status: 200,
			message: "User successfully logged in.",
			token,
			president: doc,
		});
	} catch (e) {
		handleError(res, e as CatchError);
	}
}
