export class validateMinValue {
  #value;
  #tag;
  #minValue;
  constructor(value, tag, minValue) {
    this.#value = value;
    this.#tag = tag;
    this.#minValue = minValue;
  }
  validate() {
    const resultValidate = this.#value >= this.#minValue;
    return { status: resultValidate, message: `${this.#tag} en az ${this.#minValue} olmalı!` };
  }
}
