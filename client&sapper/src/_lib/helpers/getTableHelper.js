export const getTableAll = async (db, table) => {
  try {
    const getTable = await db.query(`SELECT * FROM ${table};`);
    return {
      status: true,
      table: getTable,
      message: "Başarılı bir şekilde tablolar getirildi!",
    };
  } catch (error) {
    return { status: false, message: "Tablolar getirilirken bilinmeyen bir hata oluştu!" };
  }
};

export const getTableLimit = async (db, tableName, limit) => {
  try {
    const getTable = await db.query(`SELECT * FROM ${tableName} LIMIT ${limit};`);
    return {
      status: true,
      table: getTable,
      message: "Başarılı bir şekilde tablolar getirildi!",
    };
  } catch (error) {
    return { status: false, message: "Tablolar getirilirken bilinmeyen bir hata oluştu!" };
  }
};

export const getTableDesc = async (db, tableName, by) => {
  try {
    const getTable = await db.query(`SELECT * FROM ${tableName} ORDER BY ${by} DESC;`);
    return {
      status: true,
      table: getTable,
      message: "Başarılı bir şekilde tablolar getirildi!",
    };
  } catch (error) {
    return { status: false, message: "Tablolar getirilirken bilinmeyen bir hata oluştu!" };
  }
};

export const getTableDescLimit = async (db, tableName, by, limit) => {
  try {
    const getTable = await db.query(`SELECT * FROM ${tableName} ORDER BY ${by} DESC LIMIT ${limit};`);
    return {
      status: true,
      table: getTable,
      message: "Başarılı bir şekilde tablolar getirildi!",
    };
  } catch (error) {
    return { status: false, message: "Tablolar getirilirken bilinmeyen bir hata oluştu!" };
  }
};

export const getTableFilter = async (db, select, tableName, whereColumn, whereValue) => {
  try {
    const getTable = await db.query(`SELECT ${select} FROM ${tableName} WHERE ${whereColumn} = ${whereValue};`);
    if (getTable.length === 0) return { status: false, message: "Belirtilen tablo içerisinde veri bulunamadı!" };
    return {
      status: true,
      table: getTable,
      message: "Başarılı bir şekilde tablolar getirildi!",
    };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Tablolar getirilirken bilinmeyen bir hata oluştu!" };
  }
};
