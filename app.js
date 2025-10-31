// --- 1. CONFIGURATION DE FIREBASE (VOS CLÉS INTÉGRÉES) ---
// Import des bibliothèques nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
const auth = getAuth(app);

// Rend la fonction 'auth' accessible à l'extérieur (pour index.html)
window.auth = auth;

// Fonction de connexion sécurisée
function loginAgent(email, password) {
    document.getElementById('message').innerText = "Connexion en cours...";

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Connexion réussie ! Bienvenue Agent.");
            window.location.href = "index.html"; 
        })
        .catch((error) => {
            const errorMessage = "Erreur de connexion : Email ou mot de passe incorrect.";
            document.getElementById('message').innerText = errorMessage;
            console.error(error);
        });
}

// Nouvelle fonction de DÉCONNEXION qui redirige correctement
window.logoutAgent = function() {
    signOut(auth).then(() => {
        // Déconnexion réussie. On force la redirection vers la page de connexion.
        // C'est ce qui règle le problème de la 404
        window.location.href = "connexion.html";
    }).catch((error) => {
        console.error("Erreur de déconnexion:", error);
        alert("Erreur lors de la déconnexion.");
    });
}

// Écouteur pour le formulaire de connexion (connexion.html)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            loginAgent(email, password);
        });
    }
});
