// dosya ismi database queries gibi bir şeyler olabilir!
export class BaseDatabase {
  #db;
  #table;
  constructor(db, table) {
    this.#db = db;
    this.#table = table;
  }
  async selectAll() {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(`SELECT * FROM ${this.#table};`, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async selectByFilter(by, value, selects) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(`SELECT ?? FROM ${this.#table} WHERE ${by} = ?;`, [selects, value], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async selectBy(by, value) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(`SELECT * FROM ${this.#table} WHERE ${by} = ?;`, [value], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async selectByMultiple(data) {
    const keys = Object.keys(data);
    let queryStr = `SELECT * FROM ${this.#table} WHERE `;
    keys.forEach((k, i) => {
      if (i === 0) {
        queryStr = queryStr + `${k} = ${data[k]}`;
      } else if (i === keys.length - 1) {
        queryStr = queryStr + ` AND ${k} = ${data[k]};`;
      } else {
        queryStr = queryStr + ` AND ${k} = ${data[k]}`;
      }
    });
    return new Promise(async (resolve, reject) => {
      await this.#db.query(queryStr, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async selectByCustom(customSql) {
    let queryStr = `SELECT * FROM ${this.#table} WHERE ${customSql};`;
    return new Promise(async (resolve, reject) => {
      await this.#db.query(queryStr, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async selectTableCountBy(by, value) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(
        `SELECT COUNT(*) AS count FROM ${this.#table} WHERE ${by} = ?;`,
        [value],
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  }
  async insertInto(data) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(`INSERT INTO ${this.#table} SET ?;`, [data], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async updateBy(by, value, data) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(`UPDATE ${this.#table} SET ? WHERE ${by} = ?;`, [data, value], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async deleteBy(by, value) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(`DELETE FROM ${this.#table} WHERE ${by} = ?`, [value], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  async deleteByMultiple(data) {
    const keys = Object.keys(data);
    let queryStr = `DELETE FROM ${this.#table} WHERE `;
    keys.forEach((k, i) => {
      if (i === 0) {
        queryStr = queryStr + `${k} = ${data[k]}`;
      } else if (i === keys.length - 1) {
        queryStr = queryStr + ` AND ${k} = ${data[k]};`;
      } else {
        queryStr = queryStr + ` AND ${k} = ${data[k]}`;
      }
    });
    return new Promise(async (resolve, reject) => {
      await this.#db.query(queryStr, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  //
  async customSql(querySql, data) {
    return new Promise(async (resolve, reject) => {
      await this.#db.query(querySql, data, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
