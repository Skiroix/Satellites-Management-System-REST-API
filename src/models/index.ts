import { model } from "mongoose";
import { UserSchema, SatelliteSchema } from "../schemas";

export const UserModel = model<UserSchema>("User", UserSchema);

export const SatelliteModel = model<SatelliteSchema>(
	"Satellite",
	SatelliteSchema
);
