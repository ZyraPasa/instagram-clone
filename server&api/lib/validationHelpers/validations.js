export class validations {
  #validations;
  constructor(validations) {
    this.#validations = validations;
  }
  resultValidations() {
    let results = [];
    this.#validations.forEach((v) => {
      if (!v.validate().status) results.push(v.validate().message);
    });
    return results;
  }
}
