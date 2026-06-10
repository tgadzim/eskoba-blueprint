import { auth, db } from "../firebase/config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    usersList.innerHTML += `
      <div style="padding:16px; border-bottom:1px solid #e5e7eb;">
        <strong>${data.name}</strong><br>
        ${data.email}<br>
        ${data.role} • ${data.company}
      </div>
    `;
  });
});
