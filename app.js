// --- 1. CONFIGURATION DE FIREBASE (VOS CLÉS INTÉGRÉES) ---
// Import des bibliothèques nécessaires à l'authentification (doit être chargé avant ce fichier JS)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZ_-iukfMVZmAUoEf-hJ_2TVccrrWbPmA",
    authDomain: "scenelog-app.firebaseapp.com",
    projectId: "scenelog-app",
    storageBucket: "scenelog-app.firebasestorage.app",
    messagingSenderId: "503542077517",
    appId: "1:503542077517:web:976e59282abba897f8e404"
};

// --- 2. INITIALISATION ET LOGIQUE DE CONNEXION ---

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
// Accès au service d'authentification
const auth = getAuth(app);

// Fonction de connexion sécurisée
function loginAgent(email, password) {
    // Message de chargement
    document.getElementById('message').innerText = "Connexion en cours...";

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Connexion réussie, rediriger l'agent vers le tableau de bord
            alert("Connexion réussie ! Bienvenue Agent.");
            window.location.href = "index.html"; // Redirection vers le tableau de bord
        })
        .catch((error) => {
            // Afficher l'erreur si la connexion échoue (mauvais email/mdp)
            const errorMessage = "Erreur de connexion : Email ou mot de passe incorrect.";
            document.getElementById('message').innerText = errorMessage;
            console.error(error); // Pour le débug
        });
}

// Écouteur pour le formulaire de connexion (dans connexion.html)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Si le formulaire existe, on ajoute l'écouteur d'événement 'submit'
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de la page par défaut
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Tente la connexion avec les informations saisies
            loginAgent(email, password);
        });
    }
});
