import { validations } from "../lib/validationHelpers/validations.js";
import { validateNumber } from "../lib/validationHelpers/validateNumber.js";
import { response } from "../utils/response.js";

export const controlPageNumber = (req, res, next) => {
  if (req.params.pageNumber === undefined) return res.json(response(false, "Geçerli bir sayı girin!"));

  const validPosts = new validations([new validateNumber(req.params.pageNumber)]);
  if (validPosts.resultValidations().length) return res.json(response(false, "Hatalı sayı girişi!"));
  next();
};
