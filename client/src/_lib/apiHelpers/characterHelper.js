import { init } from "../mysql";
import { init2 } from "../mysql";

const dbGame = init();
const dbWeb = init2();

export const getHomeCharactersInfo = async (accountId) => {
  try {
    const charactersInfoData = await dbGame.query(
      `SELECT char_name, sex, language, level, age, faction_id, last_login FROM characters WHERE account_id = ? AND banned = 0;`,
      [accountId]
    );
    if (!charactersInfoData.length) return { status: false, message: "Hesaba ait karakter bulunamadı!" };
    charactersInfoData.forEach(async (c) => {
      const getLanguageName = await dbWeb.query(`SELECT name FROM language_of_name WHERE language_id = ?;`, [
        c.language,
      ]);
      c.languageName = getLanguageName[0].name;
    });
    return { status: true, message: "Başarılı bir şekilde karakter bilgileri getirildi!", table: charactersInfoData };
  } catch (error) {
    return { status: false, message: "Karakter getirirken bilinmeyen bir hata oluştu!" };
  }
};

export const checkCharacter = async (accountId, charName) => {
  try {
    const character = await dbGame.query(`SELECT id FROM characters WHERE account_id = ? AND char_name = ?;`, [
      accountId,
      charName,
    ]);
    if (!character.length)
      return { status: false, message: "Bu sayfayı görüntüleme yetkin yok ve ya böyle bir hesap bulunamadı!" };
    return { status: true, message: "Başarılı bir şekilde hesap bulundu!", characterId: character[0].id };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const getGeneralPageInfo = async (characterId) => {
  try {
    const generalPageInfo = await dbGame.query(
      `SELECT logged, last_login, level, drive_license, boat_license, fly_license, cash, cash_bank, paycheck, savings, sex, skin_color, age, language, job, experience, upgrade_points, strength, playing_hours FROM characters WHERE id = ?;`,
      [characterId]
    );
    if (!generalPageInfo.length) return { status: false, message: "Belirtilen karaktere ulaşılamadı!" };
    const getLanguageName = await dbWeb.query(`SELECT name, lname FROM language_of_name WHERE language_id = ?;`, [
      generalPageInfo[0].language,
    ]);
    const getJobName = await dbWeb.query(`SELECT name FROM job_of_name WHERE job_id = ?;`, [generalPageInfo[0].job]);
    generalPageInfo[0].languageName = getLanguageName[0].name;
    generalPageInfo[0].languageLName = getLanguageName[0].lname;
    generalPageInfo[0].jobName = getJobName[0].name;

    return { status: true, message: "Başarılı bir şekilde bilgiler getirildi!", table: generalPageInfo[0] };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const getCarsPageInfo = async (characterId) => {
  try {
    const carsPageInfo = await dbGame.query(
      `SELECT id, model, plate, kilometer, tax, color0, color1 FROM vehicles WHERE owner_id = ?;`,
      [characterId]
    );
    if (!carsPageInfo.length) return { status: false, message: "Karaktere ait araç bulunamadı!" };
    carsPageInfo.forEach(async (c) => {
      const getCarName = await dbWeb.query(`SELECT vehicle_name FROM vehicle_of_name WHERE vehicle_id = ?;`, [c.model]);
      c.vehicleName = getCarName[0].vehicle_name;
    });
    return { status: true, message: "Başarılı bir şekilde arabalar getirildi", table: carsPageInfo };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const getBuildingPageInfo = async (characterId) => {
  try {
    const buildingsPageInfo = await dbGame.query(
      `SELECT id, type, name, alarm_level, tax FROM buildings WHERE owner_id = ?;`,
      [characterId]
    );
    if (!buildingsPageInfo.length) return { status: false, message: "Karaktere ait işletme bulunamadı!" };
    buildingsPageInfo.forEach(async (b) => {
      const getBuildTypeName = await dbWeb.query(`SELECT name FROM building_type_of_name WHERE building_type = ?;`, [
        b.type,
      ]);
      b.typeName = getBuildTypeName[0].name;
    });
    return { status: true, message: "Başarılı bir şekilde işletmeler getirildi", table: buildingsPageInfo };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};

export const getHousePageInfo = async (characterId) => {
  try {
    const housePageInfo = await dbGame.query(`SELECT id, tax, locked FROM houses WHERE owner_id = ?;`, [characterId]);
    if (!housePageInfo.length) return { status: false, message: "Karaktere ait ev bulunamadı!" };
    return { status: true, message: "Başarılı bir şekilde evler getirildi", table: housePageInfo };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};
