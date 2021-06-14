import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));
};

/* oldPassword = req.body, password=password saved in db */
export const checkPassword = (oldPassword: string, password: string) => {
  return bcrypt.compareSync(oldPassword, password);
};
