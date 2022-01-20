import { Router } from "express";

import {
	deleteSatellite,
	updateSatellite,
	addSatellite,
	getSatellite,
	getSatellites,
} from "../controllers/satellites";
import {
	authenticate,
	checkSatelliteExist,
	checkSatelliteBodyRequest,
	isSatelliteOwner,
} from "../middleware";

const router = Router();

router.get("/", [authenticate], getSatellites);
router.get("/:slug", [authenticate, checkSatelliteExist], getSatellite);
router.post("/", [authenticate, checkSatelliteBodyRequest], addSatellite);
router.put(
	"/:slug?",
	[
		authenticate,
		checkSatelliteExist,
		isSatelliteOwner,
		checkSatelliteBodyRequest,
	],
	updateSatellite
);
router.delete(
	"/:slug",
	[authenticate, checkSatelliteExist, isSatelliteOwner],
	deleteSatellite
);

export default router;
