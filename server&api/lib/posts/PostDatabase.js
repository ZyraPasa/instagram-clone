import { BaseDatabase } from "../base/BaseDatabase.js";
import { databaseConnection } from "../../utils/mysql.js";
const db = databaseConnection();

class PostDatabase extends BaseDatabase {
  constructor() {
    super(db, "posts");
  }
  async addPost(data) {
    return await this.insertInto(data)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde yeni post eklendi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getPost(id) {
    return await this.selectBy("id", id)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getAccountFollowAllPostDetail(accountId, activePosts) {
    return await this.customSql(
      `SELECT p.*, a.username, a.avatar_url, a.verified, (SELECT COUNT(*) FROM post_likes AS apl WHERE apl.post_id = p.id) AS like_count, (SELECT COUNT(*) FROM post_comments AS apc WHERE apc.post_id = p.id) AS comment_count, (SELECT COUNT(*) FROM post_likes AS apl WHERE apl.account_id = ${accountId} AND apl.post_id = p.id) AS account_post_like, (SELECT COUNT(*) FROM post_saved AS aps WHERE aps.account_id = ${accountId} AND aps.post_id = p.id) AS post_saved FROM posts AS p INNER JOIN accounts AS a ON p.account_id = a.id WHERE p.account_id IN (SELECT follow_account_id FROM account_follows WHERE account_id = ${accountId}) OR p.account_id = ${accountId} ORDER BY id DESC LIMIT ${activePosts}, 15;`
    )
      .then((result) => {
        return {
          status: true,
          message: "Başarılı bir şekilde takip edilen hesapların post detayları getirildi!",
          data: result,
        };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  //
  async getAccountPosts(accountId) {
    return await this.selectBy("account_id", accountId)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde hesaba ait postlar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  } // bunların yeri
  async getAccountPostCount(accountId) {
    return await this.selectTableCountBy("account_id", accountId)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post sayısı getirildi!", count: result[0].count };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  } // bunların yeri
  async getAccountLikePosts(accountId) {
    return await this.selectByCustom(`id IN (SELECT post_id FROM post_likes WHERE account_id = ${accountId});`)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde beğenilen postlar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  } // bunların yeri
  async getAccountSavePosts(accountId) {
    return await this.selectByCustom(`id IN (SELECT post_id FROM post_saved WHERE account_id = ${accountId});`)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde kayıt edilen postlar getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  } // bunların yeri
  async getAccountLikePost(accountId, postId) {
    return await this.customSql(`SELECT * FROM post_likes WHERE account_id = ? AND post_id = ?`, [accountId, postId])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde hesabın beğendiği post getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata olutştu!" };
      });
  }
  async addAccountLikePost(accountId, postId) {
    return await this.customSql(`INSERT INTO post_likes (account_id, post_id) VALUES (?, ?);`, [accountId, postId])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post beğenildi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async removeAccountLikePost(accountId, postId) {
    return await this.customSql(`DELETE FROM post_likes WHERE account_id = ? AND post_id = ?;`, [accountId, postId])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post beğenme kaldırıldı!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getAccountSavePost(accountId, postId) {
    return await this.customSql(`SELECT * FROM post_saved WHERE account_id = ? AND post_id = ?`, [accountId, postId])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde hesabın kayıt ettiği post getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata olutştu!" };
      });
  }
  async addAccountSavePost(accountId, postId) {
    return await this.customSql(`INSERT INTO post_saved (account_id, post_id) VALUES (?, ?);`, [accountId, postId])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post kayıt edildi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async removeAccountSavePost(accountId, postId) {
    return await this.customSql(`DELETE FROM post_saved WHERE account_id = ? AND post_id = ?;`, [accountId, postId])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post kayıt edilme kaldırıldı!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getPostLikeCount(postId) {
    return await this.customSql(`SELECT COUNT(*) AS count FROM post_likes WHERE post_id = ${postId};`)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post beğeni sayısı getirildi!", count: result[0].count };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getPostCommentCount(postId) {
    return await this.customSql(`SELECT COUNT(*) AS count FROM post_comments WHERE post_id = ${postId};`)
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post yorum sayısı getirildi!", count: result[0].count };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async getPostComments(postId, activeCommentCount) {
    return await this.customSql(
      `SELECT a.username, a.verified, pc.comment, pc.date_time FROM accounts AS a INNER JOIN post_comments AS pc ON a.id = pc.account_id WHERE pc.post_id = ? ORDER BY pc.date_time DESC LIMIT ${activeCommentCount}, 15;`,
      [postId]
    )
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde post yorumları getirildi!", data: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
  async addPostComment(accountId, postId, comment) {
    return await this.customSql(`INSERT INTO post_comments (account_id, post_id, comment) VALUES (?, ?, ?);`, [
      accountId,
      postId,
      comment,
    ])
      .then((result) => {
        return { status: true, message: "Başarılı bir şekilde yeni yorum eklendi!", detail: result };
      })
      .catch((error) => {
        console.log(error);
        return { status: false, message: "Bilinmeyen bir hata oluştu!" };
      });
  }
}

let instance;
export const postDatabase = () => {
  if (instance) return instance;
  instance = new PostDatabase();
  return instance;
};
