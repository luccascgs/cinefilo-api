const {
  updateDoc,
  getDocs,
  query,
  collection,
  doc,
} = require("firebase/firestore/lite");
const RegisterNotFoundError = require("../errors/register-not-found-error");
const { format } = require("../helpers/date-helper");
const { sortNumber } = require("../helpers/number-helper");
const { db } = require("../libs/firebase");
const { findByDay, create } = require("../repositories/days-repository");
const { findAll, findById } = require("../repositories/movies-repository");

const findDailyMovieService = async () => {
  const today = format(new Date());
  const dailyMovie = await findByDay(today);
  let currentDailyMovie;

  if (dailyMovie) {
    currentDailyMovie = dailyMovie;
  } else {
    const allMovies = await findAll();
    const randomIndex = sortNumber(allMovies.length);
    const newDailyMovie = allMovies[randomIndex];

    const collectionRef = collection(db, "users");
    const snapshot = await getDocs(collectionRef);

    snapshot.forEach(async (document) => {
      const docRef = doc(db, "users", document.id);

      await updateDoc(docRef, {
        tries: [],
      });
    });

    currentDailyMovie = await create({
      day: today,
      id_movie: newDailyMovie.id,
    });
  }

  const movie = await findById(currentDailyMovie.id_movie);
  if (!movie) throw new RegisterNotFoundError();

  return movie;
};

module.exports = { findDailyMovieService };
