// Simple test to check Firebase auth configuration
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

console.log("Firebase Auth instance:", auth);
console.log("Firebase Auth app:", auth.app);
console.log("Firebase Auth config:", auth.app.options);

// Test auth state listener
onAuthStateChanged(auth, (user) => {
  console.log("Auth state changed:", user ? "User logged in" : "User logged out");
});
