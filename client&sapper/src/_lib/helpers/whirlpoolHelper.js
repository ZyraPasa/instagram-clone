const crypto = require("crypto");
//creating hash object

export const changeWhirlpool = (value) => {
  let hash = crypto.createHash("whirlpool");
  let data = hash.update(value, "utf-8");
  let gen_hash = data.digest("hex");
  gen_hash = gen_hash.toUpperCase();
  //Printing the output on the console
  return gen_hash;
};
