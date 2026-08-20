// ============================================================
// WanderBangla v5.0 — MAIN INTERACTIVE ENGINE
// ------------------------------------------------------------
// Dynamic • Responsive • Safe • Smooth • Feature Complete
//
// Compatible with:
//   data.js
//   tools.js
//   index.html
//   style.css
//
// Main features:
//   Theme
//   Navbar
//   Search
//   Filters
//   Sorting
//   Destinations
//   Foods
//   Culture
//   Travel Tips
//   Favorites
//   Trip Planner
//   Budget Calculator
//   Destination Modal
//   Reviews
//   Surprise Me
//   Leaflet Map
//   Toast
//   Scroll Animation
//   LocalStorage
//   Sharing
// ============================================================


// ============================================================
// GLOBAL STATE
// ============================================================

let searchTimeout = null;

let currentFilter = "all";
let currentRegion = "all";
let currentSort = "rating";

let currentFoodFilter = "all";

let mapInstance = null;
let mapInitialized = false;

let toastTimer = null;


// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  try {

    initTheme();

    initNavbar();

    initSearch();

    initFilters();

    initFoodFilters();

    renderDestinations();

    renderFoods();

    renderCultures();

    renderTravelTips();

    initTripPlanner();

    initFavorites();

    initModal();

    initSurpriseMe();

    initBudgetCalculator();

    initGlobalButtons();

    updateFavCount();

    animateOnScroll();

    // Leaflet may load after page render.
    setTimeout(() => {
      initMap();
    }, 600);

    showWelcomeToast();

    console.log(
      "✅ WanderBangla v5 main engine initialized."
    );

  }

  catch (error) {

    console.error(
      "❌ WanderBangla initialization error:",
      error
    );

    showToast(
      "⚠️ কিছু অংশ লোড হতে সমস্যা হয়েছে।"
    );

  }

});


// ============================================================
// DATA SAFETY
// ============================================================

function getWBData() {

  const data =
    window.WanderBangla || {};

  return {

    destinations:
      Array.isArray(data.destinations)
        ? data.destinations
        : [],

    foods:
      Array.isArray(data.foods)
        ? data.foods
        : [],

    cultures:
      Array.isArray(data.cultures)
        ? data.cultures
        : [],

    travelTips:
      Array.isArray(data.travelTips)
        ? data.travelTips
        : [],

    tripTemplates:
      data.tripTemplates || {},

    categories:
      Array.isArray(data.categories)
        ? data.categories
        : [],

    foodCategories:
      Array.isArray(data.foodCategories)
        ? data.foodCategories
        : [],

    bangladeshRegions:
      Array.isArray(data.bangladeshRegions)
        ? data.bangladeshRegions
        : [],

    wikiImage:
      typeof data.wikiImage === "function"
        ? data.wikiImage
        : null,

    handleImageError:
      typeof data.handleImageError === "function"
        ? data.handleImageError
        : null,

    DEFAULT_IMAGE:
      data.DEFAULT_IMAGE ||
      ""

  };

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ============================================================
// SAFE URL
// ============================================================

function safeImageURL(url) {

  const value =
    String(url || "").trim();

  if (!value) {

    return "";

  }

  return escapeHTML(value);

}


// ============================================================
// LOCAL STORAGE SAFE GET
// ============================================================

function safeStorageGet(
  key,
  fallback = null
) {

  try {

    const value =
      localStorage.getItem(key);

    if (
      value === null ||
      value === undefined
    ) {

      return fallback;

    }

    return value;

  }

  catch (error) {

    console.warn(
      "LocalStorage read failed:",
      key,
      error
    );

    return fallback;

  }

}


// ============================================================
// LOCAL STORAGE SAFE SET
// ============================================================

function safeStorageSet(
  key,
  value
) {

  try {

    localStorage.setItem(
      key,
      value
    );

    return true;

  }

  catch (error) {

    console.warn(
      "LocalStorage write failed:",
      key,
      error
    );

    return false;

  }

}


// ============================================================
// THEME
// ============================================================

function initTheme() {

  const saved =
    safeStorageGet(
      "wb-theme",
      "light"
    );

  const theme =
    saved === "dark"
      ? "dark"
      : "light";

  document.documentElement
    .setAttribute(
      "data-theme",
      theme
    );

  updateThemeIcon(theme);

  document
    .getElementById("themeToggle")
    ?.addEventListener(
      "click",
      () => {

        const current =
          document.documentElement
            .getAttribute(
              "data-theme"
            ) || "light";

        const next =
          current === "dark"
            ? "light"
            : "dark";

        document.documentElement
          .setAttribute(
            "data-theme",
            next
          );

        safeStorageSet(
          "wb-theme",
          next
        );

        updateThemeIcon(next);

        showToast(
          next === "dark"
            ? "🌙 ডার্ক মোড চালু হয়েছে"
            : "☀️ লাইট মোড চালু হয়েছে"
        );

      }
    );

}


// ============================================================
// THEME ICON
// ============================================================

function updateThemeIcon(theme) {

  const btn =
    document.getElementById(
      "themeToggle"
    );

  if (!btn)
    return;

  btn.textContent =
    theme === "dark"
      ? "☀️"
      : "🌙";

  btn.setAttribute(
    "aria-label",
    theme === "dark"
      ? "লাইট মোড"
      : "ডার্ক মোড"
  );

}


// ============================================================
// NAVBAR
// ============================================================

function initNavbar() {

  const navbar =
    document.querySelector(
      ".navbar"
    );

  const toggle =
    document.getElementById(
      "mobileToggle"
    );

  const links =
    document.querySelector(
      ".nav-links"
    );


  window.addEventListener(
    "scroll",
    () => {

      navbar?.classList.toggle(
        "scrolled",
        window.scrollY > 40
      );

      updateActiveNav();

    },
    {
      passive: true
    }
  );


  toggle?.addEventListener(
    "click",
    () => {

      links?.classList.toggle(
        "open"
      );

      const isOpen =
        links?.classList.contains(
          "open"
        );

      toggle.setAttribute(
        "aria-expanded",
        String(
          Boolean(isOpen)
        )
      );

    }
  );


  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            links?.classList.remove(
              "open"
            );

            toggle?.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      }
    );


  updateActiveNav();

}


// ============================================================
// ACTIVE NAV
// ============================================================

function updateActiveNav() {

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  if (!sections.length)
    return;

  let current = "";

  sections.forEach(
    section => {

      const top =
        section.offsetTop - 170;

      if (
        window.scrollY >= top
      ) {

        current =
          section.id;

      }

    }
  );


  document
    .querySelectorAll(
      ".nav-links a"
    )
    .forEach(
      link => {

        const href =
          link.getAttribute(
            "href"
          );

        link.classList.toggle(
          "active",
          href ===
            "#" + current
        );

      }
    );

}


// ============================================================
// SEARCH INIT
// ============================================================

function initSearch() {

  const searchBtn =
    document.getElementById(
      "searchToggle"
    );

  const searchBox =
    document.querySelector(
      ".search-box"
    );

  const input =
    document.getElementById(
      "globalSearch"
    );

  const results =
    document.getElementById(
      "searchResults"
    );


  searchBtn?.addEventListener(
    "click",
    () => {

      searchBox?.classList.toggle(
        "active"
      );

      if (
        searchBox?.classList.contains(
          "active"
        )
      ) {

        input?.focus();

      }

    }
  );


  input?.addEventListener(
    "input",
    event => {

      clearTimeout(
        searchTimeout
      );

      searchTimeout =
        setTimeout(
          () => {

            performSearch(
              event.target.value
            );

          },
          180
        );

    }
  );


  input?.addEventListener(
    "keydown",
    event => {

      const items =
        results?.querySelectorAll(
          ".search-item"
        );

      if (!items?.length)
        return;


      let current =
        results.querySelector(
          ".search-item.focused"
        );


      if (
        event.key ===
        "ArrowDown"
      ) {

        event.preventDefault();

        if (!current) {

          items[0]
            .classList.add(
              "focused"
            );

        }

        else {

          current.classList.remove(
            "focused"
          );

          const next =
            current.nextElementSibling ||
            items[0];

          next.classList.add(
            "focused"
          );

        }

      }


      else if (
        event.key ===
        "ArrowUp"
      ) {

        event.preventDefault();

        if (!current) {

          items[
            items.length - 1
          ].classList.add(
            "focused"
          );

        }

        else {

          current.classList.remove(
            "focused"
          );

          const previous =
            current.previousElementSibling ||
            items[
              items.length - 1
            ];

          previous.classList.add(
            "focused"
          );

        }

      }


      else if (
        event.key === "Enter" &&
        current
      ) {

        event.preventDefault();

        current.click();

      }

      else if (
        event.key === "Escape"
      ) {

        results?.classList.remove(
          "show"
        );

        searchBox?.classList.remove(
          "active"
        );

      }

    }
  );


  document.addEventListener(
    "click",
    event => {

      if (
        !event.target.closest(
          ".search-box"
        ) &&
        !event.target.closest(
          "#searchToggle"
        )
      ) {

        results?.classList.remove(
          "show"
        );

      }

    }
  );

}


// ============================================================
// SEARCH ENGINE
// ============================================================

