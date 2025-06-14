const _0x43f78c = _0x1c32;
(function (_0x15d60e, _0x5e5b92) {
    const _0x489d5c = _0x1c32,
        _0x23d760 = _0x15d60e();
    while (!![]) {
        try {
            const _0x30c4ab =
                (parseInt(_0x489d5c(0x169)) /
                    0x1) *
                    (parseInt(_0x489d5c(0x194)) /
                        0x2) +
                (parseInt(_0x489d5c(0x185)) /
                    0x3) *
                    (parseInt(_0x489d5c(0x196)) /
                        0x4) +
                parseInt(_0x489d5c(0x1a8)) / 0x5 +
                (-parseInt(_0x489d5c(0x1a7)) /
                    0x6) *
                    (-parseInt(_0x489d5c(0x19c)) /
                        0x7) +
                (-parseInt(_0x489d5c(0x1ad)) /
                    0x8) *
                    (parseInt(_0x489d5c(0x193)) /
                        0x9) +
                (parseInt(_0x489d5c(0x1b1)) /
                    0xa) *
                    (parseInt(_0x489d5c(0x189)) /
                        0xb) +
                -parseInt(_0x489d5c(0x16d)) / 0xc;
            if (_0x30c4ab === _0x5e5b92) break;
            else
                _0x23d760["push"](
                    _0x23d760["shift"]()
                );
        } catch (_0x41519c) {
            _0x23d760["push"](
                _0x23d760["shift"]()
            );
        }
    }
})(_0xec51, 0x973a1);
const themeToggle = document["querySelector"](
        _0x43f78c(0x1b3)
    ),
    body = document[_0x43f78c(0x1aa)],
    savedTheme =
        localStorage[_0x43f78c(0x19a)](
            _0x43f78c(0x180)
        ) || _0x43f78c(0x178);
body[_0x43f78c(0x19b)](
    _0x43f78c(0x16f),
    savedTheme
),
    themeToggle["addEventListener"](
        _0x43f78c(0x188),
        toggleTheme
    ),
    themeToggle[_0x43f78c(0x17c)](
        _0x43f78c(0x17a),
        (_0x59e197) => {
            const _0x3cc1b7 = _0x43f78c;
            (_0x59e197[_0x3cc1b7(0x16c)] ===
                "Enter" ||
                _0x59e197[_0x3cc1b7(0x16c)] ===
                    "\x20") &&
                (_0x59e197["preventDefault"](),
                toggleTheme());
        }
    );
function toggleTheme() {
    const _0x254aee = _0x43f78c,
        _0x5444a7 = body[_0x254aee(0x197)](
            _0x254aee(0x16f)
        ),
        _0x51ab91 =
            _0x5444a7 === _0x254aee(0x176)
                ? _0x254aee(0x178)
                : _0x254aee(0x176);
    body[_0x254aee(0x19b)](
        _0x254aee(0x16f),
        _0x51ab91
    ),
        localStorage["setItem"](
            _0x254aee(0x180),
            _0x51ab91
        );
}
const searchForm = document[_0x43f78c(0x168)](
        _0x43f78c(0x1a3)
    ),
    searchInput = document[_0x43f78c(0x192)](
        _0x43f78c(0x16a)
    ),
    searchButton = document["getElementById"](
        "know-button"
    ),
    docList = document[_0x43f78c(0x192)](
        _0x43f78c(0x175)
    ),
    maxResultsSelect = document["getElementById"](
        _0x43f78c(0x18d)
    ),
    loading =
        document["getElementById"]("loading"),
    resultsInfo = document[_0x43f78c(0x192)](
        _0x43f78c(0x1ac)
    ),
    noResults = document["getElementById"](
        _0x43f78c(0x166)
    ),
    resultsHeader = document["getElementById"](
        "results-header"
    );
let currentQuery = "",
    maxResults = 0xa;
searchForm[_0x43f78c(0x17c)](
    _0x43f78c(0x18e),
    async (_0x1b8077) => {
        const _0x464d27 = _0x43f78c;
        _0x1b8077[_0x464d27(0x19d)](),
            (currentQuery =
                searchInput[_0x464d27(0x174)][
                    "trim"
                ]()),
            currentQuery &&
                (await fetchResults());
    }
),
    maxResultsSelect[_0x43f78c(0x17c)](
        _0x43f78c(0x1a9),
        async () => {
            (maxResults = parseInt(
                maxResultsSelect["value"]
            )),
                currentQuery &&
                    (await fetchResults());
        }
    );
