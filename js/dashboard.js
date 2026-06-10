import { auth, db } from "../firebase/config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const lessons = ["lesson-1", "lesson-2"];

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    document.getElementById("welcomeText").innerHTML = `
      <p>${data.name}</p>
      <p>${data.role} • ${data.company}</p>
    `;
  } else {
    document.getElementById("welcomeText").innerText =
      `Welcome back, ${user.email}`;
  }

  let completed = 0;

  for (const lessonId of lessons) {
    const lessonRef = doc(db, "progress", user.uid, "lessons", lessonId);
    const lessonSnap = await getDoc(lessonRef);

    if (lessonSnap.exists() && lessonSnap.data().completed === true) {
      completed++;
    }
  }

  const percent = Math.round((completed / lessons.length) * 100);

  document.getElementById("overallProgressText").innerText =
    `${completed} / ${lessons.length} lessons completed (${percent}%)`;

  document.getElementById("overallProgressBar").style.width = `${percent}%`;
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
