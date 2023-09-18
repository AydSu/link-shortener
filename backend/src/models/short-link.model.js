/**
 * @param {import("mongodb").Db} db
 */
export function getShortLinksCollection(db){
    return db.collection("shortLinks");
}


// export async function initShortLinksCollection(db, logger) {
// }
  