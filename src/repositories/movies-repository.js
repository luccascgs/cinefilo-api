const { db } = require("../libs/firebase");
const { v4: uuid } = require("uuid");
const {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
} = require("firebase/firestore/lite");

const collectionName = "movies";

const create = async (movie) => {
  const id = uuid();
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  await setDoc(docRef, movie);
  return { id, ...movie };
};

const findById = async (id) => {
  const snapshot = await getDoc(doc(db, collectionName, id));

  if (snapshot.exists()) {
    return { id, ...snapshot.data() };
  }

  return null;
};

const findAll = async () => {
  const q = query(collection(db, collectionName));
  const snapshot = await getDocs(q);
  const result = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return result;
};

const update = async (movie) => {
  await updateDoc(doc(db, collectionName, movie.id), {
    name: movie.name,
    acceptableNames: movie.acceptableNames,
    emojis: movie.emojis,
    genre: movie.genre,
  });

  return movie;
};

module.exports = { create, findById, update, findAll };
