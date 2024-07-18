const { db, auth } = require("../libs/firebase");
const {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore/lite");
const {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const SignInError = require("../errors/singn-in-error");
const { createStats } = require("./stats-repository");

const collectionName = "users";

const create = async (user, date) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password
  );
  const id = response.user.uid;
  const data = {
    email: user.email,
    username: user.username,
    date,
    lastUpdate: date,
    background: "solid-blue",
    head: "none",
  };
  await createStats(id);
  const ref = collection(db, collectionName);
  const docRef = doc(ref, id);
  await setDoc(docRef, data);
  return { id, ...data };
};

const login = async (user) => {
  const response = await signInWithEmailAndPassword(
    auth,
    user.email,
    user.password
  ).catch((error) => {
    if (error.code === "auth/invalid-credential") throw new SignInError();
  });
  return { response };
};

const findById = async (id) => {
  const snapshot = await getDoc(doc(db, collectionName, id));

  if (snapshot.exists()) {
    return { id, ...snapshot.data() };
  }

  return null;
};

const findByEmail = async (email) => {
  const q = query(collection(db, collectionName), where("email", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0
    ? snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
    : null;
};

const findByUsername = async (username) => {
  const q = query(
    collection(db, collectionName),
    where("username", "==", username)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.length > 0
    ? snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
    : null;
};

const updateUsername = async (user) => {
  await updateDoc(doc(db, collectionName, user.id), {
    username: user.username,
    lastUpdate: user.today,
  });

  return user;
};

const updateIcon = async (user) => {
  await updateDoc(doc(db, collectionName, user.id), {
    background: user.background,
    head: user.head,
  });

  return user;
};

const recoverPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  return { message: "Email enviado com sucesso!", email };
};

module.exports = {
  findByEmail,
  findByUsername,
  create,
  login,
  findById,
  updateUsername,
  updateIcon,
  recoverPassword,
};
