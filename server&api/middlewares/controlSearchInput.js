import { validations } from "../lib/validationHelpers/validations.js";
import { validateMaxLength } from "../lib/validationHelpers/validateMaxLength.js";
import { response } from "../utils/response.js";

export const controlSearchInput = (req, res, next) => {
  if (!req.params.value) return res.json(response(false, "Inputu doğru girin!"));
  req.params.value = req.params.value.trim();

  const validSearch = new validations([new validateMaxLength(req.params.value, "Search", 64)]);
  if (validSearch.resultValidations().length) return res.json(response(false, "Geçersiz input girişi!"));
  next();
};
