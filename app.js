// --- 1. CONFIGURATION DE FIREBASE (VOS CLÉS INTÉGRÉES) ---
// ... (reste inchangé)

// --- 2. INITIALISATION ET LOGIQUE GLOBALE ---

// ... (reste inchangé)
window.auth = auth;

// CHEMIN D'ACCÈS PUBLIC RELATIF ABSOLU (SYNCHRONISÉ AVEC LE LIEN DE DÉPLOIEMENT)
// Le nom du lien est '/scenelog-interagency-pwa/' d'après vos captures
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

// Fonction de DÉCONNEXION qui redirige correctement (SOLUTION 404 FINALE)
window.logoutAgent = function() {
    signOut(auth).then(() => {
        // Déconnexion réussie. On force la redirection vers la page de connexion avec le chemin synchronisé.
        window.location.href = BASE_URL_ABSOLUE + "connexion.html";
    }).catch((error) => {
        console.error("Erreur de déconnexion:", error);
        alert("Erreur lors de la déconnexion.");
    });
}

// ... (reste inchangé)
// ... (code de l'écouteur du formulaire et onAuthStateChanged)
