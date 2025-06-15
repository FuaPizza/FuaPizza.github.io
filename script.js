// Theme management
const themeToggle = document.querySelector(
    ".theme-toggle"
);
const body = document.body;

// Check for saved theme or default to light
const savedTheme =
    localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener(
    "click",
    toggleTheme
);
themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
    }
});

function toggleTheme() {
    const currentTheme =
        body.getAttribute("data-theme");
    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
}

// Search functionality
const searchForm = document.querySelector(
    ".search-form"
);
const searchInput = document.getElementById(
    "know-search"
);
const searchButton = document.getElementById(
    "know-button"
);
const docList =
    document.getElementById("doc-list");
const maxResultsSelect = document.getElementById(
    "max-results"
);
const loading =
    document.getElementById("loading");
const resultsInfo = document.getElementById(
    "results-info"
);
const noResults =
    document.getElementById("no-results");
const resultsHeader = document.getElementById(
    "results-header"
);

let currentQuery = "";
let maxResults = 10;

searchForm.addEventListener(
    "submit",
    async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (query) {
            currentQuery = query;
            await fetchResults();
        } else {
            // Se la ricerca è vuota, resetta tutto
            resetSearch();
        }
    }
);

maxResultsSelect.addEventListener(
    "change",
    async () => {
        maxResults = parseInt(
            maxResultsSelect.value
        );
        if (currentQuery) {
            await fetchResults();
        }
    }
);

async function fetchResults() {
    showLoading();
    hideNoResults();
    hideResultsHeader();
    deleteResults();

    // Aggiungi la classe has-results quando inizia la ricerca
    updateLayoutForResults(true);

    try {
        const search = await searchQuery(
            currentQuery,
            maxResults
        );
        hideLoading();

        if (search.results.length === 0) {
            showNoResults();
        } else {
            showResultsHeader(
                search.results.length
            );
            for (let result of search.results) {
                await displayResult(result);
            }
        }
    } catch (error) {
        hideLoading();
        console.error(
            "Error fetching search results:",
            error
        );
        showError(
            "Si è verificato un errore durante la ricerca. Riprova più tardi."
        );
        // In caso di errore, rimuovi la classe has-results
        updateLayoutForResults(false);
    }
}

async function searchQuery(query, limit) {
    const url = `https://apiedge-eu-central-1.knowunity.com/search/knows?query=${encodeURIComponent(
        query
    )}&contentType=KNOW&limit=${limit}&contentLanguageCode=it`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(
            `HTTP error! status: ${response.status}`
        );
    }
    const data = await response.json();
    return {
        results: data.content || [],
    };
}

async function displayResult(result) {
    const doc = document.createElement("article");
    doc.classList.add(
        "glass-card",
        "result-card"
    );

    try {
        const contentUrl = await fetchContentUrl(
            result.know.uuid
        );

        doc.innerHTML = `
                    <div class="result-thumbnail">
                        <img 
                            src="${
                                result.know
                                    .thumbnailLargeUrl
                            }" 
                            alt="Anteprima di ${
                                result.know.title
                            }"
                            loading="lazy"
                            onerror="this.style.display='none'"
                        />
                    </div>
                    <div class="result-content">
                        <h3 class="result-title">${escapeHtml(
                            result.know.title
                        )}</h3>
                        <p class="result-description">${escapeHtml(
                            result.know
                                .description ||
                                "Nessuna descrizione disponibile"
                        )}</p>
                        <div class="result-actions">
                            ${
                                contentUrl
                                    ? `<a href="${contentUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15,3 21,3 21,9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    Apri contenuto
                                </a>`
                                    : '<span class="unavailable">Contenuto non disponibile</span>'
                            }
                        </div>
                    </div>
                `;

        docList.appendChild(doc);
    } catch (error) {
        console.error(
            "Error displaying result:",
            error
        );
    }
}

async function fetchContentUrl(uuid) {
    const pattern =
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    const match = pattern.exec(uuid);

    if (match) {
        const url = `https://apiedge-eu-central-1.knowunity.com/knows/${match[0]}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`
            );
        }
        const data = await response.json();
        return (
            data.documents?.[0]?.contentUrl ||
            null
        );
    }
    return null;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    loading.classList.remove("hidden");
    searchButton.disabled = true;
}

function hideLoading() {
    loading.classList.add("hidden");
    searchButton.disabled = false;
}

function showResultsHeader(shown) {
    resultsInfo.textContent = `Mostrati ${shown} risultati per "${currentQuery}"`;
    resultsHeader.classList.remove("hidden");
}

function hideResultsHeader() {
    resultsHeader.classList.add("hidden");
}

function showNoResults() {
    noResults.classList.remove("hidden");
}

function hideNoResults() {
    noResults.classList.add("hidden");
}

function showError(message) {
    // You can implement a proper error display here
    console.error(message);
}

function deleteResults() {
    docList.innerHTML = "";
}

// Enhanced keyboard navigation
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        searchInput.blur();
    }
});

// Aggiungi questa funzione per gestire il layout
function updateLayoutForResults(hasResults) {
    const container =
        document.querySelector(".container");
    const resultsSection = document.querySelector(
        ".results-section"
    );

    if (hasResults) {
        container.classList.add("has-results");
        // Assicurati che la sezione risultati sia visibile
        resultsSection.style.display = "block";
    } else {
        container.classList.remove("has-results");
        // Nascondi la sezione risultati se non ci sono risultati
        resultsSection.style.display = "none";
    }
}

// Aggiungi anche questa funzione per resettare tutto quando non ci sono ricerche
function resetSearch() {
    deleteResults();
    hideLoading();
    hideNoResults();
    hideResultsHeader();
    updateLayoutForResults(false);
    currentQuery = "";
}
