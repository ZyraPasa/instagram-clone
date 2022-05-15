import { init, init2 } from "../mysql";
import {
  validateInputControl,
  maxLenghtValidator,
  minLenghtValidator,
  validateSpace,
  validateNumber,
  validateMaxValue,
  validateMinValue,
} from "../helpers/validationHelper";
const dbGame = init();
const dbWeb = init2();

export const validateRecourse = async (accountId) => {
  try {
    const resultValidateRecourse = await dbWeb.query(
      `SELECT * FROM appeals_character WHERE account_id = ? AND status = 1;`,
      [accountId]
    );
    if (!resultValidateRecourse.length)
      return { status: true, message: "Yeni karakter başvurusunu gönderebilirsiniz!" };
    return {
      status: false,
      message: `${resultValidateRecourse[0].name} adlı başvurunuz hala inceleme aşamasında! Lütfen sabır ile bekleyin.`,
    };
  } catch (error) {
    return { status: false, message: "Başvuru işlemlerinde bilinmeyen bir hata oluştu!" };
  }
};

export const controlInputs = (inputs, sex, skinColor) => {
  if (!validateSpace(inputs.name.value)) return { status: false, message: "Geçerisiz karakter adı!" };
  if (!minLenghtValidator(inputs.name.value, 5))
    return { status: false, message: "Karakter adı en az 5 karakter olmak zonuda!" };
  if (!maxLenghtValidator(inputs.name.value, 21))
    return { status: false, message: "Karakter adı en fazla 21 karakter olabilir!" };
  if (inputs.name.value.indexOf("_") === -1)
    return { status: false, message: "Karakter adı arasında _ olmak zorunda!" };
  //
  if (!validateNumber(inputs.age.value)) return { status: false, message: "Hatalı yaş girişi!" };
  if (!validateMinValue(inputs.age.value, 16)) return { status: false, message: "Yaş en az 16 olmak zorunda!" };
  if (!validateMaxValue(inputs.age.value, 64)) return { status: false, message: "Yaş en fazla 64 olabilir!" };
  //
  if (!minLenghtValidator(inputs.biography.value, 3000))
    return { status: false, message: "Biyografi en az 3000 karakter olmak zorunda!" };
  if (!maxLenghtValidator(inputs.biography.value, 10000))
    return { status: false, message: "Biyografi en fazla 10000 karakter olabilir!" };
  //
  if (!validateNumber(sex)) return { status: false, message: "Hatalı cinsiyet girişi!" };
  //
  if (!validateNumber(skinColor)) return { status: false, message: "Hatalı ten rengi girişi!" };
  if (!validateMaxValue(skinColor, 3)) return { status: false, message: "Geçerisiz ten rengi!" };
  if (!validateMinValue(skinColor, 0)) return { status: false, message: "Geçerisiz ten rengi!" };
  return { status: true, message: "Tüm kontroller başarılı!" };
};

export const controlNewCharacter = async (characterName, accountId) => {
  try {
    const controlCharacter = dbGame.query(`SELECT id FROM characters WHERE char_name = ?;`, [characterName]);
    if (controlCharacter.length) return { status: false, message: "Böyle bir karakter mevcut!" };
    const controlActiveRecourseCharacter = dbWeb.query(
      `SELECT id FROM appeals_character WHERE name = ? AND status = 1;`,
      [characterName]
    );
    if (controlActiveRecourseCharacter.length)
      return { status: false, message: "Bu isime ait karakter başvurusu mevcut!" };
    const resultValidateRecourse = await validateRecourse(accountId);
    if (!resultValidateRecourse.status) return resultValidateRecourse;
    return { status: true, message: "Başarılı bir şekilde karakter kontrolü yapıldı!" };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const insertIntoRecourse = async (inputs, sex, skinColor, accountId) => {
  try {
    const resultInsertInto = await dbWeb.query(
      `INSERT INTO appeals_character (account_id, name, sex, skin_color, age, biograph) VALUES (?, ?, ?, ?, ?, ?);`,
      [accountId, inputs.name.value, sex, skinColor, inputs.age.value, inputs.biography.value]
    );
    if (resultInsertInto.affectedRows === 0) return { status: false, message: "Bilinmeyen bir hata oluştu!" };
    return { status: true, message: "Başarılı bir şekilde karakter başvurusu gönderildi!" };
  } catch (error) {
    return { status: false, message: "Başvuru esnasında bilinmedik bir hata ile karşılaştım!" };
  }
};

export const getActiveAppeals = async () => {
  try {
    const activeAppeals = await dbWeb.query(
      `SELECT id, name, sex, skin_color, age, timestamp FROM appeals_character WHERE status = 1;`
    );
    if (!activeAppeals.length) return { status: false, message: "Aktif bir karakter başvurusu bulunamadı!" };
    return { status: true, message: "Başarılı bir şekilde karakter başvurular getirildi!", table: activeAppeals };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const controlActiveAppeals = async (appealsId) => {
  try {
    const resultControlActiveAppeals = await dbWeb.query(
      `SELECT name FROM appeals_character WHERE id = ? AND status = 1;`,
      [appealsId]
    );
    if (!resultControlActiveAppeals.length)
      return { status: false, message: "Aktif olarak karakter başvurusu bulunamadı!" };
    return { status: true, message: "Başarılı bir şekilde kontrol edildi!" };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const getAppealsDetail = async (appealsId) => {
  try {
    const appealsDetail = await dbWeb.query(
      `SELECT name, sex, skin_color, age, biograph FROM appeals_character WHERE id = ?;`,
      [appealsId]
    );
    if (!appealsDetail.length) return { status: false, message: "Karakter başvurusu bulunamadı!" };
    return { status: true, message: "Başarılı bir şekilde karakter başvurusu getirildi!", table: appealsDetail[0] };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const acceptAppeals = async (accountId, appealsId) => {
  try {
    const getAppeals = await dbWeb.query(
      `SELECT id, account_id, name, sex, skin_color, age FROM appeals_character WHERE id = ?;`,
      [appealsId]
    );
    if (!getAppeals.length) return { status: false, message: "Böyle bir başvuru bulunamadı!" };

    const controlCreateCharacter = await dbGame.query(`SELECT id FROM characters WHERE char_name = ?`, [
      getAppeals[0].name,
    ]);
    if (controlCreateCharacter.length) return { status: false, message: "Zaten böyle bir karakter var!" };

    const createCharacter = await dbGame.query(
      `INSERT INTO characters (account_id, char_name, sex, age, skin_color, banned) VALUES (?, ?, ?, ?, ?, 0);`,
      [getAppeals[0].account_id, getAppeals[0].name, getAppeals[0].sex, getAppeals[0].age, getAppeals[0].skin_color]
    );
    if (!createCharacter.affectedRows) return { status: false, message: "Bilinmeyen bir hata oluştu!" };
    const setStatusAppeals = dbWeb.query(`UPDATE appeals_character SET status = 0 WHERE id = ?;`, [getAppeals[0].id]);
    if (!setStatusAppeals.affectedRows) return { status: false, message: "Bilinmeyen bir hata oluştu!" };
    return { status: true, message: "İşlem başarılı bir şekilde sonuçlandı!" };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const refuseAppeals = async (appealsId) => {
  try {
    const setStatus = dbWeb.query(`UPDATE appeals_character SET status = 0 WHERE id = ?;`, [appealsId]);
    if (!setStatus.affectedRows) return { status: false, message: "Bilinmeyen bir hata oluştu!" };
    return { status: true, message: "Başarılı bir şekilde işlem sonlandırıldı!" };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};