function performSearch(query) {

  const data =
    getWBData();

  const results =
    document.getElementById(
      "searchResults"
    );

  if (!results)
    return;


  const q =
    String(query || "")
      .trim()
      .toLowerCase();


  if (!q) {

    results.classList.remove(
      "show"
    );

    results.innerHTML = "";

    return;

  }


  // ----------------------------------------------------------
  // DESTINATIONS
  // ----------------------------------------------------------

  const destinationMatches =
    data.destinations
      .filter(
        d => {

          const categoryText =
            Array.isArray(
              d.category
            )
              ? d.category.join(" ")
              : "";

          const highlightsText =
            Array.isArray(
              d.highlights
            )
              ? d.highlights.join(" ")
              : "";

          return (

            String(
              d.name || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              d.nameBn || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              d.shortDesc || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              d.description || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              d.region || ""
            )
              .toLowerCase()
              .includes(q) ||

            categoryText
              .toLowerCase()
              .includes(q) ||

            highlightsText
              .toLowerCase()
              .includes(q)

          );

        }
      )
      .map(
        d => ({
          ...d,
          type: "destination"
        })
      );


  // ----------------------------------------------------------
  // FOOD
  // ----------------------------------------------------------

  const foodMatches =
    data.foods
      .filter(
        f => {

          return (

            String(
              f.name || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              f.nameBn || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              f.description || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              f.region || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              f.mustTry || ""
            )
              .toLowerCase()
              .includes(q)

          );

        }
      )
      .map(
        f => ({
          ...f,
          type: "food"
        })
      );


  // ----------------------------------------------------------
  // CULTURE
  // ----------------------------------------------------------

  const cultureMatches =
    data.cultures
      .filter(
        c => {

          return (

            String(
              c.name || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              c.nameBn || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              c.type || ""
            )
              .toLowerCase()
              .includes(q) ||

            String(
              c.description || ""
            )
              .toLowerCase()
              .includes(q)

          );

        }
      )
      .map(
        c => ({
          ...c,
          type: "culture"
        })
      );


  const matches = [
    ...destinationMatches,
    ...foodMatches,
    ...cultureMatches
  ].slice(
    0,
    10
  );


  // ----------------------------------------------------------
  // EMPTY RESULT
  // ----------------------------------------------------------

  if (!matches.length) {

    results.innerHTML = `

      <div class="search-item">

        <div class="info">

          <h4>
            কিছু পাওয়া যায়নি 🔎
          </h4>

          <span>
            অন্য কোনো নাম লিখে দেখুন
          </span>

        </div>

      </div>

    `;

    results.classList.add(
      "show"
    );

    return;

  }


  // ----------------------------------------------------------
  // RESULT HTML
  // ----------------------------------------------------------

  results.innerHTML =
    matches
      .map(
        item => {

          const typeLabel =
            item.type ===
            "destination"
              ? "গন্তব্য"
              : item.type === "food"
                ? "খাবার"
                : "সংস্কৃতি";


          const title =
            item.type ===
            "destination"
              ? item.name
              : item.type === "food"
                ? item.name
                : item.name;


          const subtitle =
            item.type ===
            "destination"
              ? item.shortDesc
              : item.type === "food"
                ? item.region ||
                  item.description ||
                  ""
                : item.type ||
                  item.description ||
                  "";


          return `

            <div
              class="search-item"
              data-id="${escapeHTML(
                item.id
              )}"
              data-type="${escapeHTML(
                item.type
              )}"
              role="button"
              tabindex="0"
            >

              <img
                src="${safeImageURL(
                  item.image
                )}"
                alt="${escapeHTML(
                  title
                )}"
                loading="lazy"
                onerror="handleImageError?.(this)"
              >

              <div class="info">

                <h4>

                  ${highlightMatch(
                    title,
                    q
                  )}

                  <small>
                    ${escapeHTML(
                      item.nameBn ||
                      ""
                    )}
                  </small>

                </h4>

                <span>
                  ${escapeHTML(
                    subtitle
                  )}
                </span>

              </div>

              <span class="search-type">
                ${typeLabel}
              </span>

            </div>

          `;

        }
      )
      .join("");


  results.classList.add(
    "show"
  );


  // ----------------------------------------------------------
  // CLICK + KEYBOARD
  // ----------------------------------------------------------

  results
    .querySelectorAll(
      ".search-item"
    )
    .forEach(
      item => {

        item.addEventListener(
          "click",
          () => {

            handleSearchResult(
              item.dataset.id,
              item.dataset.type
            );

          }
        );


        item.addEventListener(
          "keydown",
          event => {

            if (
              event.key ===
                "Enter" ||
              event.key ===
                " "
            ) {

              event.preventDefault();

              handleSearchResult(
                item.dataset.id,
                item.dataset.type
              );

            }

          }
        );

      }
    );

}


// ============================================================
// HANDLE SEARCH RESULT
// ============================================================

function handleSearchResult(
  id,
  type
) {

  const results =
    document.getElementById(
      "searchResults"
    );

  results?.classList.remove(
    "show"
  );


  const input =
    document.getElementById(
      "globalSearch"
    );

  if (input) {

    input.value = "";

  }


  document
    .querySelector(
      ".search-box"
    )
    ?.classList.remove(
      "active"
    );


  if (
    type ===
    "destination"
  ) {

    openDestinationModal(
      id
    );

    return;

  }


  if (
    type === "food"
  ) {

    document
      .getElementById(
        "food"
      )
      ?.scrollIntoView({
        behavior: "smooth"
      });

    return;

  }


  if (
    type ===
    "culture"
  ) {

    document
      .getElementById(
        "culture"
      )
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }

}


// ============================================================
// HIGHLIGHT SEARCH
// ============================================================

function highlightMatch(
  text,
  q
) {

  const safeText =
    escapeHTML(
      text
    );

  if (!q)
    return safeText;


  const escapedQ =
    String(q)
      .replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );


  try {

    const regex =
      new RegExp(
        `(${escapedQ})`,
        "gi"
      );


    return safeText.replace(
      regex,
      "<mark>$1</mark>"
    );

  }

  catch {

    return safeText;

  }

}


// ============================================================
// FILTERS
// ============================================================

function initFilters() {

  const data =
    getWBData();

  const bar =
    document.getElementById(
      "filterBar"
    );


  if (!bar)
    return;


  // ----------------------------------------------------------
  // CATEGORY BUTTONS
  // ----------------------------------------------------------

  if (
    data.categories.length
  ) {

    bar.innerHTML =
      data.categories
        .map(
          category => `

            <button
              type="button"
              class="filter-btn ${
                category.id ===
                "all"
                  ? "active"
                  : ""
              }"
              data-filter="${escapeHTML(
                category.id
              )}"
            >

              ${category.icon || "🌍"}

              ${escapeHTML(
                category.name
              )}

            </button>

          `
        )
        .join("");

  }


  // ----------------------------------------------------------
  // EXTRA FILTERS
  // ----------------------------------------------------------

  let extra =
    document.querySelector(
      ".filter-extra"
    );


  if (!extra) {

    extra =
      document.createElement(
        "div"
      );

    extra.className =
      "filter-extra";

    bar.after(
      extra
    );

  }


  const uniqueRegions =
    [
      ...new Set(
        data.destinations
          .map(
            d =>
              d.region
          )
          .filter(Boolean)
      )
    ];


  extra.innerHTML = `

    <select
      id="regionFilter"
      class="filter-select"
    >

      <option value="all">
        সব অঞ্চল
      </option>

      ${uniqueRegions
        .map(
          region => `

            <option
              value="${escapeHTML(
                region
              )}"
            >
              ${escapeHTML(
                region
              )}
            </option>

          `
        )
        .join("")}

    </select>


    <select
      id="sortFilter"
      class="filter-select"
    >

      <option value="rating">
        রেটিং অনুসারে
      </option>

      <option value="budget-low">
        বাজেট: কম → বেশি
      </option>

      <option value="budget-high">
        বাজেট: বেশি → কম
      </option>

      <option value="name">
        নাম অনুসারে
      </option>

    </select>

  `;


  // ----------------------------------------------------------
  // CATEGORY EVENTS
  // ----------------------------------------------------------

  bar
    .querySelectorAll(
      ".filter-btn"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            bar
              .querySelectorAll(
                ".filter-btn"
              )
              .forEach(
                btn =>
                  btn.classList.remove(
                    "active"
                  )
              );


            button.classList.add(
              "active"
            );


            currentFilter =
              button.dataset.filter ||
              "all";


            renderDestinations();

          }
        );

      }
    );


  // ----------------------------------------------------------
  // REGION
  // ----------------------------------------------------------

  document
    .getElementById(
      "regionFilter"
    )
    ?.addEventListener(
      "change",
      event => {

        currentRegion =
          event.target.value ||
          "all";

        renderDestinations();

      }
    );


  // ----------------------------------------------------------
  // SORT
  // ----------------------------------------------------------

  document
    .getElementById(
      "sortFilter"
    )
    ?.addEventListener(
      "change",
      event => {

        currentSort =
          event.target.value ||
          "rating";

        renderDestinations();

      }
    );

}


// ============================================================
// FOOD FILTER INIT
// Optional
// ============================================================

function initFoodFilters() {

  const data =
    getWBData();

  const container =
    document.getElementById(
      "foodFilterBar"
    );


  if (!container)
    return;


  if (
    !data.foodCategories.length
  )
    return;


  container.innerHTML =
    data.foodCategories
      .map(
        category => `

          <button
            type="button"
            class="food-filter-btn ${
              category.id ===
              "all"
                ? "active"
                : ""
            }"
            data-food-filter="${escapeHTML(
              category.id
            )}"
          >

            ${
              category.icon ||
              "🍽️"
            }

            ${escapeHTML(
              category.name
            )}

          </button>

        `
      )
      .join("");


  container
    .querySelectorAll(
      ".food-filter-btn"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            container
              .querySelectorAll(
                ".food-filter-btn"
              )
              .forEach(
                btn =>
                  btn.classList.remove(
                    "active"
                  )
              );


            button.classList.add(
              "active"
            );


            currentFoodFilter =
              button.dataset
                .foodFilter ||
              "all";


            renderFoods();

          }
        );

      }
    );

}


// ============================================================
// DESTINATIONS
// ============================================================

