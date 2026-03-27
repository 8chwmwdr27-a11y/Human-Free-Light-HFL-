// Firebase connection
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe6AIaouRgKfdsK6IEI6in316B52rO778",
  authDomain: "hflsystem.firebaseapp.com",
  databaseURL: "https://hflsystem-default-rtdb.firebaseio.com",
  projectId: "hflsystem",
  storageBucket: "hflsystem.firebasestorage.app",
  messagingSenderId: "469775027908",
  appId: "1:469775027908:web:f3501f10942f58ba18c391"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// Page navigation
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Member counter animation
let memberCount = 5; 
document.getElementById('member-count').textContent = memberCount;

// Contact form - Firebase save
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const contactsRef = ref(db, 'contacts');
  push(contactsRef, { name, email });
  document.getElementById('contact-success').style.display = 'block';
  contactForm.reset();
});

// Signup form
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('signup-success').style.display = 'block';
      signupForm.reset();
    })
    .catch(error => alert(error.message));
});

// Login form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('login-success').style.display = 'block';
      loginForm.reset();
    })
    .catch(error => alert(error.message));
});
