export class validateSpace {
  #value;
  #tag;
  constructor(value, tag) {
    this.#value = value;
    this.#tag = tag;
  }
  validate() {
    const resultValidate = this.#value.indexOf(" ") === -1;
    return { status: resultValidate, message: `${this.#tag} içerisinde boşluk kullanamazsınız!` };
  }
}