function renderDestinations() {

  const data =
    getWBData();

  const grid =
    document.getElementById(
      "destinationsGrid"
    );


  if (!grid)
    return;


  let list =
    data.destinations
      .filter(
        destination => {

          const categoryArray =
            Array.isArray(
              destination.category
            )
              ? destination.category
              : [];


          const categoryOK =
            currentFilter ===
              "all" ||
            categoryArray.includes(
              currentFilter
            );


          const regionOK =
            currentRegion ===
              "all" ||
            destination.region ===
              currentRegion;


          return (
            categoryOK &&
            regionOK
          );

        }
      );


  // ----------------------------------------------------------
  // SORT
  // ----------------------------------------------------------

  list =
    [...list].sort(
      (
        a,
        b
      ) => {

        if (
          currentSort ===
          "rating"
        ) {

          return (
            Number(
              b.rating || 0
            ) -
            Number(
              a.rating || 0
            )
          );

        }


        if (
          currentSort ===
          "name"
        ) {

          return String(
            a.name || ""
          ).localeCompare(
            String(
              b.name || ""
            ),
            "bn"
          );

        }


        if (
          currentSort ===
          "budget-low"
        ) {

          return (
            extractBudget(
              a.budget
            ) -
            extractBudget(
              b.budget
            )
          );

        }


        if (
          currentSort ===
          "budget-high"
        ) {

          return (
            extractBudget(
              b.budget
            ) -
            extractBudget(
              a.budget
            )
          );

        }


        return 0;

      }
    );


  // ----------------------------------------------------------
  // EMPTY
  // ----------------------------------------------------------

  if (!list.length) {

    grid.innerHTML = `

      <div class="favorites-empty">

        <div class="icon">
          🔍
        </div>

        <h3>
          কোনো গন্তব্য পাওয়া যায়নি
        </h3>

        <p>
          বর্তমান filter পরিবর্তন করে আবার দেখুন।
        </p>

        <button
          type="button"
          class="btn btn-primary"
          onclick="resetFilters()"
        >
          সব গন্তব্য দেখুন
        </button>

      </div>

    `;

    return;

  }


  const favorites =
    getFavorites();


  const month =
    new Date().getMonth();


  grid.innerHTML =
    list
      .map(
        destination => {

          const isFavorite =
            favorites.includes(
              destination.id
            );


          const bestNow =
            isBestTimeNow(
              destination.bestTime,
              month
            );


          return `

            <article
              class="card destination-card"
              data-id="${escapeHTML(
                destination.id
              )}"
            >

              <div class="card-img">

                <img
                  src="${safeImageURL(
                    destination.image
                  )}"
                  alt="${escapeHTML(
                    destination.imageAlt ||
                    destination.name
                  )}"
                  loading="lazy"
                  onerror="handleImageError?.(this)"
                >


                <span class="card-badge">
                  ${escapeHTML(
                    destination.region ||
                    "বাংলাদেশ"
                  )}
                </span>


                ${
                  bestNow
                    ? `
                      <span class="season-badge">
                        🌟 এখনই সেরা সময়
                      </span>
                    `
                    : ""
                }


                <button
                  type="button"
                  class="fav-btn ${
                    isFavorite
                      ? "active"
                      : ""
                  }"
                  data-id="${escapeHTML(
                    destination.id
                  )}"
                  aria-label="ফেভারিট"
                >

                  ${
                    isFavorite
                      ? "❤️"
                      : "🤍"
                  }

                </button>

              </div>


              <div class="card-body">

                <h3>

                  ${escapeHTML(
                    destination.name ||
                    ""
                  )}

                  <small>

                    ${escapeHTML(
                      destination.nameBn ||
                      ""
                    )}

                  </small>

                </h3>


                <div class="card-meta">

                  <span class="rating">

                    ★
                    ${Number(
                      destination.rating ||
                      0
                    ).toFixed(
                      1
                    )}

                  </span>


                  <span>

                    ${Number(
                      destination.reviewsCount ||
                      0
                    ).toLocaleString(
                      "bn-BD"
                    )}
                    রিভিউ

                  </span>


                  <span>

                    ⏱️
                    ${escapeHTML(
                      destination.duration ||
                      ""
                    )}

                  </span>

                </div>


                <p>

                  ${escapeHTML(
                    destination.shortDesc ||
                    ""
                  )}

                </p>


                <div class="card-footer">

                  <span class="price">

                    ${escapeHTML(
                      destination.budget ||
                      "৳ আনুমানিক"
                    )}

                  </span>


                  <button
                    type="button"
                    class="explore-btn"
                    data-id="${escapeHTML(
                      destination.id
                    )}"
                  >
                    বিস্তারিত →
                  </button>

                </div>

              </div>

            </article>

          `;

        }
      )
      .join("");


  // ----------------------------------------------------------
  // EVENTS
  // ----------------------------------------------------------

  grid.onclick =
    event => {

      const favoriteButton =
        event.target.closest(
          ".fav-btn"
        );


      if (favoriteButton) {

        event.stopPropagation();

        toggleFavorite(
          favoriteButton.dataset.id
        );

        return;

      }


      const exploreButton =
        event.target.closest(
          ".explore-btn"
        );


      if (
        exploreButton
      ) {

        event.stopPropagation();

        openDestinationModal(
          exploreButton.dataset.id
        );

        return;

      }


      const card =
        event.target.closest(
          ".card"
        );


      if (
        card &&
        card.dataset.id
      ) {

        openDestinationModal(
          card.dataset.id
        );

      }

    };


  observeNewElements(
    grid.querySelectorAll(
      ".card"
    )
  );

}


// ============================================================
// EXTRACT BUDGET
// ============================================================

function extractBudget(
  value
) {

  if (!value)
    return 999999;


  const normalized =
    convertBanglaDigitsToEnglish(
      value
    )
      .replace(
        /,/g,
        ""
      );


  const numbers =
    normalized.match(
      /\d+(?:\.\d+)?/g
    );


  if (
    !numbers ||
    !numbers.length
  ) {

    return 999999;

  }


  const first =
    Number(
      numbers[0]
    );


  return Number.isFinite(
    first
  )
    ? first
    : 999999;

}
// ============================================================
// EXTRACT BUDGET
// ============================================================

function extractBudget(
  value
) {

  if (!value)
    return 999999;


  const normalized =
    convertBanglaDigitsToEnglish(
      value
    )
      .replace(
        /,/g,
        ""
      );


  const numbers =
    normalized.match(
      /\d+(?:\.\d+)?/g
    );


  if (
    !numbers ||
    !numbers.length
  ) {

    return 999999;

  }


  const first =
    Number(
      numbers[0]
    );


  return Number.isFinite(
    first
  )
    ? first
    : 999999;

}


// ============================================================
// BEST TIME
// ============================================================

function isBestTimeNow(
  bestTime,
  month
) {

  if (!bestTime)
    return false;


  const text =
    String(
      bestTime
    ).toLowerCase();


  const monthMap = {

    "জানুয়ারি": 0,

    "ফেব্রুয়ারি": 1,

    "মার্চ": 2,

    "এপ্রিল": 3,

    "মে": 4,

    "জুন": 5,

    "জুলাই": 6,

    "আগস্ট": 7,

    "সেপ্টেম্বর": 8,

    "অক্টোবর": 9,

    "নভেম্বর": 10,

    "ডিসেম্বর": 11

  };


  // Exact month detection.
  for (
    const monthName
    in monthMap
  ) {

    if (
      text.includes(
        monthName
      )
    ) {

      const monthIndex =
        monthMap[
          monthName
        ];


      // Approximation.
      // If a range is present, broaden the season.
      const foundMonths =
        Object.keys(
          monthMap
        )
          .filter(
            name =>
              text.includes(
                name
              )
          )
          .map(
            name =>
              monthMap[
                name
              ]
          );


      if (
        foundMonths.includes(
          month
        )
      ) {

        return true;

      }


      // Handle wrapping seasons such as
      // November – March.
      if (
        foundMonths.length >= 2
      ) {

        const start =
          foundMonths[0];

        const end =
          foundMonths[
            foundMonths.length - 1
          ];


        if (
          start <= end &&
          month >= start &&
          month <= end
        ) {

          return true;

        }


        if (
          start > end &&
          (
            month >= start ||
            month <= end
          )
        ) {

          return true;

        }

      }

    }

  }


  // English fallback
  const englishMonths = {

    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11

  };


  const englishMatches =
    Object.keys(
      englishMonths
    )
      .filter(
        name =>
          text.includes(
            name
          )
      )
      .map(
        name =>
          englishMonths[
            name
          ]
      );


  return englishMatches.includes(
    month
  );

}


// ============================================================
// RESET FILTERS
// ============================================================

function resetFilters() {

  currentFilter =
    "all";

  currentRegion =
    "all";

  currentSort =
    "rating";


  document
    .querySelectorAll(
      ".filter-btn"
    )
    .forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.filter ===
            "all"
        );

      }
    );


  const regionSelect =
    document.getElementById(
      "regionFilter"
    );

  const sortSelect =
    document.getElementById(
      "sortFilter"
    );


  if (regionSelect) {

    regionSelect.value =
      "all";

  }


  if (sortSelect) {

    sortSelect.value =
      "rating";

  }


  renderDestinations();

}


// ============================================================
// FOODS
// ============================================================

function renderFoods() {

  const data =
    getWBData();

  const grid =
    document.getElementById(
      "foodsGrid"
    );


  if (!grid)
    return;


  let foodList =
    data.foods;


  if (
    currentFoodFilter !==
    "all"
  ) {

    foodList =
      foodList.filter(
        food =>
          food.category ===
          currentFoodFilter
      );

  }


  if (!foodList.length) {

    grid.innerHTML = `

      <div class="favorites-empty">

        <div class="icon">
          🍽️
        </div>

        <h3>
          কোনো খাবার পাওয়া যায়নি
        </h3>

      </div>

    `;

    return;

  }


  grid.innerHTML =
    foodList
      .map(
        food => {

          const categoryName =
            getFoodCategoryName(
              food.category
            );


          return `

            <article
              class="card food-card"
              data-food-id="${escapeHTML(
                food.id
              )}"
            >

              <div class="card-img">

                <img
                  src="${safeImageURL(
                    food.image
                  )}"
                  alt="${escapeHTML(
                    food.imageAlt ||
                    food.name
                  )}"
                  loading="lazy"
                  onerror="handleImageError?.(this)"
                >


                <span class="card-badge">

                  ${escapeHTML(
                    categoryName
                  )}

                </span>

              </div>


              <div class="card-body">

                <h3>

                  ${escapeHTML(
                    food.name ||
                    ""
                  )}

                  <small>

                    ${escapeHTML(
                      food.nameBn ||
                      ""
                    )}

                  </small>

                </h3>


                <div class="card-meta">

                  <span class="rating">

                    ★
                    ${Number(
                      food.rating ||
                      0
                    ).toFixed(
                      1
                    )}

                  </span>


                  <span>

                    ${escapeHTML(
                      food.priceRange ||
                      ""
                    )}

                  </span>

                </div>


                <p>

                  ${escapeHTML(
                    food.description ||
                    ""
                  )}

                </p>


                ${
                  food.mustTry
                    ? `
                      <p class="must-try">

                        <strong>
                          ⭐ অবশ্যই ট্রাই করুন:
                        </strong>

                        ${escapeHTML(
                          food.mustTry
                        )}

                      </p>
                    `
                    : ""
                }

              </div>

            </article>

          `;

        }
      )
      .join("");


  observeNewElements(
    grid.querySelectorAll(
      ".food-card"
    )
  );

}


// ============================================================
// FOOD CATEGORY NAME
// ============================================================

function getFoodCategoryName(
  category
) {

  const data =
    getWBData();


  const found =
    data.foodCategories.find(
      item =>
        item.id ===
        category
    );


  if (found) {

    return found.name;

  }


  const names = {

    main:
      "প্রধান খাবার",

    street:
      "স্ট্রিট ফুড",

    dessert:
      "মিষ্টি",

    traditional:
      "ঐতিহ্যবাহী"

  };


  return (
    names[category] ||
    "খাবার"
  );

}


// ============================================================
// CULTURE
// ============================================================

