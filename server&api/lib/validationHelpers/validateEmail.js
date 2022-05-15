export class validateEmail {
  #value;
  #emailCode =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(value) {
    this.#value = value;
  }
  validate() {
    const resultValidate = this.#emailCode.test(this.#value);
    return { status: resultValidate, message: `Lütfen geçerli bir email girin!` };
  }
}
