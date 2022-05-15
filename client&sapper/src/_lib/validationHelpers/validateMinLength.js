export class validateMinLength {
  #value;
  #tag;
  #minValueLength;
  constructor(value, tag, minValueLength) {
    this.#value = value;
    this.#tag = tag;
    this.#minValueLength = minValueLength;
  }
  validate() {
    const resultValidate = this.#value.length >= this.#minValueLength;
    return { status: resultValidate, message: `${this.#tag} en az ${this.#minValueLength} karakter olmak zorunda!` };
  }
}
