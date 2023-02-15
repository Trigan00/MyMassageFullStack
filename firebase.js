require("dotenv").config();
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const auth = require("firebase-admin/auth");

initializeApp({
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});
const db = getFirestore();

module.exports = { db, auth };
