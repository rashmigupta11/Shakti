// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Your web app's Firebase configuration

  const firebaseConfig = {
    apiKey: "AIzaSyCo8sQ-kTwE932vzaMQbGoI_uz5xf4MWNw",
    authDomain: "defence-staff.firebaseapp.com",
    databaseURL: "https://defence-staff-default-rtdb.firebaseio.com",
    projectId: "defence-staff",
    storageBucket: "defence-staff.appspot.com",
    messagingSenderId: "1063355959527",
    appId: "1:1063355959527:web:a584397fd1fed27179ba42",
    measurementId: "G-Q1R9RJYC96"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Function to check if email is in use
async function isEmailInUse(email) {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false; // Assume email is not in use if error occurs
  }
}

// Add event listener for form submission
document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;

    // Validate password and confirm password
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Check if the email is already in use
    const emailInUse = await isEmailInUse(email);
    if (emailInUse) {
        alert("Email is already in use. Please use a different email or log in.");
        return;
    }

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user info in Firebase Realtime Database
        await set(ref(db, 'users/' + user.uid), {
            name: name,
            email: email,
            role: role
        });

        alert('User registered successfully!');
        // Reset the form
        document.getElementById('registration-form').reset();
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed. Please try again.');
    }
});
