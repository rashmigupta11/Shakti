// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIOjn6eDrLU-bbng283MeGZm_NTMSEXgQ",
    authDomain: "women-safety-e9e68.firebaseapp.com",
    databaseURL: "https://women-safety-e9e68-default-rtdb.firebaseio.com",
    projectId: "women-safety-e9e68",
    storageBucket: "women-safety-e9e68.appspot.com",
    messagingSenderId: "649606144313",
    appId: "1:649606144313:web:bb4adf0e3a9d8ef8f808e8",
    measurementId: "G-DBBN3G006T"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Successfully signed in
            const user = userCredential.user;
            alert('Login successful!');
            window.location.href = "/maininterface.html";  // Redirect to another page after login
        })
        .catch((error) => {
            // Handle error
            alert(`User not found.`);
        });
});
