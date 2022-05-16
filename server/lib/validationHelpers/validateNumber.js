export class validateNumber {
  #value;
  #number = /^[0-9]+$/;
  constructor(value) {
    this.#value = value;
  }
  validate() {
    const resultValidate = this.#number.test(this.#value);
    return { status: resultValidate, message: `Geçerli bir sayı değeri girin!` };
  }
}
