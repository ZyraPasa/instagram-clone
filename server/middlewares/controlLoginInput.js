import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { validateMinLength } from "../lib/validationHelpers/validateMinLength.js";
import { validateSpace } from "../lib/validationHelpers/validateSpace.js";
import { validations } from "../lib/validationHelpers/validations.js";
import { response } from "../utils/response.js";

export const controlLoginInput = (req, res, next) => {
  if (!req.body.inputs) return res.json(response(false, "Inputları doğru girin!"));

  // trim

  const validUsername = new validations([
    new validateMaxLength(req.body.inputs.username.value, "Kullanıcı Adı", 16),
    new validateMinLength(req.body.inputs.username.value, "Kullanıcı Adı", 3),
    new validateSpace(req.body.inputs.username.value, "Kullanıcı Adı"),
  ]);
  if (validUsername.resultValidations().length) return res.json(response(false, "Geçersiz Email!"));
  const validPassword = new validations([
    new validateSpace(req.body.inputs.password.value, "Şifre"),
    new validateMinLength(req.body.inputs.password.value, "Şifre", 6),
    new validateMaxLength(req.body.inputs.password.value, "Şifre", 21),
  ]);
  if (validPassword.resultValidations().length) return res.json(response(false, "Geçersiz Şifre!"));
  next();
};
