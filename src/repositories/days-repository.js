const { db } = require("../libs/firebase");
const { v4: uuid } = require("uuid");
const {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} = require("firebase/firestore/lite");

const collectionName = "days";

const findByDay = async (day) => {
  const q = query(collection(db, collectionName), where("day", "==", day));
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return result[0];
};

const create = async (day) => {
  const id = uuid();
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  await setDoc(docRef, day);
  return { id, ...day };
};

module.exports = { findByDay, create };
