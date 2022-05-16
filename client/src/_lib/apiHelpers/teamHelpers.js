import { init2 } from "../mysql";
const db = init2();

export const getTeam = async () => {
  try {
    const adminList = await db.query(`SELECT * FROM admin_list;`);
    return { status: true, message: "Başarılı bir şekilde tablolar getirildi!", table: adminList };
  } catch (error) {
    return { status: false, message: "Yetkili ekip getirilirken bilinmeyen bir hata oluştu!" };
  }
};

export const getAdminLevelOfName = async () => {
  try {
    const adminLevelOfName = await db.query(`SELECT * FROM admin_level_of_name;`);
    if (!adminLevelOfName.length)
      return { status: false, message: "Admin level isimleri tablosunda eleman bulamadım!" };
    return { status: true, message: "Başarılı bir şekilde admin level ismi getirildi!", table: adminLevelOfName };
  } catch (error) {
    return { status: false, message: "Admin level ismini getirirken bilinmeyen bir hata oluştu!" };
  }
};
