export function validateEmail(email: string): boolean {
	const regExp =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,255}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,255}[a-zA-Z0-9])?)*$/;

	const check = email.match(regExp);
	if (!check) return false;
	else if (check && email.length > 255) return false;
	return true;
}

export function validatePassword(password: string): boolean {
	const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

	if (!password.match(regExp)) return false;
	return true;
}
