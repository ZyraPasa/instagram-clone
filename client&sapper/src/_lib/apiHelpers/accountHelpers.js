import { validateSpace, maxLenghtValidator, minLenghtValidator } from "../helpers/validationHelper";
import { changeWhirlpool } from "../helpers/whirlpoolHelper";
import { init } from "../mysql";

const db = init();

export const controlChangePasswordInput = (input) => {
  if (!validateSpace(input.oldPassword.value)) return { status: false, messsage: "Eski şifrede boşluk kullanılamaz!" };
  if (!minLenghtValidator(input.oldPassword.value, 8))
    return { status: false, message: "Eski şifre en az 8 karakter olmak zorunda" };
  if (!maxLenghtValidator(input.oldPassword.value, 32))
    return { status: false, message: "Eski şifre en fazla 32 karakter olabilir!" };
  //
  if (!validateSpace(input.newPassword.value)) return { status: false, messsage: "Yeni şifrede boşluk kullanılamaz!" };
  if (!minLenghtValidator(input.newPassword.value, 8))
    return { status: false, message: "Yeni şifre en az 8 karakter olmak zorunda" };
  if (!maxLenghtValidator(input.newPassword.value, 32))
    return { status: false, message: "Yeni şifre en fazla 32 karakter olabilir!" };
  //
  if (input.newPassword.value != input.validateNewPassword.value)
    return { status: false, message: "Yeni şifreler birbiri ile uyuşmuyor!" };
  return { status: true, message: "Başarılı bir şekilde kontrol işlemleri tamamlandı!" };
};

export const changePassword = async (input, accountId) => {
  const newPassword = changeWhirlpool(input.newPassword.value);
  const oldPassword = changeWhirlpool(input.oldPassword.value);
  try {
    const controlWhirlpoolPassword = await db.query(`SELECT password FROM accounts WHERE id = ? AND password = ?;`, [
      accountId,
      oldPassword,
    ]);
    if (!controlWhirlpoolPassword.length) return { status: false, message: "Eski şifre yanlış!" };
    const updatePassword = await db.query(`UPDATE accounts SET password = ? WHERE id = ?;`, [newPassword, accountId]);
    if (updatePassword.affectedRows == 0) return { status: false, message: "Bilinmeyen bir hata oluştu!" };
    return { status: true, message: "Başarılı bir şekilde şifreniz değiştirildi!" };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};
