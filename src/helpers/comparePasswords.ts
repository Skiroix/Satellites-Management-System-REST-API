import bcrypt from "bcrypt";

export default async function comparePasswords(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}
