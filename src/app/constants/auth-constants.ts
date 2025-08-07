export const usernameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,8}$/;
export const idRegex = /^[a-zA-Z0-9]{4,10}$/;
export const passwordRegex = /^[a-zA-Z0-9]{4,10}$/;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = "7d";
