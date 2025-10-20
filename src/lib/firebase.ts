import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA0V9AzXKW5M4fIWObNynk7cZhCLv_Vb-k",
  authDomain: "saas-acolitos.firebaseapp.com",
  projectId: "saas-acolitos",
  storageBucket: "saas-acolitos.firebasestorage.app",
  messagingSenderId: "778062781395",
  appId: "1:778062781395:web:c1b5179864193afb122d26",
  measurementId: "G-10KF10BEM3"

}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar serviços
export const auth = getAuth(app)
export const db = getFirestore(app)

// Configurar provedor Google
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope("email")
googleProvider.addScope("profile")

export default app
