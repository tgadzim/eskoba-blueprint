import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRrUPI-z0JWD-q5UdmLf_7V09zRDHKbYY",
  authDomain: "eskoba-marketing.firebaseapp.com",
  projectId: "eskoba-marketing",
  storageBucket: "eskoba-marketing.firebasestorage.app",
  messagingSenderId: "940559185905",
  appId: "1:940559185905:web:f561e9b3b863f737097650",
  measurementId: "G-9CCPK3Q9K8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

window.markComplete = async function() {

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first");
    return;
  }

  await setDoc(
    doc(
      db,
      "progress",
      user.uid,
      "lessons",
      "lesson-2"
    ),
    {
      completed: true,
      completedAt: new Date()
    }
  );

  alert("Lesson Completed!");
};