function renderCultures() {

  const data =
    getWBData();

  const grid =
    document.getElementById(
      "culturesGrid"
    );


  if (!grid)
    return;


  if (
    !data.cultures.length
  ) {

    grid.innerHTML = `

      <div class="favorites-empty">

        <div class="icon">
          🎭
        </div>

        <h3>
          সংস্কৃতির তথ্য পাওয়া যায়নি
        </h3>

      </div>

    `;

    return;

  }


  grid.innerHTML =
    data.cultures
      .map(
        culture => `

          <article
            class="culture-card"
            data-culture-id="${escapeHTML(
              culture.id
            )}"
          >

            <img
              src="${safeImageURL(
                culture.image
              )}"
              alt="${escapeHTML(
                culture.imageAlt ||
                culture.name
              )}"
              loading="lazy"
              onerror="handleImageError?.(this)"
            >


            <div class="body">

              <span class="type">

                ${escapeHTML(
                  culture.type ||
                  "সংস্কৃতি"
                )}

              </span>


              <h3>

                ${escapeHTML(
                  culture.name ||
                  ""
                )}

              </h3>


              <p>

                ${escapeHTML(
                  culture.description ||
                  ""
                )}

              </p>

            </div>

          </article>

        `
      )
      .join("");


  observeNewElements(
    grid.querySelectorAll(
      ".culture-card"
    )
  );

}


// ============================================================
// TRAVEL TIPS
// ============================================================

function renderTravelTips() {

  const data =
    getWBData();

  const grid =
    document.getElementById(
      "tipsGrid"
    );


  if (!grid)
    return;


  grid.innerHTML =
    data.travelTips
      .map(
        tip => `

          <div class="why-card">

            <div class="icon">

              ${tip.icon || "💡"}

            </div>


            <h3>

              ${escapeHTML(
                tip.title ||
                "ভ্রমণ টিপস"
              )}

            </h3>


            <ul>

              ${
                Array.isArray(
                  tip.points
                )
                  ? tip.points
                      .map(
                        point =>
                          `<li>
                            ${escapeHTML(
                              point
                            )}
                          </li>`
                      )
                      .join("")
                  : ""
              }

            </ul>

          </div>

        `
      )
      .join("");


  observeNewElements(
    grid.querySelectorAll(
      ".why-card"
    )
  );

}


// ============================================================
// FAVORITES
// ============================================================

function getFavorites() {

  try {

    const raw =
      safeStorageGet(
        "wb-favorites",
        "[]"
      );


    const parsed =
      JSON.parse(
        raw
      );


    if (
      !Array.isArray(
        parsed
      )
    ) {

      return [];

    }


    return [
      ...new Set(
        parsed
          .filter(
            id =>
              typeof id ===
              "string"
          )
      )
    ];

  }

  catch {

    return [];

  }

}


// ============================================================
// SAVE FAVORITES
// ============================================================

function saveFavorites(
  favorites
) {

  safeStorageSet(
    "wb-favorites",
    JSON.stringify(
      favorites
    )
  );

  updateFavCount();

}


// ============================================================
// TOGGLE FAVORITE
// ============================================================

function toggleFavorite(
  id
) {

  if (!id)
    return;


  const data =
    getWBData();


  const exists =
    data.destinations.some(
      destination =>
        destination.id ===
        id
    );


  if (!exists) {

    showToast(
      "গন্তব্য পাওয়া যায়নি।"
    );

    return;

  }


  let favorites =
    getFavorites();


  if (
    favorites.includes(
      id
    )
  ) {

    favorites =
      favorites.filter(
        favoriteId =>
          favoriteId !==
          id
      );


    showToast(
      "🤍 ফেভারিট থেকে সরানো হয়েছে"
    );

  }

  else {

    favorites.push(
      id
    );


    showToast(
      "❤️ ফেভারিটে যোগ হয়েছে"
    );

  }


  saveFavorites(
    favorites
  );

  renderDestinations();

  renderFavoritesSection();

  refreshModalFavoriteButton(
    id
  );

}


// ============================================================
// FAVORITE COUNT
// ============================================================

function updateFavCount() {

  const count =
    getFavorites()
      .length;


  const badge =
    document.getElementById(
      "favCount"
    );


  if (!badge)
    return;


  badge.textContent =
    String(count);


  badge.style.display =
    count > 0
      ? "inline-flex"
      : "none";

}


// ============================================================
// INIT FAVORITES
// ============================================================

function initFavorites() {

  renderFavoritesSection();


  document
    .getElementById(
      "favNavBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        document
          .getElementById(
            "favorites"
          )
          ?.scrollIntoView({
            behavior:
              "smooth"
          });

      }
    );

}


// ============================================================
// RENDER FAVORITES
// ============================================================

