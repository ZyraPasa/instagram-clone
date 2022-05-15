export class validateMaxLength {
  #value;
  #tag;
  #maxValueLength;
  constructor(value, tag, maxValueLength) {
    this.#value = value;
    this.#tag = tag;
    this.#maxValueLength = maxValueLength;
  }
  validate() {
    const resultValidate = this.#value.length <= this.#maxValueLength;
    return { status: resultValidate, message: `${this.#tag} en fazla ${this.#maxValueLength} karakter olabilir!` };
  }
}
