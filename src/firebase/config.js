// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9qR3QqmEBFD0tlaRMgyoOlQry8stky8U",
  authDomain: "projectecommerce-34203.firebaseapp.com",
  projectId: "projectecommerce-34203",
  storageBucket: "projectecommerce-34203.appspot.com",
  messagingSenderId: "480519051291",
  appId: "1:480519051291:web:e3689de33bcdf6a1d5c0be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(File) {
  const storageRef = ref(storage, File.name);
  await uploadBytes(storageRef, File);
  const url = await getDownloadURL(storageRef);
  return url;
}
