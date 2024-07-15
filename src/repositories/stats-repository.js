const { db, auth } = require("../libs/firebase");
const { v4: uuid } = require("uuid");
const {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  orderBy,
  updateDoc,
} = require("firebase/firestore/lite");

const collectionName = "stats";

const createStats = async (userId) => {
  const id = uuid();
  const data = {
    id_user: userId,
    daily: 0,
    adam: 0,
    cartoon: 0,
    comedy: 0,
    drama: 0,
    general: 0,
    horror: 0,
    scifi: 0,
    series: 0,
  };
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  await setDoc(docRef, data);
  return { id, ...data };
};

const findAllByUserId = async (userId) => {
  const q = query(
    collection(db, collectionName),
    where("id_user", "==", userId)
  );
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return result[0];
};

const getScoreboard = async (genre) => {
  const q = query(collection(db, collectionName), orderBy(genre, "desc"));
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => {
    return { ...doc.data() };
  });
  return result;
};

const update = async (id, genre, value) => {
  await updateDoc(doc(db, collectionName, id), {
    [genre]: Number(value),
  });

  return { id, [genre]: value };
};

const reset = async (id) => {
  await updateDoc(doc(db, collectionName, id), {
    daily: 0,
    adam: 0,
    cartoon: 0,
    comedy: 0,
    drama: 0,
    general: 0,
    horror: 0,
    scifi: 0,
    series: 0,
  });

  return { message: "Pontos resetados com sucesso" };
};

module.exports = {
  reset,
  createStats,
  findAllByUserId,
  getScoreboard,
  update,
  reset,
};
