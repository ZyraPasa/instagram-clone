export class validateMaxValue {
  #value;
  #tag;
  #maxValue;
  constructor(value, tag, maxValue) {
    this.#value = value;
    this.#tag = tag;
    this.#maxValue = maxValue;
  }
  validate() {
    const resultValidate = this.#value <= this.#maxValue;
    return { status: resultValidate, message: `${this.#tag} en fazla ${this.#maxValue} olabilir!` };
  }
}