async function fetchResults() {
    const _0x2d19f5 = _0x43f78c;
    showLoading(),
        hideNoResults(),
        hideResultsHeader(),
        deleteResults();
    try {
        const _0x5e81d9 = await searchQuery(
            currentQuery,
            maxResults
        );
        hideLoading();
        if (
            _0x5e81d9[_0x2d19f5(0x184)][
                _0x2d19f5(0x18c)
            ] === 0x0
        )
            showNoResults();
        else {
            showResultsHeader(
                _0x5e81d9[_0x2d19f5(0x184)][
                    _0x2d19f5(0x18c)
                ]
            );
            for (let _0x38b3d7 of _0x5e81d9[
                "results"
            ]) {
                await displayResult(_0x38b3d7);
            }
        }
    } catch (_0x44491c) {
        hideLoading(),
            console[_0x2d19f5(0x19e)](
                _0x2d19f5(0x1a4),
                _0x44491c
            ),
            showError(_0x2d19f5(0x17d));
    }
}
async function searchQuery(_0x432cb1, _0x3198ba) {
    const _0x2ad8bc = _0x43f78c,
        _0x17ac84 =
            "https://apiedge-eu-central-1.knowunity.com/search/knows?query=" +
            encodeURIComponent(_0x432cb1) +
            _0x2ad8bc(0x1a0) +
            _0x3198ba +
            "&contentLanguageCode=it",
        _0x11006d = await fetch(_0x17ac84);
    if (!_0x11006d["ok"])
        throw new Error(
            _0x2ad8bc(0x1a5) +
                _0x11006d[_0x2ad8bc(0x187)]
        );
    const _0x44de93 = await _0x11006d["json"]();
    return {
        results:
            _0x44de93[_0x2ad8bc(0x17e)] || [],
    };
}
async function displayResult(_0x4264f4) {
    const _0x26b762 = _0x43f78c,
        _0x11ff1a = document["createElement"](
            _0x26b762(0x195)
        );
    _0x11ff1a[_0x26b762(0x190)]["add"](
        _0x26b762(0x1a2),
        _0x26b762(0x170)
    );
    try {
        const _0x2d53e9 = await fetchContentUrl(
            _0x4264f4[_0x26b762(0x1b2)][
                _0x26b762(0x1a6)
            ]
        );
        (_0x11ff1a[_0x26b762(0x1b0)] =
            _0x26b762(0x1ae) +
            _0x4264f4["know"][_0x26b762(0x172)] +
            _0x26b762(0x183) +
            _0x4264f4[_0x26b762(0x1b2)][
                _0x26b762(0x181)
            ] +
            _0x26b762(0x1a1) +
            escapeHtml(
                _0x4264f4[_0x26b762(0x1b2)][
                    _0x26b762(0x181)
                ]
            ) +
            _0x26b762(0x182) +
            escapeHtml(
                _0x4264f4[_0x26b762(0x1b2)][
                    _0x26b762(0x19f)
                ] || _0x26b762(0x179)
            ) +
            "</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22result-actions\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20" +
            (_0x2d53e9
                ? _0x26b762(0x17f) +
                  _0x2d53e9 +
                  _0x26b762(0x18f)
                : "<span\x20class=\x22unavailable\x22>Contenuto\x20non\x20disponibile</span>") +
            _0x26b762(0x1ab)),
            docList["appendChild"](_0x11ff1a);
    } catch (_0x437567) {
        console[_0x26b762(0x19e)](
            "Error\x20displaying\x20result:",
            _0x437567
        );
    }
}
async function fetchContentUrl(_0x43671) {
    const _0x25e8c0 = _0x43f78c,
        _0x82d473 =
            /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
        _0x389007 =
            _0x82d473[_0x25e8c0(0x191)](_0x43671);
    if (_0x389007) {
        const _0x5a8147 =
                "https://apiedge-eu-central-1.knowunity.com/knows/" +
                _0x389007[0x0],
            _0x5f3e84 = await fetch(_0x5a8147);
        if (!_0x5f3e84["ok"])
            throw new Error(
                _0x25e8c0(0x1a5) +
                    _0x5f3e84[_0x25e8c0(0x187)]
            );
        const _0x25f8a2 = await _0x5f3e84[
            _0x25e8c0(0x173)
        ]();
        return (
            _0x25f8a2[_0x25e8c0(0x16b)]?.[0x0]?.[
                _0x25e8c0(0x1af)
            ] || null
        );
    }
    return null;
}
function escapeHtml(_0x45faef) {
    const _0x207f8b = _0x43f78c,
        _0x34c836 = document[_0x207f8b(0x177)](
            _0x207f8b(0x186)
        );
    return (
        (_0x34c836[_0x207f8b(0x17b)] = _0x45faef),
        _0x34c836[_0x207f8b(0x1b0)]
    );
}
function showLoading() {
    const _0x327968 = _0x43f78c;
    loading[_0x327968(0x190)][_0x327968(0x18b)](
        _0x327968(0x198)
    ),
        (searchButton[_0x327968(0x199)] = !![]);
}
function hideLoading() {
    const _0x2b43ec = _0x43f78c;
    loading["classList"]["add"](_0x2b43ec(0x198)),
        (searchButton["disabled"] = ![]);
}
function showResultsHeader(_0x195b28) {
    const _0x3c9e10 = _0x43f78c;
    (resultsInfo[_0x3c9e10(0x17b)] =
        _0x3c9e10(0x167) +
        _0x195b28 +
        "\x20risultati\x20per\x20\x22" +
        currentQuery +
        "\x22"),
        resultsHeader["classList"][
            _0x3c9e10(0x18b)
        ](_0x3c9e10(0x198));
}
function hideResultsHeader() {
    const _0x5651c3 = _0x43f78c;
    resultsHeader["classList"][_0x5651c3(0x18a)](
        _0x5651c3(0x198)
    );
}
function _0xec51() {
    const _0x16f9f8 = [
        "json",
        "value",
        "doc-list",
        "dark",
        "createElement",
        "light",
        "Nessuna\x20descrizione\x20disponibile",
        "keydown",
        "textContent",
        "addEventListener",
        "Si\x20è\x20verificato\x20un\x20errore\x20durante\x20la\x20ricerca.\x20Riprova\x20più\x20tardi.",
        "content",
        "<a\x20href=\x22",
        "theme",
        "title",
        "</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22result-description\x22>",
        "\x22\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20alt=\x22Anteprima\x20di\x20",
        "results",
        "341085neIHKI",
        "div",
        "status",
        "click",
        "1399409mGQGSb",
        "add",
        "remove",
        "length",
        "max-results",
        "submit",
        "\x22\x20target=\x22_blank\x22\x20rel=\x22noopener\x20noreferrer\x22\x20class=\x22btn-primary\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<svg\x20width=\x2216\x22\x20height=\x2216\x22\x20viewBox=\x220\x200\x2024\x2024\x22\x20fill=\x22none\x22\x20stroke=\x22currentColor\x22\x20stroke-width=\x222\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<path\x20d=\x22M18\x2013v6a2\x202\x200\x200\x201-2\x202H5a2\x202\x200\x200\x201-2-2V8a2\x202\x200\x200\x201\x202-2h6\x22></path>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<polyline\x20points=\x2215,3\x2021,3\x2021,9\x22></polyline>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<line\x20x1=\x2210\x22\x20y1=\x2214\x22\x20x2=\x2221\x22\x20y2=\x223\x22></line>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</svg>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20Apri\x20contenuto\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</a>",
        "classList",
        "exec",
        "getElementById",
        "9cjyvpy",
        "612480vbradP",
        "article",
        "4xfMlTK",
        "getAttribute",
        "hidden",
        "disabled",
        "getItem",
        "setAttribute",
        "7gKlZKa",
        "preventDefault",
        "error",
        "description",
        "&contentType=KNOW&limit=",
        "\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20loading=\x22lazy\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20onerror=\x22this.style.display=\x27none\x27\x22\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22result-content\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<h3\x20class=\x22result-title\x22>",
        "glass-card",
        ".search-form",
        "Error\x20fetching\x20search\x20results:",
        "HTTP\x20error!\x20status:\x20",
        "uuid",
        "6489594kpkCZj",
        "407605obVzjb",
        "change",
        "body",
        "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20",
        "results-info",
        "6107224BEiUIL",
        "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22result-thumbnail\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<img\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20src=\x22",
        "contentUrl",
        "innerHTML",
        "10WxfGDP",
        "know",
        ".theme-toggle",
        "no-results",
        "Mostrati\x20",
        "querySelector",
        "1mjxWxc",
        "know-search",
        "documents",
        "key",
        "3929352YCSsox",
        "blur",
        "data-theme",
        "result-card",
        "Escape",
        "thumbnailLargeUrl",
    ];
    _0xec51 = function () {
        return _0x16f9f8;
    };
    return _0xec51();
}
function showNoResults() {
    const _0x74d31 = _0x43f78c;
    noResults[_0x74d31(0x190)][_0x74d31(0x18b)](
        "hidden"
    );
}
function hideNoResults() {
    const _0x364483 = _0x43f78c;
    noResults["classList"][_0x364483(0x18a)](
        _0x364483(0x198)
    );
}
function showError(_0x32771c) {
    const _0x130286 = _0x43f78c;
    console[_0x130286(0x19e)](_0x32771c);
}
function _0x1c32(_0x1a583e, _0x29cb53) {
    const _0xec5189 = _0xec51();
    return (
        (_0x1c32 = function (
            _0x1c3295,
            _0x36c2a4
        ) {
            _0x1c3295 = _0x1c3295 - 0x166;
            let _0x3cba86 = _0xec5189[_0x1c3295];
            return _0x3cba86;
        }),
        _0x1c32(_0x1a583e, _0x29cb53)
    );
}
function deleteResults() {
    const _0x94074d = _0x43f78c;
    docList[_0x94074d(0x1b0)] = "";
}
searchInput[_0x43f78c(0x17c)](
    _0x43f78c(0x17a),
    (_0x4570f3) => {
        const _0x2a96d4 = _0x43f78c;
        _0x4570f3[_0x2a96d4(0x16c)] ===
            _0x2a96d4(0x171) &&
            searchInput[_0x2a96d4(0x16e)]();
    }
);
