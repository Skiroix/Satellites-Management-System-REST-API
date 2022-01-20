export type ErrorType = { message: string; status: number };

class CustomError extends Error {
	public status: number;
	constructor(status: number, message: string) {
		super(message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError);
		}

		this.status = status;
	}
}

export default CustomError;
