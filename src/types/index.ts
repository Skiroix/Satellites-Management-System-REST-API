import CustomError from "../helpers/CustomError";

export type JWTVerified = { _id: string; email: string };

export type SatelliteCreateRequestBody = {
	sideNumber: string;
	producent: string;
	model: string;
	version: string;
	launchedAt: string;
	numberOfMissiles: number;
	orbitAltitude: number; // x km
	isAI: boolean;
	builtAt: number;
};
export type SatelliteUpdateRequestBody =
	MaybeObject<SatelliteCreateRequestBody>;

export type UserRegisterRequestBody = {
	fullName: string;
	country: string;
	email: string;
	password: string;
	isRedButton: boolean;
};
export type UserLoginRequestBody = {
	email: string;
	password: string;
};
// ---
export type CatchError = Error | CustomError;

export type MaybeObject<T> = {
	[Property in keyof T]+?: T[Property];
};
