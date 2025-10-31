// --- 1. CONFIGURATION DE FIREBASE (VOS CLÉS INTÉGRÉES) ---
// Import des bibliothèques nécessaires
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAZ_-iukfMVZmAUoEf-hJ_2TVccrrWbPmA", // Clé Firebase
    authDomain: "scenelog-app.firebaseapp.com",
    projectId: "scenelog-app",
    storageBucket: "scenelog-app.firebasestorage.app",
    messagingSenderId: "503542077517",
    appId: "1:503542077517:web:976e59282abba897f8e404"
};

// --- 2. INITIALISATION ET LOGIQUE GLOBALE ---

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Rend la fonction d'authentification et de déconnexion globale (pour index.html)
window.auth = auth;

// CHEMIN D'ACCÈS PUBLIC SYNCHRONISÉ AVEC LE LIEN DE DÉPLOIEMENT ACTIF
// Basé sur votre lien de déploiement réel : /scenelog-interagency-pwa/
const BASE_URL_ABSOLUE = '/scenelog-interagency-pwa/';

// Fonction de connexion sécurisée
function loginAgent(email, password) {
    document.getElementById('message').innerText = "Connexion en cours...";

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Connexion réussie ! Bienvenue Agent.");
            // Redirection vers le tableau de bord avec le chemin synchronisé
            window.location.href = BASE_URL_ABSOLUE + "index.html"; 
        })
        .catch((error) => {
            const errorMessage = "Erreur de connexion : Email ou mot de passe incorrect.";
            document.getElementById('message').innerText = errorMessage;
            console.error(error);
        });
}

// Fonction de DÉCONNEXION qui redirige correctement (CONTOURNEMENT DE L'ERREUR 404)
window.logoutAgent = function() {
    signOut(auth).then(() => {
        // Déconnexion réussie. On force la redirection vers la page d'index (la page de sécurité).
        // Le script 'onAuthStateChanged' va immédiatement détecter l'absence d'utilisateur 
        // et effectuer la redirection finale et sécurisée vers connexion.html.
        window.location.href = BASE_URL_ABSOLUE + "index.html"; 
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

// Sécurité pour la page index.html (Vérifie si l'utilisateur est connecté au chargement)
onAuthStateChanged(auth, (user) => {
    // Vérifie si l'utilisateur est sur la page index.html ET qu'il n'est pas connecté
    if (!user && window.location.pathname.includes('index.html')) {
        // Redirige vers la page de connexion en utilisant l'URL synchronisée
        window.location.href = BASE_URL_ABSOLUE + "connexion.html";
    }
});
