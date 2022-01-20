import { Router } from "express";

import { loginUser, registerUser } from "../controllers/users";
import {
	verifyEmail,
	verifyPassword,
	checkRegisterRequest,
	checkLoginRequest,
	checkUserExist,
	checkAvailableCountry,
} from "../middleware";

const router = Router();

router.post(
	"/register",
	[
		checkRegisterRequest,
		checkAvailableCountry,
		verifyEmail,
		verifyPassword,
		checkUserExist,
	],
	registerUser
);
router.post(
	"/login",
	[checkLoginRequest, verifyEmail, verifyPassword],
	loginUser
);

export default router;