function renderFavoritesSection() {

  const data =
    getWBData();

  const container =
    document.getElementById(
      "favoritesGrid"
    );


  if (!container)
    return;


  const favorites =
    getFavorites();


  const items =
    data.destinations.filter(
      destination =>
        favorites.includes(
          destination.id
        )
    );


  if (!items.length) {

    container.innerHTML = `

      <div class="favorites-empty">

        <div class="icon">
          🤍
        </div>

        <h3>
          এখনো কোনো ফেভারিট নেই
        </h3>

        <p>
          যেকোনো জায়গার হার্ট আইকনে ক্লিক করুন।
          ব্রাউজার বন্ধ করলেও সেভ থাকবে।
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =
    items
      .map(
        destination => `

          <article
            class="card"
            data-id="${escapeHTML(
              destination.id
            )}"
          >

            <div class="card-img">

              <img
                src="${safeImageURL(
                  destination.image
                )}"
                alt="${escapeHTML(
                  destination.imageAlt ||
                  destination.name
                )}"
                loading="lazy"
                onerror="handleImageError?.(this)"
              >


              <button
                type="button"
                class="fav-btn active"
                data-id="${escapeHTML(
                  destination.id
                )}"
              >
                ❤️
              </button>

            </div>


            <div class="card-body">

              <h3>

                ${escapeHTML(
                  destination.name ||
                  ""
                )}

                <small>

                  ${escapeHTML(
                    destination.nameBn ||
                    ""
                  )}

                </small>

              </h3>


              <p>

                ${escapeHTML(
                  destination.shortDesc ||
                  ""
                )}

              </p>


              <div class="card-footer">

                <span class="price">

                  ${escapeHTML(
                    destination.budget ||
                    ""
                  )}

                </span>


                <button
                  type="button"
                  class="explore-btn"
                  data-id="${escapeHTML(
                    destination.id
                  )}"
                >
                  বিস্তারিত →
                </button>

              </div>

            </div>

          </article>

        `
      )
      .join("");


  container.onclick =
    event => {

      const favoriteButton =
        event.target.closest(
          ".fav-btn"
        );


      if (
        favoriteButton
      ) {

        event.stopPropagation();

        toggleFavorite(
          favoriteButton.dataset.id
        );

        return;

      }


      const exploreButton =
        event.target.closest(
          ".explore-btn"
        );


      if (
        exploreButton
      ) {

        event.stopPropagation();

        openDestinationModal(
          exploreButton.dataset.id
        );

        return;

      }


      const card =
        event.target.closest(
          "[data-id]"
        );


      if (
        card?.dataset.id
      ) {

        openDestinationModal(
          card.dataset.id
        );

      }

    };


  observeNewElements(
    container.querySelectorAll(
      ".card"
    )
  );

}


// ============================================================
// INIT TRIP PLANNER
// ============================================================

function initTripPlanner() {

  const data =
    getWBData();

  const destinationSelect =
    document.getElementById(
      "tripDestination"
    );


  if (destinationSelect) {

    destinationSelect.innerHTML =

      '<option value="">গন্তব্য বেছে নিন</option>' +

      data.destinations
        .map(
          destination =>
            `

              <option
                value="${escapeHTML(
                  destination.id
                )}"
              >

                ${escapeHTML(
                  destination.name
                )}

                ${
                  destination.nameBn
                    ? `(${escapeHTML(
                        destination.nameBn
                      )})`
                    : ""
                }

              </option>

            `
        )
        .join("");

  }


  document
    .getElementById(
      "generateTrip"
    )
    ?.addEventListener(
      "click",
      generateTrip
    );

}


// ============================================================
// BANGLA DIGITS
// ============================================================

function convertBanglaDigitsToEnglish(
  value
) {

  const bangla =
    "০১২৩৪৫৬৭৮৯";

  const english =
    "0123456789";


  return String(
    value ?? ""
  )
    .split("")
    .map(
      character => {

        const index =
          bangla.indexOf(
            character
          );


        return index >= 0
          ? english[index]
          : character;

      }
    )
    .join("");

}


// ============================================================
// BUDGET RANGE PARSER
// ============================================================

function parseBudgetRangeMain(
  value
) {

  if (!value) {

    return {
      min: 0,
      max: 0
    };

  }


  const normalized =
    convertBanglaDigitsToEnglish(
      value
    )
      .replace(
        /৳/g,
        ""
      )
      .replace(
        /,/g,
        ""
      )
      .replace(
        /–/g,
        "-"
      )
      .replace(
        /—/g,
        "-"
      )
      .replace(
        /−/g,
        "-"
      );


  const matches =
    normalized.match(
      /\d+(?:\.\d+)?/g
    );


  if (
    !matches ||
    matches.length === 0
  ) {

    return {
      min: 0,
      max: 0
    };

  }


  const numbers =
    matches
      .map(
        number =>
          Number(
            number
          )
      )
      .filter(
        number =>
          Number.isFinite(
            number
          )
      );


  if (!numbers.length) {

    return {
      min: 0,
      max: 0
    };

  }


  if (
    numbers.length === 1
  ) {

    return {
      min:
        numbers[0],
      max:
        numbers[0]
    };

  }


  return {
    min:
      Math.min(
        numbers[0],
        numbers[1]
      ),

    max:
      Math.max(
        numbers[0],
        numbers[1]
      )

  };

}


// ============================================================
// SMART TRIP BUDGET
// ============================================================

function getTripBudget(
  destination,
  days,
  people,
  style
) {

  if (!destination) {

    return {
      min: 0,
      max: 0
    };

  }


  // ----------------------------------------------------------
  // First ask tools.js
  // ----------------------------------------------------------

  if (
    window.WanderBanglaTools &&
    typeof
      window.WanderBanglaTools
        .calculateSmartBudget ===
      "function"
  ) {

    try {

      const result =
        window.WanderBanglaTools
          .calculateSmartBudget(
            destination.id,
            days,
            people,
            style
          );


      if (
        result &&
        Number(result.min) > 0 &&
        Number(result.max) > 0
      ) {

        return {

          min:
            Number(
              result.min
            ),

          max:
            Number(
              result.max
            ),

          source:
            "tools"

        };

      }

    }

    catch (error) {

      console.warn(
        "Smart budget tool failed:",
        error
      );

    }

  }


  // ----------------------------------------------------------
  // FALLBACK
  // ----------------------------------------------------------

  const breakdown =
    destination
      .budgetBreakdown || {};


  const transport =
    parseBudgetRangeMain(
      breakdown.transport
    );


  const stay =
    parseBudgetRangeMain(
      breakdown.stay
    );


  const food =
    parseBudgetRangeMain(
      breakdown.food
    );


  const local =
    parseBudgetRangeMain(
      breakdown.local
    );


  const numberOfPeople =
    Math.max(
      1,
      Number(
        people
      ) || 1
    );


  const numberOfDays =
    Math.max(
      1,
      Number(
        days
      ) || 1
    );


  const nights =
    Math.max(
      1,
      numberOfDays - 1
    );


  let minCost = 0;
  let maxCost = 0;


  // ----------------------------------------------------------
  // Transport
  // ----------------------------------------------------------

  const sharedTransportFactor =
    numberOfPeople > 1
      ? 1 +
        (
          numberOfPeople - 1
        ) *
        0.35
      : 1;


  const sharedLocalFactor =
    numberOfPeople > 1
      ? 1 +
        (
          numberOfPeople - 1
        ) *
        0.40
      : 1;


  const transportMin =
    transport.min *
    sharedTransportFactor;


  const transportMax =
    transport.max *
    sharedTransportFactor;


  // ----------------------------------------------------------
  // Stay
  // ----------------------------------------------------------

  const stayMin =
    stay.min *
    nights *
    numberOfPeople;


  const stayMax =
    stay.max *
    nights *
    numberOfPeople;


  // ----------------------------------------------------------
  // Food
  // ----------------------------------------------------------

  const foodMin =
    food.min *
    numberOfDays *
    numberOfPeople;


  const foodMax =
    food.max *
    numberOfDays *
    numberOfPeople;


  // ----------------------------------------------------------
  // Local
  // ----------------------------------------------------------

  const localMin =
    local.min *
    sharedLocalFactor;


  const localMax =
    local.max *
    sharedLocalFactor;


  minCost =
    transportMin +
    stayMin +
    foodMin +
    localMin;


  maxCost =
    transportMax +
    stayMax +
    foodMax +
    localMax;


  // ----------------------------------------------------------
  // Destination package fallback
  // ----------------------------------------------------------

  if (
    minCost <= 0 ||
    !Number.isFinite(
      minCost
    )
  ) {

    const base =
      extractBudget(
        destination.budget
      );


    if (
      base &&
      base < 999999
    ) {

      minCost =
        base *
        numberOfPeople;

      maxCost =
        base *
        numberOfPeople *
        1.35;

    }

  }


  // ----------------------------------------------------------
  // Style factor
  // ----------------------------------------------------------

  const styleMultiplier = {

    low:
      0.75,

    medium:
      1,

    high:
      1.45

  };


  const multiplier =
    styleMultiplier[
      style
    ] || 1;


  minCost *=
    multiplier;


  maxCost *=
    multiplier;


  // ----------------------------------------------------------
  // Final fallback
  // ----------------------------------------------------------

  if (
    !Number.isFinite(
      minCost
    ) ||
    minCost <= 0
  ) {

    minCost =
      5000;

  }


  if (
    !Number.isFinite(
      maxCost
    ) ||
    maxCost <= 0
  ) {

    maxCost =
      minCost *
      1.3;

  }


  minCost =
    Math.round(
      minCost / 100
    ) * 100;


  maxCost =
    Math.round(
      maxCost / 100
    ) * 100;


  if (
    maxCost <=
    minCost
  ) {

    maxCost =
      minCost +
      1000;

  }


  return {

    min:
      minCost,

    max:
      maxCost,

    dest:
      destination.name,

    destBn:
      destination.nameBn,

    days:
      numberOfDays,

    people:
      numberOfPeople,

    style,

    source:
      "fallback"

  };

}


// ============================================================
// GENERATE TRIP
// ============================================================

function generateTrip() {

  const data =
    getWBData();


  const destinationId =
    document.getElementById(
      "tripDestination"
    )?.value;


  const days =
    Math.max(
      1,
      parseInt(
        document.getElementById(
          "tripDays"
        )?.value ||
          "2",
        10
      )
    );


  const people =
    Math.max(
      1,
      parseInt(
        document.getElementById(
          "tripPeople"
        )?.value ||
          "2",
        10
      )
    );


  const style =
    document.getElementById(
      "tripBudget"
    )?.value ||
    "medium";


  if (!destinationId) {

    showToast(
      "📍 আগে একটি গন্তব্য বেছে নিন!"
    );

    return;

  }


  const destination =
    data.destinations.find(
      item =>
        item.id ===
        destinationId
    );


  if (!destination) {

    showToast(
      "❌ গন্তব্যের তথ্য পাওয়া যায়নি!"
    );

    return;

  }


  // ----------------------------------------------------------
  // Trip template
  // ----------------------------------------------------------

  const template =
    data.tripTemplates[
      destinationId
    ] ||
    data.tripTemplates.default;


  let plan =
    template?.[days] ||
    template?.[3] ||
    template?.[2];


  // ----------------------------------------------------------
  // Dynamic fallback plan
  // ----------------------------------------------------------

  if (
    !Array.isArray(plan) ||
    plan.length === 0
  ) {

    plan =
      createDynamicTripPlan(
        destination,
        days
      );

  }


  // If requested days differs from template.
  // Fill missing days dynamically.
  if (
    plan.length <
    days
  ) {

    const extraDays =
      createDynamicTripPlan(
        destination,
        days
      );


    plan =
      mergeTripPlans(
        plan,
        extraDays,
        days
      );

  }


  // ----------------------------------------------------------
  // Budget
  // ----------------------------------------------------------

  const budgetResult =
    getTripBudget(
      destination,
      days,
      people,
      style
    );


  const estimatedMin =
    Math.max(
      0,
      Number(
        budgetResult?.min
      ) || 0
    );


  const estimatedMax =
    Math.max(
      estimatedMin +
        1000,
      Number(
        budgetResult?.max
      ) || 0
    );


  const budgetLabel = {

    low:
      "সাশ্রয়ী",

    medium:
      "মাঝারি",

    high:
      "প্রিমিয়াম"

  };


  const resultBox =
    document.getElementById(
      "tripResult"
    );


  if (!resultBox) {

    showToast(
      "⚠️ Trip Result box পাওয়া যায়নি!"
    );

    return;

  }


  resultBox.innerHTML = `

    <div class="trip-header">

      <h3>

        🧳
        ${days}
        দিনের
        ${escapeHTML(
          destination.name
        )}
        ট্রিপ প্ল্যান

      </h3>

      <p>

        ${escapeHTML(
          destination.nameBn ||
          ""
        )}

      </p>

    </div>


    <div class="trip-summary">

      <span>
        👥 ${people} জন
      </span>


      <span>

        💰 আনুমানিক:

        <strong>

          ৳${Number(
            estimatedMin
          ).toLocaleString(
            "bn-BD"
          )}

          –

          ৳${Number(
            estimatedMax
          ).toLocaleString(
            "bn-BD"
          )}

        </strong>

      </span>


      <span>

        📅 সেরা সময়:

        ${escapeHTML(
          destination.bestTime ||
          "সারা বছর"
        )}

      </span>


      <span>

        🏷️

        ${
          budgetLabel[
            style
          ] ||
          "মাঝারি"
        }

        বাজেট

      </span>

    </div>


    <div class="trip-days">

      ${
        plan
          .map(
            (
              day,
              index
            ) => `

              <div
                class="day-card"
              >

                <h4>

                  দিন

                  ${
                    day.day ||
                    index + 1
                  }

                  ${
                    day.title
                      ? " — " +
                        escapeHTML(
                          day.title
                        )
                      : ""
                  }

                </h4>


                <div class="day-activities">

                  ${
                    Array.isArray(
                      day.items
                    )
                      ? day.items
                          .map(
                            activity =>
                              `

                                <div
                                  class="activity-item"
                                >

                                  <span
                                    class="activity-time"
                                  >

                                    ${escapeHTML(
                                      activity.time ||
                                      ""
                                    )}

                                  </span>


                                  <span>

                                    <strong>

                                      ${escapeHTML(
                                        activity.activity ||
                                        ""
                                      )}

                                    </strong>


                                    ${
                                      activity.place
                                        ? `
                                          <br>

                                          <small>

                                            📍
                                            ${escapeHTML(
                                              activity.place
                                            )}

                                          </small>
                                        `
                                        : ""
                                    }


                                    ${
                                      activity.note
                                        ? `
                                          <br>

                                          <small>

                                            💡
                                            ${escapeHTML(
                                              activity.note
                                            )}

                                          </small>
                                        `
                                        : ""
                                    }

                                  </span>

                                </div>

                              `
                          )
                          .join("")
                      : ""
                  }

                </div>

              </div>

            `
          )
          .join("")
      }

    </div>


    <div class="packing-box">

      <strong>
        📦 প্যাকিং লিস্ট:
      </strong>

      ${
        Array.isArray(
          destination.packing
        )
          ? destination.packing
              .map(
                item =>
                  escapeHTML(
                    item
                  )
              )
              .join(" • ")
          : "সানস্ক্রিন • আরামদায়ক জুতা • পানির বোতল • পাওয়ার ব্যাংক"
      }

    </div>


    <div class="trip-safety-box">

      <strong>
        🛡️ নিরাপত্তা:
      </strong>

      ${
        Array.isArray(
          destination.safety
        )
          ? destination.safety
              .slice(
                0,
                3
              )
              .map(
                item =>
                  escapeHTML(
                    item
                  )
              )
              .join(" • ")
          : "স্থানীয় নিরাপত্তা নির্দেশনা মেনে চলুন।"
      }

    </div>


    <div class="trip-actions">

      <button
        type="button"
        class="btn btn-secondary"
        onclick="
          saveTripPlan(
            '${escapeJS(
              destinationId
            )}',
            ${days},
            ${people},
            '${escapeJS(
              style
            )}'
          )
        "
      >

        💾 প্ল্যান সেভ করুন

      </button>


      <button
        type="button"
        class="btn btn-outline"
        onclick="window.print()"
      >

        🖨️ প্রিন্ট

      </button>


      <button
        type="button"
        class="btn btn-outline"
        onclick="
          shareTrip(
            '${escapeJS(
              destination.name
            )}',
            ${days}
          )
        "
      >

        📤 শেয়ার

      </button>

    </div>

  `;


  resultBox.classList.add(
    "show"
  );


  resultBox.scrollIntoView({
    behavior:
      "smooth",
    block:
      "nearest"
  });


  showToast(
    "✨ আপনার ট্রিপ প্ল্যান তৈরি হয়েছে!"
  );

}


// ============================================================
// CREATE DYNAMIC TRIP PLAN
// ============================================================

function createDynamicTripPlan(
  destination,
  days
) {

  const totalDays =
    Math.max(
      1,
      Number(days) || 1
    );


  const highlights =
    Array.isArray(
      destination.highlights
    )
      ? destination.highlights
      : [];


  const result = [];


  for (
    let i = 0;
    i < totalDays;
    i++
  ) {

    const first =
      highlights[
        i %
          Math.max(
            highlights.length,
            1
          )
      ] ||
      destination.name;


    const second =
      highlights[
        (
          i + 1
        ) %
          Math.max(
            highlights.length,
            1
          )
      ] ||
      "স্থানীয় এলাকা";


    result.push({

      day:
        i + 1,

      title:
        i === 0
          ? "আগমন ও শুরু"
          : i ===
              totalDays - 1 &&
            totalDays > 1
            ? "শেষ দিন ও প্রস্থান"
            : "গন্তব্য এক্সপ্লোর",

      items: [

        {
          time:
            "সকাল",

          activity:
            first +
            " ঘুরে দেখুন",

          place:
            first,

          note:
            i === 0
              ? "সকালে শুরু করলে সময় ভালোভাবে ব্যবহার করা যায়।"
              : ""

        },


        {
          time:
            "দুপুর",

          activity:
            "স্থানীয় খাবার ও বিশ্রাম",

          place:
            "Local Restaurant",

          note:
            "স্থানীয় খাবার চেষ্টা করতে পারেন।"

        },


        {
          time:
            "বিকাল",

          activity:
            second +
            " ভ্রমণ",

          place:
            second,

          note:
            "আবহাওয়া ও স্থানীয় পরিস্থিতি অনুযায়ী সময় পরিবর্তন করুন।"

        }


      ]

    });

  }


  return result;

}
// ============================================================
// MERGE TRIP PLANS
// ============================================================

function mergeTripPlans(
  existingPlan,
  fallbackPlan,
  days
) {

  const result = [];


  for (
    let i = 0;
    i < days;
    i++
  ) {

    result.push(
      existingPlan[i] ||
      fallbackPlan[i] || {
        day:
          i + 1,
        title:
          `দিন ${i + 1}`,
        items: []
      }
    );

  }


  return result;

}


// ============================================================
// JS STRING ESCAPE
// ============================================================

function escapeJS(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /\\/g,
      "\\\\"
    )
    .replace(
      /'/g,
      "\\'"
    )
    .replace(
      /"/g,
      '\\"'
    )
    .replace(
      /\n/g,
      "\\n"
    )
    .replace(
      /\r/g,
      "\\r"
    );

}


// ============================================================
// SAVE TRIP PLAN
// ============================================================

function saveTripPlan(
  destinationId,
  days,
  people,
  style = "medium"
) {

  try {

    const raw =
      safeStorageGet(
        "wb-trip-plans",
        "[]"
      );


    let plans =
      JSON.parse(
        raw
      );


    if (
      !Array.isArray(
        plans
      )
    ) {

      plans = [];

    }


    plans.unshift({

      destId:
        destinationId,

      days:
        Number(days) ||
        2,

      people:
        Number(people) ||
        1,

      style:
        style ||
        "medium",

      date:
        new Date()
          .toISOString()

    });


    safeStorageSet(
      "wb-trip-plans",
      JSON.stringify(
        plans.slice(
          0,
          20
        )
      )
    );


    showToast(
      "💾 ট্রিপ প্ল্যান সেভ হয়েছে!"
    );

  }

  catch (error) {

    console.error(
      "Trip save error:",
      error
    );

    showToast(
      "⚠️ প্ল্যান সেভ করা যায়নি"
    );

  }

}


// ============================================================
// SHARE TRIP
// ============================================================

async function shareTrip(
  name,
  days
) {

  const text =
    `আমি WanderBangla দিয়ে ` +
    `${days} দিনের ${name} ` +
    `ট্রিপ প্ল্যান বানিয়েছি! 🇧🇩\n` +
    `${window.location.href}`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({

        title:
          "WanderBangla Trip",

        text

      });

      return;

    }

    catch {

      // User cancelled or share failed.
    }

  }


  await copyToClipboard(
    text
  );

}


// ============================================================
// BUDGET CALCULATOR INIT
// ============================================================

function initBudgetCalculator() {

  const data =
    getWBData();

  const select =
    document.getElementById(
      "budgetDestination"
    );


  if (select) {

    select.innerHTML =

      '<option value="">বেছে নিন</option>' +

      data.destinations
        .map(
          destination =>
            `

              <option
                value="${escapeHTML(
                  destination.id
                )}"
              >

                ${escapeHTML(
                  destination.name
                )}

              </option>

            `
        )
        .join("");

  }


  document
    .getElementById(
      "calculateBudget"
    )
    ?.addEventListener(
      "click",
      calculateBudgetFromForm
    );

}


// ============================================================
// CALCULATE BUDGET FROM FORM
// ============================================================

function calculateBudgetFromForm() {

  const data =
    getWBData();


  const id =
    document.getElementById(
      "budgetDestination"
    )?.value;


  const days =
    Math.max(
      1,
      parseInt(
        document.getElementById(
          "budgetDays"
        )?.value ||
          "2",
        10
      )
    );


  const people =
    Math.max(
      1,
      parseInt(
        document.getElementById(
          "budgetPeople"
        )?.value ||
          "2",
        10
      )
    );


  const style =
    document.getElementById(
      "budgetStyle"
    )?.value ||
    "medium";


  if (!id) {

    showToast(
      "📍 আগে একটি গন্তব্য বেছে নিন"
    );

    return;

  }


  const destination =
    data.destinations.find(
      item =>
        item.id ===
        id
    );


  if (!destination) {

    showToast(
      "❌ গন্তব্য পাওয়া যায়নি"
    );

    return;

  }


  const result =
    getTripBudget(
      destination,
      days,
      people,
      style
    );


  const box =
    document.getElementById(
      "budgetResult"
    );


  if (!box)
    return;


  box.style.display =
    "block";


  box.innerHTML = `

    <h3>
      💰 আনুমানিক খরচ
    </h3>


    <p
      style="
        font-size:1.4rem;
        margin:0.8rem 0;
      "
    >

      <strong>

        ৳${Number(
          result.min
        ).toLocaleString(
          "bn-BD"
        )}

        –

        ৳${Number(
          result.max
        ).toLocaleString(
          "bn-BD"
        )}

      </strong>

    </p>


    <p>

      📍 ${escapeHTML(
        destination.name
      )}

      •
      ${days}
      দিন

      •
      ${people}
      জন

    </p>


    <p>

      ${
        style ===
        "low"
          ? "💚 সাশ্রয়ী বাজেট"
          : style ===
              "high"
            ? "✨ প্রিমিয়াম বাজেট"
            : "⚖️ মাঝারি বাজেট"
      }

    </p>


    <p
      style="
        opacity:0.85;
        font-size:0.9rem;
        margin-top:0.6rem;
      "
    >

      * এটি আনুমানিক হিসাব।
      প্রকৃত খরচ সিজন,
      হোটেল, পরিবহন ও খাবারের
      উপর পরিবর্তিত হতে পারে।

    </p>

  `;


  box.scrollIntoView({
    behavior:
      "smooth",
    block:
      "nearest"
  });


  showToast(
    "💰 বাজেট হিসাব তৈরি হয়েছে"
  );

}


// ============================================================
// MODAL INIT
// ============================================================

function initModal() {

  document
    .querySelector(
      ".modal-overlay"
    )
    ?.addEventListener(
      "click",
      event => {

        if (
          event.target.classList.contains(
            "modal-overlay"
          )
        ) {

          closeModal();

        }

      }
    );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeModal();

      }

    }
  );

}


// ============================================================
// DESTINATION MODAL
// ============================================================

function openDestinationModal(
  id
) {

  const data =
    getWBData();


  const destination =
    data.destinations.find(
      item =>
        item.id ===
        id
    );


  if (!destination) {

    showToast(
      "❌ গন্তব্য পাওয়া যায়নি"
    );

    return;

  }


  const favorites =
    getFavorites();


  const overlay =
    document.querySelector(
      ".modal-overlay"
    );


  const modal =
    document.getElementById(
      "destModal"
    );


  if (
    !overlay ||
    !modal
  ) {

    // Fallback for pages where modal HTML is missing.
    document
      .getElementById(
        "destinationsGrid"
      )
      ?.scrollIntoView({
        behavior:
          "smooth"
      });

    showToast(
      destination.name
    );

    return;

  }


  const reviews =
    getReviews(
      id
    );


  const avgReview =
    calculateAverageReview(
      reviews
    );


  const isFavorite =
    favorites.includes(
      destination.id
    );


  modal.innerHTML = `

    <button
      type="button"
      class="modal-close"
      onclick="closeModal()"
      aria-label="বন্ধ করুন"
    >
      ✕
    </button>


    <img
      class="modal-img"
      src="${safeImageURL(
        destination.image
      )}"
      alt="${escapeHTML(
        destination.imageAlt ||
        destination.name
      )}"
      onerror="handleImageError?.(this)"
    >


    <div class="modal-body">

      <h2>

        ${escapeHTML(
          destination.name
        )}

        <small>

          ${escapeHTML(
            destination.nameBn ||
            ""
          )}

        </small>

      </h2>


      <div class="modal-meta">

        <span>

          ★
          ${Number(
            destination.rating ||
            0
          ).toFixed(
            1
          )}

          (
          ${Number(
            destination.reviewsCount ||
            0
          ).toLocaleString(
            "bn-BD"
          )}
          + রিভিউ)

        </span>


        <span>

          📍
          ${escapeHTML(
            destination.region ||
            ""
          )}

        </span>


        <span>

          ⏱️
          ${escapeHTML(
            destination.duration ||
            ""
          )}

        </span>


        <span>

          💰
          ${escapeHTML(
            destination.budget ||
            ""
          )}

        </span>

      </div>


      <div class="modal-tabs">

        <button
          type="button"
          class="tab-btn active"
          data-tab="overview"
        >
          ওভারভিউ
        </button>


        <button
          type="button"
          class="tab-btn"
          data-tab="tips"
        >
          টিপস ও নিরাপত্তা
        </button>


        <button
          type="button"
          class="tab-btn"
          data-tab="reviews"
        >

          রিভিউ
          (${reviews.length})

        </button>

      </div>


      <!-- OVERVIEW -->

      <div
        class="tab-content active"
        id="tab-overview"
      >

        <p>

          ${escapeHTML(
            destination.description ||
            destination.shortDesc ||
            ""
          )}

        </p>


        <h4>
          ✨ হাইলাইটস
        </h4>


        <div class="highlights">

          ${
            Array.isArray(
              destination.highlights
            )
              ? destination.highlights
                  .map(
                    highlight =>
                      `

                        <span
                          class="highlight-tag"
                        >

                          ${escapeHTML(
                            highlight
                          )}

                        </span>

                      `
                  )
                  .join("")
              : ""
          }

        </div>


        <div class="two-col">

          <div>

            <h4>
              🚌 কীভাবে যাবেন
            </h4>


            <ul>

              ${
                Array.isArray(
                  destination.howToGo
                )
                  ? destination.howToGo
                      .map(
                        item =>
                          `<li>
                            ${escapeHTML(
                              item
                            )}
                          </li>`
                      )
                      .join("")
                  : ""
              }

            </ul>

          </div>


          <div>

            <h4>
              💡 দ্রুত টিপস
            </h4>


            <ul>

              ${
                Array.isArray(
                  destination.tips
                )
                  ? destination.tips
                      .slice(
                        0,
                        4
                      )
                      .map(
                        item =>
                          `<li>
                            ${escapeHTML(
                              item
                            )}
                          </li>`
                      )
                      .join("")
                  : ""
              }

            </ul>

          </div>

        </div>


        ${
          destination.budgetBreakdown
            ? `

              <h4>
                💰 খরচের হিসাব
              </h4>


              <div class="budget-tags">

                <span
                  class="highlight-tag"
                >

                  পরিবহন:

                  ${escapeHTML(
                    destination
                      .budgetBreakdown
                      .transport ||
                    ""
                  )}

                </span>


                <span
                  class="highlight-tag"
                >

                  থাকা:

                  ${escapeHTML(
                    destination
                      .budgetBreakdown
                      .stay ||
                    ""
                  )}

                </span>


                <span
                  class="highlight-tag"
                >

                  খাওয়া:

                  ${escapeHTML(
                    destination
                      .budgetBreakdown
                      .food ||
                    ""
                  )}

                </span>


                <span
                  class="highlight-tag"
                >

                  লোকাল:

                  ${escapeHTML(
                    destination
                      .budgetBreakdown
                      .local ||
                    ""
                  )}

                </span>

              </div>

            `
            : ""
        }

      </div>


      <!-- TIPS -->

      <div
        class="tab-content"
        id="tab-tips"
      >

        <h4>
          🛡️ নিরাপত্তা পরামর্শ
        </h4>


        <ul>

          ${
            Array.isArray(
              destination.safety
            )
              ? destination.safety
                  .map(
                    item =>
                      `<li>
                        ${escapeHTML(
                          item
                        )}
                      </li>`
                  )
                  .join("")
              : ""
          }

        </ul>


        <h4
          style="
            margin-top:1.2rem
          "
        >
          📦 কী নিয়ে যাবেন
        </h4>


        <div class="highlights">

          ${
            Array.isArray(
              destination.packing
            )
              ? destination.packing
                  .map(
                    item =>
                      `

                        <span
                          class="highlight-tag"
                        >

                          ${escapeHTML(
                            item
                          )}

                        </span>

                      `
                  )
                  .join("")
              : ""
          }

        </div>


        <h4
          style="
            margin-top:1.2rem
          "
        >
          💡 বিস্তারিত টিপস
        </h4>


        <ul>

          ${
            Array.isArray(
              destination.tips
            )
              ? destination.tips
                  .map(
                    item =>
                      `<li>
                        ${escapeHTML(
                          item
                        )}
                      </li>`
                  )
                  .join("")
              : ""
          }

        </ul>

      </div>


      <!-- REVIEWS -->

      <div
        class="tab-content"
        id="tab-reviews"
      >

        ${
          reviews.length
            ? `

              <div
                class="review-summary"
              >

                <strong>

                  ⭐
                  ${avgReview.toFixed(
                    1
                  )}

                </strong>

                <span>

                  ${reviews.length}
                  জনের স্থানীয় রিভিউ

                </span>

              </div>

            `
            : ""
        }


        <div class="reviews-list">

          ${
            reviews.length
              ? reviews
                  .slice(
                    0,
                    8
                  )
                  .map(
                    review =>
                      `

                        <div
                          class="review-card"
                        >

                          <strong>

                            ${"★".repeat(
                              Math.max(
                                0,
                                Math.min(
                                  5,
                                  Number(
                                    review.rating
                                  ) || 0
                                )
                              )
                            )}

                            ${"☆".repeat(
                              Math.max(
                                0,
                                5 -
                                  (
                                    Number(
                                      review.rating
                                    ) || 0
                                  )
                              )
                            )}

                          </strong>


                          <span
                            class="reviewer"
                          >

                            —
                            ${escapeHTML(
                              review.name ||
                              "ভ্রমণকারী"
                            )}

                          </span>


                          <p>

                            ${escapeHTML(
                              review.text ||
                              ""
                            )}

                          </p>

                        </div>

                      `
                  )
                  .join("")
              : `

                <p class="no-reviews">

                  এখনো কোনো রিভিউ নেই।
                  প্রথম রিভিউ দিন!

                </p>

              `
          }

        </div>


        <div class="review-form">

          <input
            id="reviewName"
            type="text"
            placeholder="আপনার নাম"
            maxlength="60"
          >


          <select
            id="reviewRating"
          >

            <option value="5">
              ★★★★★ (৫)
            </option>

            <option value="4">
              ★★★★☆ (৪)
            </option>

            <option value="3">
              ★★★☆☆ (৩)
            </option>

            <option value="2">
              ★★☆☆☆ (২)
            </option>

            <option value="1">
              ★☆☆☆☆ (১)
            </option>

          </select>


          <textarea
            id="reviewText"
            placeholder="আপনার অভিজ্ঞতা লিখুন..."
            rows="3"
            maxlength="500"
          ></textarea>


          <button
            type="button"
            class="btn btn-primary"
            onclick="
              submitReview(
                '${escapeJS(
                  id
                )}'
              )
            "
          >

            রিভিউ দিন

          </button>

        </div>

      </div>


      <!-- ACTIONS -->

      <div
        class="modal-actions"
      >

        <button
          type="button"
          class="btn btn-primary modal-favorite-btn"
          data-destination-id="${escapeHTML(
            destination.id
          )}"
          onclick="
            toggleFavorite(
              '${escapeJS(
                destination.id
              )}'
            )
          "
        >

          ${
            isFavorite
              ? "❤️ সেভ করা আছে"
              : "🤍 ফেভারিট করুন"
          }

        </button>


        <button
          type="button"
          class="btn btn-secondary"
          onclick="
            selectDestinationForTrip(
              '${escapeJS(
                destination.id
              )}'
            )
          "
        >

          🧳 ট্রিপ প্ল্যান করুন

        </button>


        <button
          type="button"
          class="btn btn-outline"
          onclick="
            shareDestination(
              '${escapeJS(
                destination.name
              )}'
            )
          "
        >

          📤 শেয়ার

        </button>

      </div>

    </div>

  `;


  // ----------------------------------------------------------
  // TABS
  // ----------------------------------------------------------

  modal
    .querySelectorAll(
      ".tab-btn"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            modal
              .querySelectorAll(
                ".tab-btn"
              )
              .forEach(
                btn =>
                  btn.classList.remove(
                    "active"
                  )
              );


            modal
              .querySelectorAll(
                ".tab-content"
              )
              .forEach(
                content =>
                  content.classList.remove(
                    "active"
                  )
              );


            button.classList.add(
              "active"
            );


            modal
              .querySelector(
                `#tab-${button.dataset.tab}`
              )
              ?.classList.add(
                "active"
              );

          }
        );

      }
    );


  overlay.classList.add(
    "show"
  );


  document.body.style.overflow =
    "hidden";


  // Focus close button for accessibility.
  setTimeout(
    () => {

      modal
        .querySelector(
          ".modal-close"
        )
        ?.focus();

    },
    50
  );

}


