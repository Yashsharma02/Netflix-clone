import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2-8Fz4r-pwwZxGtiAG1KVMru-sCqI-Xc",
  authDomain: "netflixclone-5b5b5.firebaseapp.com",
  projectId: "netflixclone-5b5b5",
  storageBucket: "netflixclone-5b5b5.firebasestorage.app",
  messagingSenderId: "112757658665",
  appId: "1:112757658665:web:3bc53f8ed99d599589f838",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Sign up function
export const register = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign in function
export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out function
export const logout = async () => {
  return signOut(auth);
};

// Watchlist functions
export const addToWatchlist = async (userId, movie) => {
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  try {
    const watchlistRef = collection(db, "watchlists", userId, "movies");
    await addDoc(watchlistRef, movie);
    console.log("Movie added to watchlist");
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
  }
};

export const getWatchlist = async (userId) => {
  if (!userId) return [];
  try {
    const watchlistRef = collection(db, "watchlists", userId, "movies");
    const snapshot = await getDocs(watchlistRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
};

export const removeFromWatchlist = async (userId, movieId) => {
  if (!userId) return;
  try {
    const movieRef = doc(db, "watchlists", userId, "movies", movieId);
    await deleteDoc(movieRef);
    console.log("Movie removed from watchlist");
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
  }
};