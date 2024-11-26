//Importando as configurações do projeto para inicialização do app que foi criado no site

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//importando os modulos de autenticação
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdYcIKEOVL8DkeHDSs_Wzxv6RAWAWUOVI",
  authDomain: "reactdevlinks-5ce15.firebaseapp.com",
  projectId: "reactdevlinks-5ce15",
  storageBucket: "reactdevlinks-5ce15.firebasestorage.app",
  messagingSenderId: "246154948871",
  appId: "1:246154948871:web:ca5074b73dabc708ccd5a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//o getAuth pede qual tipo de serviço do firebase eu vou inicializar
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db};