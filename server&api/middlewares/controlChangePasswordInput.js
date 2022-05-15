import { validations } from "../lib/validationHelpers/validations.js";
import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { validateMinLength } from "../lib/validationHelpers/validateMinLength.js";
import { validateSpace } from "../lib/validationHelpers/validateSpace.js";
import { response } from "../utils/response.js";

export const controlChangePasswordInput = (req, res, next) => {
  if (!req.body.inputs) return res.json(response(false, "Inputları doğru girin!"));

  const validOldPassword = new validations([
    new validateSpace(req.body.inputs.oldPassword.value),
    new validateMaxLength(req.body.inputs.oldPassword.value, "Eski Şifre", 21),
    new validateMinLength(req.body.inputs.oldPassword.value, "Eski Şifre", 6),
  ]);
  if (validOldPassword.resultValidations().length) return res.json(response(false, "Geçersiz Eski Şifre!"));
  const validNewPassword = new validations([
    new validateSpace(req.body.inputs.newPassword.value),
    new validateMaxLength(req.body.inputs.newPassword.value, "Yeni Şifre", 21),
    new validateMinLength(req.body.inputs.newPassword.value, "Yeni Şifre", 6),
  ]);
  if (validNewPassword.resultValidations().length) return res.json(response(false, "Geçersiz Yeni Şifre!"));
  const validConfirmPassword = new validations([
    new validateSpace(req.body.inputs.confirmPassword.value),
    new validateMaxLength(req.body.inputs.confirmPassword.value, "Yeni Şifre(tekrar)", 21),
    new validateMinLength(req.body.inputs.confirmPassword.value, "Yeni Şifre(tekrar)", 6),
  ]);
  if (validConfirmPassword.resultValidations().length) return res.json(response(false, "Geçersiz Yeni Şifre(tekrar)!"));

  if (req.body.inputs.newPassword.value !== req.body.inputs.confirmPassword.value)
    return res.json(response(false, "Yeni şifreler birbiri ile uyuşmuyor!"));
  next();
};
