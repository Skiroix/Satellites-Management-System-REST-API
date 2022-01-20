import jwt from "jsonwebtoken";
import { JWTVerified } from "../types";

export default function verifyJWT(token: string) {
	const JWT_SECRET = process.env.JWT_SECRET as string;
	return jwt.verify(token, JWT_SECRET) as JWTVerified;
}
