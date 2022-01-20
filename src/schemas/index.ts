import { Schema, Types } from "mongoose";
import { MaybeObject } from "../types";

// USER
export interface UserSchema {
	_id?: Types.ObjectId;
	fullName: string;
	country: string;
	email: string;
	password: string;
	isRedButton: boolean;
	createdAt: number;
}

export const UserSchema = new Schema<UserSchema>(
	{
		fullName: { type: String, required: true },
		country: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		createdAt: { type: Number, required: true },
	},
	{ collection: "user-accounts" }
);

export type MaybeUser = MaybeObject<UserSchema>;

// SATELLITE
export interface SatelliteSchema {
	_id?: Types.ObjectId;
	sideNumber: string;
	producent: string;
	model: string;
	version: string;
	launchedAt: string;
	numberOfMissiles: number;
	orbitAltitude: number; // x km
	isAI: boolean;
	builtAt: number;
	createdAt: number;
	updatedAt: number | null;
	ownedBy: string;
}

export const SatelliteSchema = new Schema<SatelliteSchema>(
	{
		sideNumber: { type: String, required: true },
		producent: { type: String, required: true },
		model: { type: String, required: true },
		version: { type: String, required: true },
		builtAt: { type: Number, required: true },
		launchedAt: { type: String, required: true },
		numberOfMissiles: { type: Number, required: true },
		orbitAltitude: { type: Number, required: true },
		isAI: { type: Boolean, required: true },
		createdAt: { type: Number, required: true },
		updatedAt: { type: Number, required: false },
		ownedBy: { type: String, required: true },
	},
	{ collection: "satellites" }
);

export type MaybeSatellite = MaybeObject<SatelliteSchema>;
