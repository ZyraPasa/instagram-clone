import { response } from "../utils/response.js";
import { validations } from "../lib/validationHelpers/validations.js";
import { validateEmail } from "../lib/validationHelpers/validateEmail.js";
import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { validateMinLength } from "../lib/validationHelpers/validateMinLength.js";
import { validateSpace } from "../lib/validationHelpers/validateSpace.js";
import { validateUndefined } from "../lib/validationHelpers/validateUndefined.js";

export const controlRegisterInputs = (req, res, next) => {
  if (!req.body.inputs) return res.json(response(false, "Inputları doğru girin!"));

  const validEmail = new validations([
    new validateUndefined(req.body.inputs.email.value, "Email"),
    new validateEmail(req.body.inputs.email.value),
    new validateMaxLength(req.body.inputs.email.value, "Email", 128),
  ]);
  if (validEmail.resultValidations().length) return res.json(response(false, "Geçersiz Email!"));
  const validName = new validations([
    new validateUndefined(req.body.inputs.name.value, "Isim/Soyisim"),
    new validateMaxLength(req.body.inputs.name.value, "Isim/Soyisim", 64),
    new validateMinLength(req.body.inputs.name.value, "Isim/Soyisim", 3),
  ]);
  if (validName.resultValidations().length) return res.json(response(false, "Geçersiz Isim/Soyisim!"));
  const validNick = new validations([
    new validateUndefined(req.body.inputs.nick.value, "Kullanıcı Adı"),
    new validateSpace(req.body.inputs.nick.value, "Kullanıcı Adı"),
    new validateMaxLength(req.body.inputs.nick.value, "Kullanıcı Adı", 16),
    new validateMinLength(req.body.inputs.nick.value, "Kullanıcı Adı", 3),
  ]);
  if (validNick.resultValidations().length) return res.json(response(false, "Geçersiz Kullanıcı Adı!"));
  const validPassword = new validations([
    new validateUndefined(req.body.inputs.password.value, "Şifre"),
    new validateSpace(req.body.inputs.password.value, "Şifre"),
    new validateMinLength(req.body.inputs.password.value, "Şifre", 6),
    new validateMaxLength(req.body.inputs.password.value, "Şifre", 21),
  ]);
  if (validPassword.resultValidations().length) return res.json(response(false, "Geçersiz Şifre!"));
  const validPasswordConfirm = new validations([
    new validateUndefined(req.body.inputs.password_confirm.value, "Şifre(tekrar)"),
    new validateSpace(req.body.inputs.password_confirm.value, "Şifre(tekrar)"),
    new validateMinLength(req.body.inputs.password_confirm.value, "Şifre(tekrar)", 6),
    new validateMaxLength(req.body.inputs.password_confirm.value, "Şifre(tekrar)", 21),
  ]);
  if (validPasswordConfirm.resultValidations().length) return res.json(response(false, "Geçersiz Şifre(tekrar)!"));
  if (req.body.inputs.password.value !== req.body.inputs.password_confirm.value)
    return res.json(response(false, "Girilen şifreler uyuşmuyor!"));
  next();
};
