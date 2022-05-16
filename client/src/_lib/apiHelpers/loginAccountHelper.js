import { init } from "../mysql";
import { maxLenghtValidator, minLenghtValidator, validateSpace } from "../helpers/validationHelper";
import { changeWhirlpool } from "../helpers/whirlpoolHelper";

const db = init();

export const accountInputsControl = (account) => {
  // username control
  if (!minLenghtValidator(account.username.value, 8))
    return { status: false, message: "Username en az 8 karakter olmalı!" };
  if (!maxLenghtValidator(account.username.value, 64))
    return { status: false, message: "Username en fazla 64 karakter olabilir!" };
  if (!validateSpace(account.username.value)) return { status: false, message: "Username üzerinde boşluk olamaz!" };

  //password control

  if (!minLenghtValidator(account.password.value, 8))
    return { status: false, message: "Password en az 8 karakter olmalı!" };
  if (!maxLenghtValidator(account.password.value, 64))
    return { status: false, message: "Password en fazla 64 karakter olabilir!" };
  if (!validateSpace(account.username.value)) return { status: false, message: "Username üzerinde boşluk olamaz!" };

  return { status: true };
};

export const accountControl = (account) => {
  const whPassword = changeWhirlpool(account.password.value);
  try {
    const usernameControl = db.query(`SELECT password FROM accounts WHERE username = ?`, [account.username.value]);
    if (!usernameControl.length) return { status: false, message: "Böyle bir hesap bulunamadı!" };
    const passwordControl = db.query(`SELECT id, admin_level FROM accounts WHERE username = ? AND password = ?`, [
      account.username.value,
      whPassword,
    ]);
    if (!passwordControl.length) return { status: false, message: "Hatalı şifre girişi!" };
    return { status: true, id: passwordControl[0].id, isAdmin: passwordControl[0].admin_level > 3 };
  } catch (e) {
    console.log(e);
    return { status: false, message: "Lütfen daha sonra tekrar deneyin!" };
  }
};
