import { Router } from "express";

import { loginUser, registerUser } from "../controllers/users";
import {
	verifyEmail,
	verifyPassword,
	checkRegisterRequest,
	checkLoginRequest,
	checkUserExist,
} from "../middleware";

const router = Router();

router.post(
	"/register",
	[checkRegisterRequest, verifyEmail, verifyPassword, checkUserExist],
	registerUser
);
router.post(
	"/login",
	[checkLoginRequest, verifyEmail, verifyPassword],
	loginUser
);

export default router;