// ============================================================
// SELECT DESTINATION FOR TRIP
// ============================================================

function selectDestinationForTrip(
  destinationId
) {

  const select =
    document.getElementById(
      "tripDestination"
    );


  if (select) {

    select.value =
      destinationId;

  }


  document
    .getElementById(
      "planner"
    )
    ?.scrollIntoView({
      behavior:
        "smooth"
    });


  closeModal();

}


// ============================================================
// REFRESH MODAL FAVORITE BUTTON
// ============================================================

function refreshModalFavoriteButton(
  id
) {

  const button =
    document.querySelector(
      ".modal-favorite-btn[data-destination-id='" +
      CSS.escape(
        String(id)
      ) +
      "']"
    );


  if (!button)
    return;


  const favorite =
    getFavorites()
      .includes(
        id
      );


  button.innerHTML =
    favorite
      ? "❤️ সেভ করা আছে"
      : "🤍 ফেভারিট করুন";

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

  document
    .querySelector(
      ".modal-overlay"
    )
    ?.classList.remove(
      "show"
    );


  document.body.style.overflow =
    "";

}


// ============================================================
// SHARE DESTINATION
// ============================================================

async function shareDestination(
  name
) {

  const text =
    `WanderBangla-তে ${name} দেখুন! 🇧🇩\n${window.location.href}`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({

        title:
          name,

        text

      });

      return;

    }

    catch {

      // Fall through to clipboard.
    }

  }


  await copyToClipboard(
    text
  );

}


