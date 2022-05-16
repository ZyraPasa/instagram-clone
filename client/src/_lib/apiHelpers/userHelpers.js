import { init } from "../mysql";
const db = init();

export const getMainCaracter = async (accountId) => {
  try {
    const getMainCaracterID = await db.query(
      `SELECT id FROM characters WHERE account_id = ? AND banned = 0 ORDER BY level DESC;`,
      [accountId]
    );
    if (!getMainCaracterID.length) return { status: false, message: "Aktif karakter bulamadım!" };

    const getMainCaracterInfo = await db.query(
      `SELECT char_name, logged, cash, cash_bank, savings FROM characters WHERE id = ?;`,
      [getMainCaracterID[0].id]
    );
    if (!getMainCaracterInfo.length) return { status: false, message: "Main karakteri bulamadım!" };
    return {
      status: true,
      message: "Başarılı bir şekilde main karakter getirildi!",
      table: getMainCaracterInfo[0],
    };
  } catch (error) {
    return { status: false, message: "Karakter getirilirken bilinmeyen bir hata oluştu!" };
  }
};

export const getMyCharacters = async (accountId) => {
  try {
    const getMyActiveCaracters = await db.query(
      `SELECT char_name FROM characters WHERE account_id = ? AND banned = 0;`,
      [accountId]
    );
    if (!getMyActiveCaracters.length) return { status: false, message: "Aktif bir karakter bulamadım!" };
    return { status: true, message: "Başarılı bir şekilde karakterler getirildi!", table: getMyActiveCaracters };
  } catch (error) {
    return { status: false, message: "Karakterleri getirirken bilinmeyen bir hata oluştu!" };
  }
};
