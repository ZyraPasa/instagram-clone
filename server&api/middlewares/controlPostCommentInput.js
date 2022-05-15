import { validations } from "../lib/validationHelpers/validations.js";
import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { validateMinLength } from "../lib/validationHelpers/validateMinLength.js";
import { response } from "../utils/response.js";

export const controlPostCommentInput = (req, res, next) => {
  if (!req.body.inputs) return res.json(response(false, "Inputları doğru girin!"));
  req.body.inputs.comment.value = req.body.inputs.comment.value.trim();

  const validatePostCommentInput = new validations([
    new validateMaxLength(req.body.inputs.comment.value, "Yorum", 256),
    new validateMinLength(req.body.inputs.comment.value, "Yorum", 1),
  ]);
  if (validatePostCommentInput.resultValidations().length) return res.json(response(false, "Geçersiz Yorum!"));
  next();
};
