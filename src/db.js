import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Firebase configuration
const config = {
    apiKey: "AIzaSyCpFi8Br5T9ocn0_NCQRtN7KXjNGkzZxcA",
    authDomain: "contact-book-8a9a8.firebaseapp.com",
    databaseURL: "https://contact-book-8a9a8-default-rtdb.firebaseio.com",
    projectId: "contact-book-8a9a8",
    storageBucket: "contact-book-8a9a8.appspot.com",
    messagingSenderId: "137368020357",
    appId: "1:137368020357:web:905e31dc5a9fa727c190ec"
};

const app = initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const colRef = collection(db, "contacts")

export const getContacts = () => {
    return getDocs(colRef)
}

export const addContact = (payload) => {
    return addDoc(colRef, payload)
}

export const updateContact = (payload) => {
    const docRef = doc(db, "contacts", payload.id)
    return updateDoc(docRef, payload)
}

export const deleteContact = (payload) => {
    const docRef = doc(db, "contacts", payload.id)
    return deleteDoc(docRef)
}
