import jwt from "jsonwebtoken";

class jwtHelper {
  generate(payload = {}, secretKey, settings = {}) {
    settings.expiresIn = settings.expiresIn || "12h";
    const token = jwt.sign(payload, secretKey, settings);
    return token;
  }
  verify(token, secretKey) {
    let verify;
    try {
      verify = jwt.verify(token, secretKey);
      return { status: true, message: "Başarılı bir şekilde şifre çözüldü!", data: verify };
    } catch (error) {
      return { status: false, message: "Belirtilen şifre değiştirilmiş ve ya süresi geçmiş!" };
    }
  }
}

export default jwtHelper;
