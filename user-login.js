// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCo8sQ-kTwE932vzaMQbGoI_uz5xf4MWNw",
    authDomain: "defence-staff.firebaseapp.com",
    projectId: "defence-staff",
    storageBucket: "defence-staff.appspot.com",
    messagingSenderId: "1063355959527",
    appId: "1:1063355959527:web:a584397fd1fed27179ba42"
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
            window.location.href = "/womeninterface.html";  // Redirect to another page after login
        })
        .catch((error) => {
            // Handle error
            alert(`User not found.`);
        });
});