// ============================================================
// CLIPBOARD
// ============================================================

async function copyToClipboard(
  text
) {

  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator
        .clipboard
        .writeText(
          text
        );

    }

    else {

      const textarea =
        document.createElement(
          "textarea"
        );


      textarea.value =
        text;


      textarea.style.position =
        "fixed";

      textarea.style.opacity =
        "0";


      document.body.appendChild(
        textarea
      );


      textarea.select();


      document.execCommand(
        "copy"
      );


      textarea.remove();

    }


    showToast(
      "📋 লিংক কপি হয়েছে!"
    );


    return true;

  }

  catch (error) {

    console.error(
      "Clipboard error:",
      error
    );


    showToast(
      "লিংক কপি করা যায়নি"
    );


    return false;

  }

}


// ============================================================
// REVIEWS GET
// ============================================================

function getReviews(
  destinationId
) {

  try {

    const raw =
      safeStorageGet(
        "wb-reviews",
        "{}"
      );


    const all =
      JSON.parse(
        raw
      );


    if (
      !all ||
      typeof all !==
        "object"
    ) {

      return [];

    }


    if (
      !Array.isArray(
        all[
          destinationId
        ]
      )
    ) {

      return [];

    }


    return all[
      destinationId
    ].filter(
      review =>
        review &&
        typeof review ===
          "object"
    );

  }

  catch {

    return [];

  }

}


// ============================================================
// REVIEW AVERAGE
// ============================================================

