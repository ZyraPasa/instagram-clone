class TypeCheck {
  isArray(data) {
    if (!Array.isArray(data)) return false;
    return true;
  }
  isObject(data) {
    if (Array.isArray(data) === true || data === null || typeof data !== "object") return false;
    return true;
  }
}

export default TypeCheck;
