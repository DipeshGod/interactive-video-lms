import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
};

export const checkPassword = (oldPassword: string, password: string) => {
  return bcrypt.compareSync(oldPassword, password);
};
