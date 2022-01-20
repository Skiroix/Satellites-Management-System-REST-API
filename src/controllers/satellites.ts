import { Request, Response } from "express";
import { Types } from "mongoose";
import CustomError from "../helpers/CustomError";
import handleError from "../helpers/handleError";
import { SatelliteModel } from "../models";
import { MaybeSatellite } from "../schemas";
import { CatchError } from "../types";

export async function addSatellite(req: Request, res: Response) {
	try {
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
			userId: ownedBy,
		} = res.locals;

		const satellite: MaybeSatellite = {};

		satellite["createdAt"] = new Date().getTime(); // data utworzenia dokumentu
		satellite["updatedAt"] = null; // data wprowadzenia zmian w dokumencie
		satellite["launchedAt"] = launchedAt;
		satellite["builtAt"] = builtAt;
		satellite["orbitAltitude"] = orbitAltitude; // wysokość na orbicie
		satellite["producent"] = producent;
		satellite["model"] = model;
		satellite["version"] = version;
		satellite["sideNumber"] = sideNumber;
		satellite["numberOfMissiles"] = numberOfMissiles;
		satellite["isAI"] = isAI;
		satellite["ownedBy"] = ownedBy;

		const doc = new SatelliteModel(satellite);
		doc
			.save()
			.then((doc) => {
				return res.status(200).json({
					status: 200,
					message: "Successfully added new satellite.",
					satellite: doc,
				});
			})
			.catch((err) => {
				throw new CustomError(500, err);
			});
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function updateSatellite(req: Request, res: Response) {
	try {
		const {
			satelliteId: _id,
			sideNumber,
			producent,
			model,
			version,
			launchedAt,
			numberOfMissiles,
			orbitAltitude,
			isAI,
			builtAt,
		} = res.locals;

		const satellite = {} as MaybeSatellite;

		if (sideNumber !== undefined) satellite.sideNumber = sideNumber;
		if (producent !== undefined) satellite.producent = producent;
		if (model !== undefined) satellite.model = model;
		if (version !== undefined) satellite.version = version;
		if (launchedAt !== undefined) satellite.launchedAt = launchedAt;
		if (numberOfMissiles !== undefined)
			satellite.numberOfMissiles = numberOfMissiles;
		if (orbitAltitude !== undefined) satellite.orbitAltitude = orbitAltitude;
		if (isAI !== undefined) satellite.isAI = isAI;
		if (builtAt !== undefined) satellite.builtAt = builtAt;
		const updatedAt = new Date().getTime();

		SatelliteModel.findByIdAndUpdate(
			_id,
			{ $set: { ...satellite, updatedAt } },
			{ returnDocument: "after" },
			(err, doc) => {
				if (err) throw new CustomError(500, err.message);
				return res.status(200).json({
					status: 200,
					message: "Changes saved successfully.",
					satellite: doc,
				});
			}
		);
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function deleteSatellite(req: Request, res: Response) {
	try {
		const { satelliteId } = res.locals;
		SatelliteModel.findByIdAndDelete(satelliteId, null, (err, doc) => {
			if (err) throw new CustomError(500, err.message);
			return res.status(200).json({
				status: 200,
				message: "Satellite removed successfully.",
				satellite: doc,
			});
		});
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function getSatellite(req: Request, res: Response) {
	try {
		const { satelliteId } = res.locals;
		SatelliteModel.findById(satelliteId, null, null, (err, doc) => {
			if (err) throw new CustomError(500, err.message);
			return res.status(200).json({
				status: 200,
				message: "Satellite found.",
				satellite: doc,
			});
		});
	} catch (e) {
		handleError(res, e as CatchError);
	}
}

export async function getSatellites(req: Request, res: Response) {
	try {
		const { userId } = res.locals;
		SatelliteModel.find(
			{ ownedBy: new Types.ObjectId(userId) },
			null,
			null,
			(err, docs) => {
				if (err) throw new CustomError(500, err.message);
				return res.status(200).json({
					status: 200,
					message: "Satellites found.",
					satellites: docs,
				});
			}
		);
	} catch (e) {
		handleError(res, e as CatchError);
	}
}
