import { validations } from "../lib/validationHelpers/validations.js";
import { validateSpace } from "../lib/validationHelpers/validateSpace.js";
import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { validateMinLength } from "../lib/validationHelpers/validateMinLength.js";
import { response } from "../utils/response.js";

export const controlEditProfileInput = (req, res, next) => {
  if (!req.body.inputs) return res.json(response(false, "Inputları doğru girin!"));
  const validName = new validations([
    new validateMaxLength(req.body.inputs.name.value, "Isim/Soyisim", 64),
    new validateMinLength(req.body.inputs.name.value, "Isim/Soyisim", 3),
  ]);
  if (validName.resultValidations().length) return res.json(response(false, "Geçersiz Isim/Soyisim!"));
  // const validUsername = new validations([
  //   new validateSpace(req.body.inputs.username.value, "Kullanıcı Adı"),
  //   new validateMinLength(req.body.inputs.username.value, "Kullanıcı Adı", 3),
  //   new validateMaxLength(req.body.inputs.username.value, "Kullanıcı Adı", 16),
  // ]);
  // if (validUsername.resultValidations().length) return res.json(response(false, "Geçersiz Kullanıcı Adı!"));
  if (req.body.inputs.biography.value) {
    const validBiography = new validations([new validateMaxLength(req.body.inputs.biography.value, "Biyografi", 128)]);
    if (validBiography.resultValidations().length) return res.json(response(false, "Biyografi çok uzun! Max 128"));
  }
  next();
};