function calculateAverageReview(
  reviews
) {

  if (
    !reviews ||
    !reviews.length
  ) {

    return 0;

  }


  const values =
    reviews
      .map(
        review =>
          Number(
            review.rating
          )
      )
      .filter(
        rating =>
          Number.isFinite(
            rating
          )
      );


  if (!values.length)
    return 0;


  const sum =
    values.reduce(
      (
        total,
        rating
      ) =>
        total +
        Math.max(
          0,
          Math.min(
            5,
            rating
          )
        ),
      0
    );


  return (
    sum /
    values.length
  );

}


// ============================================================
// SUBMIT REVIEW
// ============================================================

function submitReview(
  destinationId
) {

  const name =
    document.getElementById(
      "reviewName"
    )?.value.trim() ||
    "ভ্রমণকারী";


  const rating =
    parseInt(
      document.getElementById(
        "reviewRating"
      )?.value ||
        "5",
      10
    );


  const text =
    document.getElementById(
      "reviewText"
    )?.value.trim();


  if (
    !text ||
    text.length < 5
  ) {

    showToast(
      "✍️ অনুগ্রহ করে অন্তত ৫ অক্ষরের রিভিউ লিখুন"
    );

    return;

  }


  if (
    text.length >
    500
  ) {

    showToast(
      "রিভিউ সর্বোচ্চ ৫০০ অক্ষর হতে পারে"
    );

    return;

  }


  const safeRating =
    Math.max(
      1,
      Math.min(
        5,
        Number(
          rating
        ) || 5
      )
    );


  try {

    const raw =
      safeStorageGet(
        "wb-reviews",
        "{}"
      );


    const all =
      JSON.parse(
        raw
      );


    if (
      !all ||
      typeof all !==
        "object"
    ) {

      throw new Error(
        "Invalid review storage"
      );

    }


    if (
      !Array.isArray(
        all[
          destinationId
        ]
      )
    ) {

      all[
        destinationId
      ] = [];

    }


    all[
      destinationId
    ].unshift({

      name:
        name.slice(
          0,
          60
        ),

      rating:
        safeRating,

      text:
        text.slice(
          0,
          500
        ),

      date:
        new Date()
          .toISOString()

    });


    all[
      destinationId
    ] =
      all[
        destinationId
      ].slice(
        0,
        50
      );


    safeStorageSet(
      "wb-reviews",
      JSON.stringify(
        all
      )
    );


    showToast(
      "⭐ ধন্যবাদ! আপনার রিভিউ যোগ হয়েছে"
    );


    openDestinationModal(
      destinationId
    );


  }

  catch (error) {

    console.error(
      "Review save error:",
      error
    );


    showToast(
      "⚠️ রিভিউ সংরক্ষণ করা যায়নি"
    );

  }

}


// ============================================================
// SURPRISE ME
// ============================================================

function initSurpriseMe() {

  const trigger =
    () => {

      const data =
        getWBData();


      if (
        !data.destinations.length
      ) {

        showToast(
          "গন্তব্যের data পাওয়া যায়নি"
        );

        return;

      }


      const random =
        data.destinations[
          Math.floor(
            Math.random() *
            data.destinations.length
          )
        ];


      openDestinationModal(
        random.id
      );


      showToast(
        `🎲 সারপ্রাইজ! → ${random.name}`
      );

    };


  document
    .getElementById(
      "surpriseBtn"
    )
    ?.addEventListener(
      "click",
      trigger
    );


  document
    .getElementById(
      "surpriseFloatBtn"
    )
    ?.addEventListener(
      "click",
      trigger
    );

}


// ============================================================
// MAP
// ============================================================

function initMap() {

  const data =
    getWBData();

  const mapElement =
    document.getElementById(
      "bdMap"
    );


  if (
    !mapElement ||
    typeof L ===
      "undefined"
  ) {

    return;

  }


  if (
    mapInitialized &&
    mapInstance
  ) {

    try {

      mapInstance.invalidateSize();

    }

    catch {}

    return;

  }


  try {

    mapInstance =
      L.map(
        mapElement
      ).setView(
        [
          23.7,
          90.4
        ],
        7
      );


    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {

        attribution:
          "©️ OpenStreetMap"

      }
    ).addTo(
      mapInstance
    );


    data.destinations
      .forEach(
        destination => {

          const lat =
            Number(
              destination.lat
            );

          const lng =
            Number(
              destination.lng
            );


          if (
            !Number.isFinite(
              lat
            ) ||
            !Number.isFinite(
              lng
            )
          ) {

            return;

          }


          const marker =
            L.marker(
              [
                lat,
                lng
              ]
            )
              .addTo(
                mapInstance
              );


          marker.bindPopup(`

            <div
              style="
                min-width:190px;
              "
            >

              <strong>

                ${escapeHTML(
                  destination.name
                )}

              </strong>


              <br>


              <span>

                ${escapeHTML(
                  destination.shortDesc ||
                  ""
                )}

              </span>


              <br>


              <button
                type="button"
                onclick="
                  openDestinationModal(
                    '${escapeJS(
                      destination.id
                    )}'
                  )
                "
                style="
                  margin-top:8px;
                  padding:6px 12px;
                  background:#0d9488;
                  color:white;
                  border:none;
                  border-radius:6px;
                  cursor:pointer;
                "
              >

                বিস্তারিত

              </button>

            </div>

          `);

        }
      );


    mapInitialized =
      true;


    // Fix Leaflet size when section becomes visible.
    setTimeout(
      () => {

        mapInstance
          ?.invalidateSize();

      },
      300
    );


  }

  catch (error) {

    console.error(
      "Map initialization failed:",
      error
    );

    mapInstance =
      null;

    mapInitialized =
      false;

  }

}


// ============================================================
// REFRESH MAP
// ============================================================

function refreshMap() {

  if (
    mapInstance
  ) {

    try {

      mapInstance.invalidateSize();

    }

    catch {}

  }

}


// ============================================================
// TOAST
// ============================================================

function showToast(
  message
) {

  let toast =
    document.querySelector(
      ".toast"
    );


  if (!toast) {

    toast =
      document.createElement(
        "div"
      );

    toast.className =
      "toast";


    document.body.appendChild(
      toast
    );

  }


  clearTimeout(
    toastTimer
  );


  toast.textContent =
    String(
      message || ""
    );


  toast.classList.remove(
    "show"
  );


  // Force reflow so repeated toast works.
  void toast.offsetWidth;


  toast.classList.add(
    "show"
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2800
    );

}


// ============================================================
// WELCOME TOAST
// ============================================================

function showWelcomeToast() {

  const hour =
    new Date()
      .getHours();


  let greeting =
    "স্বাগতম!";


  if (
    hour < 12
  ) {

    greeting =
      "শুভ সকাল!";

  }

  else if (
    hour < 17
  ) {

    greeting =
      "শুভ দুপুর!";

  }

  else {

    greeting =
      "শুভ সন্ধ্যা!";

  }


  setTimeout(
    () => {

      showToast(
        `${greeting} WanderBangla-তে স্বাগতম 🇧🇩`
      );

    },
    900
  );

}


// ============================================================
// SCROLL ANIMATION
// ============================================================

function animateOnScroll() {

  if (
    !("IntersectionObserver" in window)
  ) {

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                "1";

              entry.target.style.transform =
                "translateY(0)";

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {

        threshold:
          0.08,

        rootMargin:
          "0px 0px -20px 0px"

      }
    );


  observeNewElements(
    document.querySelectorAll(
      ".card, .culture-card, .why-card, .tool-card"
    ),
    observer
  );

}


// ============================================================
// OBSERVE NEW ELEMENTS
// ============================================================

function observeNewElements(
  elements,
  observerInstance = null
) {

  const observer =
    observerInstance ||
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.style.opacity =
                "1";

              entry.target.style.transform =
                "translateY(0)";

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold:
          0.08
      }
    );


  if (!elements)
    return;


  elements.forEach(
    element => {

      if (
        !element.dataset.wbAnimated
      ) {

        element.dataset.wbAnimated =
          "true";

        element.style.opacity =
          "0";

        element.style.transform =
          "translateY(25px)";

        element.style.transition =
          "opacity 0.5s ease, transform 0.5s ease";

        observer.observe(
          element
        );

      }

    }
  );

}


// ============================================================
// GLOBAL BUTTONS
// ============================================================

function initGlobalButtons() {

  // Back-to-top button
  const topButton =
    document.getElementById(
      "backToTop"
    );


  if (topButton) {

    window.addEventListener(
      "scroll",
      () => {

        topButton.classList.toggle(
          "show",
          window.scrollY >
            500
        );

      },
      {
        passive:
          true
      }
    );


    topButton.addEventListener(
      "click",
      () => {

        window.scrollTo({

          top:
            0,

          behavior:
            "smooth"

        });

      }
    );

  }


  // Generic close buttons
  document
    .querySelectorAll(
      "[data-close-modal]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          closeModal
        );

      }
    );

}


// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
  "resize",
  () => {

    refreshMap();

  }
);


// ============================================================
// GLOBAL EXPORTS
// ============================================================

window.getFavorites =
  getFavorites;

window.saveFavorites =
  saveFavorites;

window.toggleFavorite =
  toggleFavorite;

window.updateFavCount =
  updateFavCount;

window.closeModal =
  closeModal;

window.openDestinationModal =
  openDestinationModal;

window.submitReview =
  submitReview;

window.getReviews =
  getReviews;

window.resetFilters =
  resetFilters;

window.saveTripPlan =
  saveTripPlan;

window.shareTrip =
  shareTrip;

window.shareDestination =
  shareDestination;

window.generateTrip =
  generateTrip;

window.selectDestinationForTrip =
  selectDestinationForTrip;

window.calculateBudgetFromForm =
  calculateBudgetFromForm;

window.showToast =
  showToast;

window.initMap =
  initMap;

window.refreshMap =
  refreshMap;

window.performSearch =
  performSearch;


// ============================================================
// OPTIONAL GLOBAL ACCESS
// ============================================================

window.WanderBanglaMain = {

  renderDestinations,

  renderFoods,

  renderCultures,

  renderTravelTips,

  performSearch,

  generateTrip,

  getTripBudget,

  openDestinationModal,

  toggleFavorite,

  showToast,

  initMap,

  resetFilters

};


// ============================================================
// FINAL STATUS
// ============================================================

console.log(
  "✅ WanderBangla joy.js v5.0 loaded successfully."
);

console.log(
  "📍 Interactive destinations engine ready."
);

console.log(
  "🍛 Food section ready."
);

console.log(
  "🎭 Culture section ready."
);

console.log(
  "🧳 Trip Planner ready."
);

console.log(
  "💰 Budget Calculator ready."
);

console.log(
  "❤️ Favorites system ready."
);

console.log(
  "⭐ Review system ready."
);

console.log(
  "🗺️ Map engine ready."
);

console.log(
  "🔎 Search engine ready."
);
