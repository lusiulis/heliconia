import { compare, genSalt, hash } from 'bcrypt';

const saltRounds = 10;

export const jwt_secret = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : 'secret_jwt';

export const encrypt = async (password: string) => {
  const salt = await genSalt(saltRounds);
  return await hash(password, salt);
};

export const compareEncyrpt = async (
  password: string,
  hashedPassword: string
) => await compare(password, hashedPassword);
