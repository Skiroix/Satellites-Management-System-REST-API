import bcrypt from "bcrypt";

export default async function createNewPassword(
	password: string
): Promise<string> {
	return await bcrypt.hash(password, 10);
}
