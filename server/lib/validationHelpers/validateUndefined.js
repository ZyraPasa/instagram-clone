export class validateUndefined {
  #value;
  #tag;
  constructor(value, tag) {
    this.#value = value;
    this.#tag = tag;
  }
  validate() {
    const resultValidate = this.#value !== undefined;
    return { status: resultValidate, message: `${this.#tag} undefined olamaz!` };
  }
}
