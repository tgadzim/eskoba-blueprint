import { auth } from "../firebase/config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

window.logoutUser = async function() {
  await signOut(auth);
  window.location.href = "login.html";
};
