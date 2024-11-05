import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0j6ZhbJcz1rH7etlT1Wb7lTrQiBVXBxA",
  authDomain: "skytracker-6cca5.firebaseapp.com",
  projectId: "skytracker-6cca5",
  storageBucket: "skytracker-6cca5.appspot.com",
  messagingSenderId: "1056107306724",
  appId: "1:1056107306724:web:61120d767f9be9a00cd6f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
