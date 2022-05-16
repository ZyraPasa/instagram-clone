import { init, init2 } from "../mysql";
const dbWeb = init2();
const dbGame = init();

export const getAllInfoCount = async (accountId) => {
  try {
    const appealsCaracterCount = await dbWeb.query(
      `SELECT COUNT(*) AS appealsCaracterCount FROM appeals_character WHERE status = 1;`
    );
    const getAllCaracters = await dbGame.query(`SELECT COUNT(*) AS allCaracterCount FROM characters;`);
    const getAllAccount = await dbGame.query(`SELECT COUNT(*) AS allAccountCount FROM accounts;`);
    const getDutyLSPDCount = await dbGame.query(
      `SELECT COUNT(*) AS dutyLSPDCount FROM characters WHERE logged = 1 AND (faction_id = 0 AND faction_duty = 1);`
    );
    const getOnlineCount = await dbGame.query(`SELECT COUNT(*) AS onlineCount FROM characters WHERE logged = 1;`);
    const accountMaxSlot = await dbGame.query(`SELECT max_slot FROM accounts WHERE id = ?;`, [accountId]);
    const accountActiveCaracterCount = await dbGame.query(
      `SELECT COUNT(*) AS accountCaracterCount FROM characters WHERE account_id = ? AND banned = 0;`,
      [accountId]
    );
    const remainingAppealsCaracterCount =
      accountMaxSlot[0].max_slot - accountActiveCaracterCount[0].accountCaracterCount;

    const allInfoCount = {
      appealsCaracterCount: appealsCaracterCount[0].appealsCaracterCount,
      allCaracterCount: getAllCaracters[0].allCaracterCount,
      allAccountCount: getAllAccount[0].allAccountCount,
      accountMaxSlot: accountMaxSlot[0].max_slot,
      remainingAppealsCaracterCount: remainingAppealsCaracterCount,
      dutyLSPDCount: getDutyLSPDCount[0].dutyLSPDCount,
      onlineCount: getOnlineCount[0].onlineCount,
    };
    return { status: true, table: allInfoCount, message: "Başarılı bir şekilde tablolar getirildi!" };
  } catch (error) {
    return { status: false, message: "Bilinmeyen bir hata oluştu!" };
  }
};
