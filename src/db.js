import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Firebase configuration
const config = {
    apiKey: "AIzaSyCMTOnFo7C5pmIHe_4GP1UZEZvOn9rzCiA",
    authDomain: "contact-book-a456f.firebaseapp.com",
    projectId: "contact-book-a456f",
    storageBucket: "contact-book-a456f.appspot.com",
    messagingSenderId: "859164722549",
    appId: "1:859164722549:web:9c56e812d0e17fc19cff3c"
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
