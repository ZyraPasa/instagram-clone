import bcrypt from "bcrypt";

export class BcryptHelper {
  async encrypt(text, saltRounds = 10) {
    const hash = await bcrypt.hash(text, saltRounds);
    return hash;
  }
  async decrypt(text, hash) {
    const compare = await bcrypt.compare(text, hash);
    return compare;
  }
}
