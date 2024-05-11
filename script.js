// script.js

// URL della directory su GitHub
const directoryUrl = "https://raw.githubusercontent.com/JulsSal99/Canti/main/";

// Funzione per ottenere l'elenco delle cartelle
async function fetchFoldersList() {
    try {
        const response = await fetch(directoryUrl);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const folderLinks = Array.from(doc.querySelectorAll('a[href$="/"]')); // Seleziona solo i link che terminano con '/'
        const folderNames = folderLinks.map(link => link.href.split('/').filter(Boolean).pop()); // Ottieni solo i nomi delle cartelle
        return folderNames;
    } catch (error) {
        console.error("Errore durante il recupero dell'elenco delle cartelle:", error);
        return [];
    }
}

// Funzione per creare un elenco HTML delle cartelle
function renderFoldersList(folders) {
    const foldersListElement = document.getElementById("foldersList");
    folders.forEach(folder => {
        const folderLink = document.createElement("a");
        folderLink.textContent = folder;
        folderLink.href = "#" + folder;
        folderLink.onclick = () => openLibrary(folder);
        foldersListElement.appendChild(folderLink);
        foldersListElement.appendChild(document.createElement("br"));
    });
}

// Funzione per aprire il file library.html di una cartella
function openLibrary(folderName) {
    window.open(directoryUrl + folderName + "/library.html", "_blank");
}

// Avvia il processo di recupero e rendering delle cartelle
async function start() {
    const foldersList = await fetchFoldersList();
    renderFoldersList(foldersList);
}

// Avvia il processo quando il documento è pronto
document.addEventListener("DOMContentLoaded", start);
