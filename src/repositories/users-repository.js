const { db } = require("../libs/firebase");
const {
  collection,
  getDocs,
  query,
  where,
} = require("firebase/firestore/lite");

const collectionName = "users";

const findByEmail = async (email) => {
  const q = query(collection(db, collectionName), where("email", "==", email));
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return result[0];
};

module.exports = { findByEmail };
