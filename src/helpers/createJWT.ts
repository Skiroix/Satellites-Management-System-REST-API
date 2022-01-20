import jwt from "jsonwebtoken";

export default function createJWT(_id: string, email: string) {
	const JWT_SECRET = process.env.JWT_SECRET as string;
	return jwt.sign({ _id, email }, JWT_SECRET);
}
