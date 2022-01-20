import { Response } from "express";
import { CatchError } from "../types";
import CustomError, { ErrorType } from "./CustomError";

export default function handleError(res: Response, e: CatchError) {
	if (e instanceof CustomError) {
		const { status, message } = e as ErrorType;
		return res.status(status).json({ status, message });
	} else
		return res
			.status(500)
			.json({ status: 500, message: "Internal Server Error" });
}
