import { validations } from "../lib/validationHelpers/validations.js";
import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { validateMinLength } from "../lib/validationHelpers/validateMinLength.js";
import { response } from "../utils/response.js";

export const controlNewMessageInput = (req, res, next) => {
  if (!req.body.inputs) return response(false, "Lütfen geçerli bir input girin!");
  if (req.accountId === req.body.targetAccountId) return response(false, "Kendine mesaj gönderemezsin!");

  if (!req.body.inputs.message.value) return response(false, "Geçersiz mesaj içeriği!");

  req.body.inputs.message.value = req.body.inputs.message.value.trim();

  const validateNewMessageInput = new validations([
    new validateMaxLength(req.body.inputs.message.value, "Mesaj", 256),
    new validateMinLength(req.body.inputs.message.value, "Mesaj", 1),
  ]);

  if (validateNewMessageInput.resultValidations().length) return res.json(response(false, "Geçersiz Mesaj!"));
  next();
};
