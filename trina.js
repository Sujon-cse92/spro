// ============================================================
// WanderBangla - tools.js
// Version: 4.0
//
// Smart Tools:
//   ✅ Budget Calculator
//   ✅ Packing Assistant
//   ✅ FAQ
//   ✅ Emergency Help
//   ✅ Searchable FAQ
//   ✅ Destination-aware Packing
//   ✅ Budget Breakdown
//   ✅ LocalStorage-safe utilities
//   ✅ Main.js v5 compatible
//   ✅ Global WanderBanglaTools API
// ============================================================


// ============================================================
// DATA ACCESS HELPER
// ============================================================

function getToolData() {

    const data =
        window.WanderBangla || {};

    return {

        destinations:
            Array.isArray(
                data.destinations
            )
                ? data.destinations
                : [],

        categories:
            Array.isArray(
                data.categories
            )
                ? data.categories
                : [],

        foods:
            Array.isArray(
                data.foods
            )
                ? data.foods
                : [],

        travelTips:
            Array.isArray(
                data.travelTips
            )
                ? data.travelTips
                : []

    };

}


// ============================================================
// EMERGENCY NUMBERS
// ============================================================
//
// Current government references:
// 999 = National Emergency Service
// 102 = Fire Service hotline
// 109 = Women & Children helpline
// 1098 = Child Helpline
// 16263 = Health Batayan
// 333 = Government Information & Services
//
// Sources checked against current Bangladesh government pages.
// ============================================================

const emergencyNumbers = [

    {
        icon: "🚨",
        number: "৯৯৯",
        title: "জাতীয় জরুরি সেবা",
        desc:
            "পুলিশ • ফায়ার সার্ভিস • অ্যাম্বুলেন্স",
        type: "emergency",
        callAvailable: true,
        official: true
    },

    {
        icon: "🚒",
        number: "১০২",
        title: "ফায়ার সার্ভিস",
        desc:
            "অগ্নিনির্বাপণ ও জরুরি ফায়ার সার্ভিস",
        type: "fire",
        callAvailable: true,
        official: true
    },

    {
        icon: "🏥",
        number: "১৬২৬৩",
        title: "স্বাস্থ্য বাতায়ন",
        desc:
            "স্বাস্থ্য সংক্রান্ত পরামর্শ ও তথ্য",
        type: "health",
        callAvailable: true,
        official: true
    },

    {
        icon: "👩‍👧",
        number: "১০৯",
        title: "নারী ও শিশু সহায়তা",
        desc:
            "নারী ও শিশু নির্যাতন প্রতিরোধ সহায়তা",
        type: "women-child",
        callAvailable: true,
        official: true
    },

    {
        icon: "🧒",
        number: "১০৯৮",
        title: "শিশু সহায়তা লাইন",
        desc:
            "শিশুদের জন্য সহায়তা",
        type: "child",
        callAvailable: true,
        official: true
    },

    {
        icon: "📞",
        number: "৩৩৩",
        title: "সরকারি তথ্য ও সেবা",
        desc:
            "সরকারি সেবা ও তথ্যের জন্য",
        type: "information",
        callAvailable: true,
        official: true
    }

];


// ============================================================
// FAQ DATA
// ============================================================

const faqData = [

    {
        id: "coxsbazar-duration",
        q:
            "কক্সবাজারে কতদিন থাকলে ভালো হয়?",
        a:
            "সাধারণত ২–৩ দিন ভালোভাবে ঘোরার জন্য যথেষ্ট। " +
            "লাবণী, হিমছড়ি, ইনানী এবং মেরিন ড্রাইভ " +
            "রুটে সময় ভাগ করে নিতে পারেন.",
        tags: [
            "কক্সবাজার",
            "সময়",
            "beach",
            "cox"
        ]
    },

    {
        id: "sajek-budget",
        q:
            "সাজেক যেতে কত খরচ হতে পারে?",
        a:
            "২–৩ দিনের জন্য জনপ্রতি আনুমানিক " +
            "৳৭,০০০–৳১৪,০০০ বা তার বেশি লাগতে পারে। " +
            "দলবদ্ধভাবে গেলে জীপ ও অন্যান্য কিছু খরচ ভাগ করা যায়। " +
            "বাস্তব খরচ সিজন, থাকার মান ও পরিবহনের উপর নির্ভর করবে।",
        tags: [
            "সাজেক",
            "বাজেট",
            "hills"
        ]
    },

    {
        id: "sundarbans-time",
        q:
            "সুন্দরবনে কখন যাওয়া ভালো?",
        a:
            "নভেম্বর থেকে ফেব্রুয়ারি সময়টি অনেক ভ্রমণকারীর জন্য " +
            "আরামদায়ক হতে পারে। তবে আবহাওয়া, অনুমতি ও ট্যুর অপারেটরের " +
            "বর্তমান ব্যবস্থা ভ্রমণের আগে যাচাই করা ভালো।",
        tags: [
            "সুন্দরবন",
            "সময়",
            "forest"
        ]
    },

    {
        id: "hill-network",
        q:
            "পাহাড়ি এলাকায় নেটওয়ার্ক কেমন?",
        a:
            "সাজেক, বান্দরবান ও রাঙ্গামাটির কিছু দূরবর্তী এলাকায় " +
            "মোবাইল নেটওয়ার্ক দুর্বল হতে পারে। Offline map, power bank " +
            "এবং প্রয়োজনীয় তথ্য আগে থেকে সংরক্ষণ করে রাখুন।",
        tags: [
            "পাহাড়",
            "নেটওয়ার্ক",
            "offline map"
        ]
    },

    {
        id: "saint-martin-rules",
        q:
            "সেন্ট মার্টিনে যাওয়ার আগে কী জানতে হবে?",
        a:
            "নৌযান, পর্যটন এবং পরিবেশগত নিয়ম সময় অনুযায়ী পরিবর্তিত " +
            "হতে পারে। ভ্রমণের আগে বর্তমান সরকারি নির্দেশনা, নৌযানের " +
            "ব্যবস্থা এবং প্রবেশ সংক্রান্ত নিয়ম যাচাই করুন।",
        tags: [
            "সেন্ট মার্টিন",
            "island",
            "নিয়ম"
        ]
    },

    {
        id: "budget-destination",
        q:
            "বাজেট ট্রাভেলারদের জন্য কোন গন্তব্য ভালো?",
        a:
            "সোনারগাঁও, জাফলং, কুয়াকাটা ও শ্রীমঙ্গল কিছু ক্ষেত্রে " +
            "তুলনামূলক সাশ্রয়ী হতে পারে। তবে transport, hotel এবং season " +
            "অনুযায়ী খরচ অনেকটা পরিবর্তিত হয়।",
        tags: [
            "বাজেট",
            "সাশ্রয়ী",
            "জাফলং",
            "কুয়াকাটা"
        ]
    },

    {
        id: "rainy-season",
        q:
            "বর্ষাকালে কোন গন্তব্যে যাওয়া যায়?",
        a:
            "সিলেট অঞ্চলের জাফলং, বিছানাকান্দি ও কিছু জলপ্রধান স্থান " +
            "বর্ষায় আকর্ষণীয় হতে পারে। তবে বৃষ্টি, পাহাড়ি রাস্তা, নদীর " +
            "পানি ও স্থানীয় সতর্কতা আগে দেখে নিন।",
        tags: [
            "বর্ষা",
            "সিলেট",
            "জাফলং"
        ]
    },

    {
        id: "family-trip",
        q:
            "পরিবার নিয়ে কোন গন্তব্য ভালো?",
        a:
            "কক্সবাজার, কুয়াকাটা, সিলেট ও রাঙ্গামাটি পরিবার নিয়ে " +
            "ভ্রমণের জন্য জনপ্রিয় হতে পারে। পরিবারে শিশু বা বয়স্ক সদস্য " +
            "থাকলে খুব কষ্টকর ট্রেকিং এড়িয়ে পরিকল্পনা করুন।",
        tags: [
            "পরিবার",
            "family",
            "কক্সবাজার",
            "সিলেট"
        ]
    },

    {
        id: "trip-planner",
        q:
            "WanderBangla Trip Planner কীভাবে ব্যবহার করব?",
        a:
            "Trip Planner-এ destination, days, people এবং budget style " +
            "নির্বাচন করে Generate Trip চাপুন। এরপর system একটি সম্ভাব্য " +
            "itinerary এবং আনুমানিক budget দেখাবে।",
        tags: [
            "trip planner",
            "itinerary",
            "planner"
        ]
    },

    {
        id: "favorites",
        q:
            "Favorite করলে তথ্য কোথায় থাকে?",
        a:
            "WanderBangla browser-এর localStorage ব্যবহার করে favorite " +
            "destination সংরক্ষণ করতে পারে। তাই একই browser-এ data থাকলে " +
            "পরে আবার দেখা যেতে পারে।",
        tags: [
            "favorite",
            "localStorage"
        ]
    }

];


// ============================================================
// PACKING LIST
// ============================================================

const packingByType = {

    beach: [

        "সানস্ক্রিন (SPF ৩০+)",
        "সানগ্লাস",
        "টুপি / ক্যাপ",
        "হালকা সুতি কাপড়",
        "স্যান্ডেল",
        "পানির বোতল",
        "পাওয়ার ব্যাংক",
        "ছোট তোয়ালে",
        "মশা নিরোধক",
        "নগদ টাকা",
        "ওয়াটারপ্রুফ ফোন পাউচ"

    ],

    hills: [

        "জ্যাকেট / হুডি",
        "হাইকিং জুতা",
        "টর্চ / হেডল্যাম্প",
        "পাওয়ার ব্যাংক",
        "প্রয়োজনীয় ওষুধ",
        "পানির বোতল",
        "রেইনকোট",
        "ছোট ব্যাকপ্যাক",
        "মাফলার",
        "গ্রিপযুক্ত জুতা",
        "ছোট ফার্স্ট-এইড কিট"

    ],

    forest: [

        "মশা নিরোধক",
        "লম্বা হাতা কাপড়",
        "বাইনোকুলার",
        "ক্যামেরা",
        "প্রয়োজনীয় ওষুধ",
        "পানির বোতল",
        "লাইফ জ্যাকেট",
        "হালকা জ্যাকেট",
        "ফার্স্ট-এইড কিট",
        "সানস্ক্রিন",
        "জলরোধী ব্যাগ"

    ],

    lake: [

        "সানস্ক্রিন",
        "সানগ্লাস",
        "টুপি",
        "পানির বোতল",
        "ক্যামেরা",
        "পাওয়ার ব্যাংক",
        "লাইফ জ্যাকেট",
        "রেইনকোট",
        "স্যান্ডেল",
        "ছোট ব্যাকপ্যাক"

    ],

    river: [

        "স্যান্ডেল",
        "পানির বোতল",
        "সানস্ক্রিন",
        "সানগ্লাস",
        "রেইনকোট",
        "লাইফ জ্যাকেট",
        "পাওয়ার ব্যাংক",
        "ওয়াটারপ্রুফ ফোন পাউচ",
        "ছোট তোয়ালে"

    ],

    city: [

        "আরামদায়ক হাঁটার জুতা",
        "টুপি",
        "সানস্ক্রিন",
        "পানির বোতল",
        "ক্যামেরা",
        "হালকা ব্যাগ",
        "নগদ + মোবাইল ব্যাংকিং",
        "পাওয়ার ব্যাংক",
        "ছাতা",
        "ফার্স্ট-এইড কিট"

    ],

    general: [

        "পানির বোতল",
        "পাওয়ার ব্যাংক",
        "চার্জার",
        "প্রয়োজনীয় ওষুধ",
        "ফার্স্ট-এইড কিট",
        "সানস্ক্রিন",
        "মোবাইল ফোন",
        "পরিচয়পত্র",
        "নগদ টাকা / মোবাইল ব্যাংকিং"

    ]

};


// ============================================================
// BANGLA NUMBER → ENGLISH
// ============================================================

function convertBanglaDigits(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    const banglaDigits =
        "০১২৩৪৫৬৭৮৯";

    const englishDigits =
        "0123456789";


    return String(value)
        .split("")
        .map(
            char => {

                const index =
                    banglaDigits.indexOf(
                        char
                    );


                return index >= 0
                    ? englishDigits[index]
                    : char;

            }
        )
        .join("");

}


// ============================================================
// ENGLISH NUMBER → BANGLA
// ============================================================

function convertEnglishDigitsToBangla(
    value
) {

    const englishDigits =
        "0123456789";

    const banglaDigits =
        "০১২৩৪৫৬৭৮৯";


    return String(value)
        .split("")
        .map(
            char => {

                const index =
                    englishDigits.indexOf(
                        char
                    );


                return index >= 0
                    ? banglaDigits[index]
                    : char;

            }
        )
        .join("");

}


// ============================================================
// CLEAN NUMBER
// ============================================================

function cleanNumber(
    value
) {

    const converted =
        convertBanglaDigits(
            value
        );


    const cleaned =
        converted
            .replace(
                /,/g,
                ""
            )
            .replace(
                /[^0-9.]/g,
                ""
            );


    const number =
        Number(
            cleaned
        );


    return Number.isFinite(
        number
    )
        ? number
        : 0;

}


// ============================================================
// PARSE BUDGET RANGE
// ============================================================
//
// Examples:
//
// "৳২,৫০০–৪,৫০০"
// "2500 - 4500"
// "৳1000"
// "৳১,০০০–৩,০০০/রাত"
// ============================================================

function parseBudgetRange(
    value
) {

    if (!value) {

        return {
            min: 0,
            max: 0
        };

    }


    let text =
        convertBanglaDigits(
            value
        );


    text =
        text
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
        text.match(
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
                value =>
                    Number(
                        value
                    )
            )
            .filter(
                value =>
                    Number.isFinite(
                        value
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
// FORMAT MONEY
// ============================================================

function formatMoney(
    number
) {

    const safe =
        Number.isFinite(
            Number(number)
        )
            ? Math.round(
                Number(number)
            )
            : 0;


    return safe.toLocaleString(
        "en-US"
    );

}


// ============================================================
// FORMAT BANGLA MONEY
// ============================================================

function formatBanglaMoney(
    number
) {

    return convertEnglishDigitsToBangla(
        formatMoney(
            number
        )
    );

}


// ============================================================
// CURRENCY RANGE
// ============================================================

function formatMoneyRange(
    min,
    max
) {

    return (
        "৳" +
        formatBanglaMoney(
            min
        ) +
        " – ৳" +
        formatBanglaMoney(
            max
        )
    );

}


// ============================================================
// GET DESTINATION
// ============================================================

function getDestinationById(
    destId
) {

    const data =
        getToolData();


    return data.destinations.find(
        destination =>
            destination.id ===
            destId
    ) || null;

}


// ============================================================
// DETECT DESTINATION TYPE
// ============================================================
//
// Result:
// beach / hills / forest / lake / river / city / general
// ============================================================

function detectDestinationType(
    destination
) {

    if (!destination) {

        return "general";

    }


    const categories =
        Array.isArray(
            destination.category
        )
            ? destination.category
            : [];


    if (
        categories.includes(
            "beach"
        ) ||
        categories.includes(
            "island"
        )
    ) {

        return "beach";

    }


    if (
        categories.includes(
            "hills"
        ) ||
        categories.includes(
            "adventure"
        )
    ) {

        return "hills";

    }


    if (
        categories.includes(
            "wildlife"
        )
    ) {

        return "forest";

    }


    if (
        categories.includes(
            "lake"
        )
    ) {

        return "lake";

    }


    if (
        categories.includes(
            "river"
        )
    ) {

        return "river";

    }


    if (
        categories.includes(
            "historical"
        ) ||
        categories.includes(
            "cultural"
        )
    ) {

        return "city";

    }


    return "general";

}


// ============================================================
// GET PACKING LIST
// ============================================================

function getPackingList(
    destId,
    options = {}
) {

    const destination =
        getDestinationById(
            destId
        );


    const type =
        detectDestinationType(
            destination
        );


    let list = [
        ...(packingByType[
            type
        ] ||
            packingByType.general)
    ];


    // --------------------------------------------------------
    // Destination-specific packing
    // --------------------------------------------------------

    if (
        destination &&
        Array.isArray(
            destination.packing
        )
    ) {

        list =
            [
                ...list,
                ...destination.packing
            ];

    }


    // --------------------------------------------------------
    // Add rainy-season item
    // --------------------------------------------------------

    if (
        options.rainySeason === true
    ) {

        list.push(
            "রেইনকোট / ছাতা"
        );

        list.push(
            "ওয়াটারপ্রুফ ব্যাগ"
        );

    }


    // --------------------------------------------------------
    // Add winter item
    // --------------------------------------------------------

    if (
        options.winter === true
    ) {

        list.push(
            "গরম কাপড়"
        );

        list.push(
            "মাফলার / ক্যাপ"
        );

    }


    // --------------------------------------------------------
    // Add child/family items
    // --------------------------------------------------------

    if (
        options.family === true
    ) {

        list.push(
            "অতিরিক্ত পানির বোতল"
        );

        list.push(
            "স্যানিটাইজার / টিস্যু"
        );

        list.push(
            "ছোট ফার্স্ট-এইড কিট"
        );

    }


    // --------------------------------------------------------
    // Remove duplicate items
    // --------------------------------------------------------

    return [
        ...new Set(
            list.filter(
                Boolean
            )
        )
    ];

}


// ============================================================
// GET PACKING CHECKLIST OBJECT
// ============================================================

function getPackingChecklist(
    destId,
    options = {}
) {

    const list =
        getPackingList(
            destId,
            options
        );


    return list.map(
        item => ({

            item,

            checked:
                false

        })
    );

}


// ============================================================
// SAVE PACKING CHECKLIST
// ============================================================

function savePackingChecklist(
    destId,
    checkedItems
) {

    try {

        const key =
            "wb-packing-" +
            String(
                destId
            );


        localStorage.setItem(
            key,
            JSON.stringify(
                Array.isArray(
                    checkedItems
                )
                    ? checkedItems
                    : []
            )
        );


        return true;

    }

    catch (
        error
    ) {

        console.warn(
            "Packing save failed:",
            error
        );


        return false;

    }

}


// ============================================================
// LOAD PACKING CHECKLIST
// ============================================================

function loadPackingChecklist(
    destId
) {

    try {

        const key =
            "wb-packing-" +
            String(
                destId
            );


        const saved =
            localStorage.getItem(
                key
            );


        if (!saved) {

            return [];

        }


        const parsed =
            JSON.parse(
                saved
            );


        return Array.isArray(
            parsed
        )
            ? parsed
            : [];

    }

    catch {

        return [];

    }

}


// ============================================================
// CALCULATE SMART BUDGET
// ============================================================
//
// This function is used by main.js:
//
// calculateSmartBudget(
//     destId,
//     days,
//     people,
//     style
// )
//
// style:
//     low
//     medium
//     high
// ============================================================

function calculateSmartBudget(
    destId,
    days,
    people,
    style
) {

    const destination =
        getDestinationById(
            destId
        );


    if (!destination) {

        console.error(
            "❌ Destination not found:",
            destId
        );


        return null;

    }


    const totalDays =
        Math.max(
            1,
            Number(days) || 1
        );


    const totalPeople =
        Math.max(
            1,
            Number(people) || 1
        );


    const budgetStyle =
        [
            "low",
            "medium",
            "high"
        ].includes(
            style
        )
            ? style
            : "medium";


    const multipliers = {

        low:
            0.75,

        medium:
            1,

        high:
            1.45

    };


    const styleMultiplier =
        multipliers[
            budgetStyle
        ];


    const breakdown =
        destination
            .budgetBreakdown || {};


    const transport =
        parseBudgetRange(
            breakdown.transport
        );


    const stay =
        parseBudgetRange(
            breakdown.stay
        );


    const food =
        parseBudgetRange(
            breakdown.food
        );


    const local =
        parseBudgetRange(
            breakdown.local
        );


    const nights =
        Math.max(
            0,
            totalDays - 1
        );


    // --------------------------------------------------------
    // Shared transport
    // --------------------------------------------------------

    const transportShareFactor =
        totalPeople > 1
            ? 1 +
                (
                    totalPeople - 1
                ) *
                0.35
            : 1;


    const localShareFactor =
        totalPeople > 1
            ? 1 +
                (
                    totalPeople - 1
                ) *
                0.40
            : 1;


    // --------------------------------------------------------
    // Calculate
    // --------------------------------------------------------

    let totalMin =
        (
            transport.min *
            transportShareFactor
        ) +

        (
            stay.min *
            nights *
            totalPeople
        ) +

        (
            food.min *
            totalDays *
            totalPeople
        ) +

        (
            local.min *
            localShareFactor
        );


    let totalMax =
        (
            transport.max *
            transportShareFactor
        ) +

        (
            stay.max *
            nights *
            totalPeople
        ) +

        (
            food.max *
            totalDays *
            totalPeople
        ) +

        (
            local.max *
            localShareFactor
        );


    // --------------------------------------------------------
    // Destination base budget fallback
    // --------------------------------------------------------

    if (
        !Number.isFinite(
            totalMin
        ) ||
        totalMin <= 0
    ) {

        const base =
            parseBudgetRange(
                destination.budget
            );


        if (
            base.min > 0
        ) {

            totalMin =
                base.min *
                totalPeople;

            totalMax =
                (
                    base.max ||
                    base.min *
                    1.35
                ) *
                totalPeople;

        }

    }


    // --------------------------------------------------------
    // Apply style
    // --------------------------------------------------------

    totalMin *=
        styleMultiplier;


    totalMax *=
        styleMultiplier;


    // --------------------------------------------------------
    // Final safety
    // --------------------------------------------------------

    if (
        !Number.isFinite(
            totalMin
        ) ||
        totalMin <= 0
    ) {

        totalMin =
            5000;

    }


    if (
        !Number.isFinite(
            totalMax
        ) ||
        totalMax <= 0
    ) {

        totalMax =
            7000;

    }


    // --------------------------------------------------------
    // Round
    // --------------------------------------------------------

    totalMin =
        Math.round(
            totalMin /
            100
        ) *
        100;


    totalMax =
        Math.round(
            totalMax /
            100
        ) *
        100;


    if (
        totalMax <=
        totalMin
    ) {

        totalMax =
            totalMin +
            1000;

    }


    const perPersonMin =
        Math.round(
            totalMin /
            totalPeople
        );


    const perPersonMax =
        Math.round(
            totalMax /
            totalPeople
        );


    return {

        min:
            totalMin,

        max:
            totalMax,

        perPersonMin,

        perPersonMax,

        dest:
            destination.name,

        destBn:
            destination.nameBn,

        days:
            totalDays,

        people:
            totalPeople,

        style:
            budgetStyle,

        destinationType:
            detectDestinationType(
                destination
            ),

        formattedMin:
            formatBanglaMoney(
                totalMin
            ),

        formattedMax:
            formatBanglaMoney(
                totalMax
            ),

        formattedRange:
            formatMoneyRange(
                totalMin,
                totalMax
            ),

        formattedPerPerson:
            formatMoneyRange(
                perPersonMin,
                perPersonMax
            ),

        breakdown: {

            transport: {

                min:
                    transport.min,

                max:
                    transport.max

            },

            stay: {

                min:
                    stay.min *
                    nights *
                    totalPeople,

                max:
                    stay.max *
                    nights *
                    totalPeople

            },

            food: {

                min:
                    food.min *
                    totalDays *
                    totalPeople,

                max:
                    food.max *
                    totalDays *
                    totalPeople

            },

            local: {

                min:
                    local.min,

                max:
                    local.max

            }

        }

    };

}


// ============================================================
// SIMPLE BUDGET CALCULATOR
// ============================================================

function calculateSimpleBudget(
    min,
    max,
    people
) {

    const minimum =
        Math.max(
            0,
            Number(min) || 0
        );


    const maximum =
        Math.max(
            minimum,
            Number(max) || 0
        );


    const persons =
        Math.max(
            1,
            Number(people) || 1
        );


    return {

        totalMin:
            minimum,

        totalMax:
            maximum,

        perPersonMin:
            Math.round(
                minimum /
                persons
            ),

        perPersonMax:
            Math.round(
                maximum /
                persons
            ),

        formatted:
            formatMoneyRange(
                minimum,
                maximum
            )

    };

}


// ============================================================
// BUDGET BREAKDOWN
// ============================================================

function getBudgetBreakdown(
    destId,
    days,
    people,
    style
) {

    const result =
        calculateSmartBudget(
            destId,
            days,
            people,
            style
        );


    if (
        !result
    ) {

        return null;

    }


    return {

        transport:
            result.breakdown
                .transport,

        stay:
            result.breakdown
                .stay,

        food:
            result.breakdown
                .food,

        local:
            result.breakdown
                .local,

        total:
            {

                min:
                    result.min,

                max:
                    result.max

            }

    };

}


// ============================================================
// FAQ SEARCH
// ============================================================

function searchFAQ(
    query
) {

    const q =
        String(
            query || ""
        )
            .trim()
            .toLowerCase();


    if (!q) {

        return [
            ...faqData
        ];

    }


    return faqData.filter(
        faq => {

            const searchable =
                [

                    faq.q,

                    faq.a,

                    ...(faq.tags ||
                        [])

                ]
                    .join(
                        " "
                    )
                    .toLowerCase();


            return searchable.includes(
                q
            );

        }
    );

}


// ============================================================
// GET FAQ BY ID
// ============================================================

function getFAQ(
    id
) {

    return faqData.find(
        faq =>
            faq.id ===
            id
    ) || null;

}


// ============================================================
// EMERGENCY SEARCH
// ============================================================

function findEmergency(
    query
) {

    const q =
        String(
            query || ""
        )
            .trim()
            .toLowerCase();


    if (!q) {

        return [
            ...emergencyNumbers
        ];

    }


    return emergencyNumbers.filter(
        item => {

            return (

                String(
                    item.number ||
                    ""
                ).includes(
                    q
                ) ||

                String(
                    item.title ||
                    ""
                )
                    .toLowerCase()
                    .includes(
                        q
                    ) ||

                String(
                    item.desc ||
                    ""
                )
                    .toLowerCase()
                    .includes(
                        q
                    )

            );

        }
    );

}


// ============================================================
// CALL EMERGENCY
// ============================================================
//
// Converts Bangla number to English
// and opens tel:
// ============================================================

function callEmergency(
    number
) {

    const clean =
        convertBanglaDigits(
            number
        )
            .replace(
                /[^0-9+]/g,
                ""
            );


    if (!clean) {

        return false;

    }


    window.location.href =
        "tel:" +
        clean;


    return true;

}


// ============================================================
// GET EMERGENCY NUMBER
// ============================================================

function getEmergencyNumber(
    type
) {

    return emergencyNumbers.find(
        item =>
            item.type ===
            type
    ) || null;

}


// ============================================================
// RENDER EMERGENCY CARDS
// ============================================================
//
// Works if any of these IDs exists:
//   emergencyGrid
//   emergencyNumbers
//   emergencyContainer
// ============================================================

function renderEmergencyTools() {

    const containers = [

        document.getElementById(
            "emergencyGrid"
        ),

        document.getElementById(
            "emergencyNumbers"
        ),

        document.getElementById(
            "emergencyContainer"
        )

    ].filter(
        Boolean
    );


    if (!containers.length) {

        return;

    }


    const html =
        emergencyNumbers
            .map(
                item => {

                    const number =
                        convertBanglaDigits(
                            item.number
                        );


                    return `

                        <div
                            class="emergency-card"
                        >

                            <div
                                class="emergency-icon"
                            >

                                ${item.icon}

                            </div>


                            <div
                                class="emergency-info"
                            >

                                <h3>

                                    ${item.title}

                                </h3>


                                <strong>

                                    ${item.number}

                                </strong>


                                <p>

                                    ${item.desc}

                                </p>

                            </div>


                            <button
                                type="button"
                                class="btn btn-primary emergency-call-btn"
                                data-number="${number}"
                            >

                                📞 কল

                            </button>

                        </div>

                    `;

                }
            )
            .join("");


    containers.forEach(
        container => {

            container.innerHTML =
                html;


            container
                .querySelectorAll(
                    ".emergency-call-btn"
                )
                .forEach(
                    button => {

                        button.addEventListener(
                            "click",
                            () => {

                                callEmergency(
                                    button.dataset
                                        .number
                                );

                            }
                        );

                    }
                );

        }
    );

}


// ============================================================
// RENDER FAQ
// ============================================================
//
// Supported container IDs:
//   faqContainer
//   faqList
//   faqGrid
// ============================================================

function renderFAQ(
    query = ""
) {

    const containers = [

        document.getElementById(
            "faqContainer"
        ),

        document.getElementById(
            "faqList"
        ),

        document.getElementById(
            "faqGrid"
        )

    ].filter(
        Boolean
    );


    if (!containers.length) {

        return;

    }


    const results =
        searchFAQ(
            query
        );


    const html =
        results.length

            ? results
                .map(
                    faq => `

                        <details
                            class="faq-item"
                        >

                            <summary>

                                ${faq.q}

                            </summary>


                            <div
                                class="faq-answer"
                            >

                                <p>

                                    ${faq.a}

                                </p>

                            </div>

                        </details>

                    `
                )
                .join("")

            : `

                <div
                    class="faq-empty"
                >

                    🔎

                    <p>
                        কোনো FAQ পাওয়া যায়নি।
                    </p>

                </div>

            `;


    containers.forEach(
        container => {

            container.innerHTML =
                html;

        }
    );

}


// ============================================================
// INIT FAQ SEARCH
// ============================================================

function initFAQTools() {

    renderFAQ();


    const searchInputs = [

        document.getElementById(
            "faqSearch"
        ),

        document.getElementById(
            "faqInput"
        )

    ].filter(
        Boolean
    );


    searchInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                event => {

                    renderFAQ(
                        event.target.value
                    );

                }
            );

        }
    );

}


// ============================================================
// RENDER PACKING TOOL
// ============================================================
//
// Supported IDs:
//   packingContainer
//   packingList
//   packingGrid
// ============================================================

function renderPackingTool(
    destId,
    options = {}
) {

    const containers = [

        document.getElementById(
            "packingContainer"
        ),

        document.getElementById(
            "packingList"
        ),

        document.getElementById(
            "packingGrid"
        )

    ].filter(
        Boolean
    );


    if (!containers.length) {

        return;

    }


    const list =
        getPackingList(
            destId,
            options
        );


    const saved =
        loadPackingChecklist(
            destId
        );


    const html =
        list
            .map(
                (item, index) => {

                    const checked =
                        saved.includes(
                            item
                        );


                    return `

                        <label
                            class="packing-item"
                        >

                            <input
                                type="checkbox"
                                data-packing-index="${index}"
                                data-packing-item="${item}"
                                ${checked
                                    ? "checked"
                                    : ""}
                            >


                            <span>

                                ${item}

                            </span>

                        </label>

                    `;

                }
            )
            .join("");


    containers.forEach(
        container => {

            container.innerHTML =
                html;


            container
                .querySelectorAll(
                    "input[type='checkbox']"
                )
                .forEach(
                    checkbox => {

                        checkbox.addEventListener(
                            "change",
                            () => {

                                saveVisiblePacking(
                                    container,
                                    destId
                                );

                            }
                        );

                    }
                );

        }
    );

}


// ============================================================
// SAVE VISIBLE PACKING
// ============================================================

function saveVisiblePacking(
    container,
    destId
) {

    const checkedItems = [

        ...container
            .querySelectorAll(
                "input[type='checkbox']:checked"
            )

    ]
        .map(
            checkbox =>
                checkbox.dataset
                    .packingItem
        )
        .filter(
            Boolean
        );


    savePackingChecklist(
        destId,
        checkedItems
    );

}


// ============================================================
// INIT SMART TOOLS
// ============================================================

function initSmartTools() {

    try {

        renderEmergencyTools();

        initFAQTools();

    }

    catch (
        error
    ) {

        console.warn(
            "Smart tools initialization warning:",
            error
        );

    }

}


// ============================================================
// DEBUG BUDGET
// ============================================================
//
// Browser console:
// debugBudget(
//     "coxsbazar",
//     2,
//     2,
//     "medium"
// );
// ============================================================

function debugBudget(
    destId,
    days,
    people,
    style
) {

    const result =
        calculateSmartBudget(
            destId,
            days,
            people,
            style
        );


    console.log(
        "======================================"
    );


    console.log(
        "🌿 WanderBangla Budget Debug"
    );


    console.log(
        "Destination:",
        destId
    );


    console.log(
        "Days:",
        days
    );


    console.log(
        "People:",
        people
    );


    console.log(
        "Style:",
        style
    );


    console.log(
        "Result:",
        result
    );


    console.log(
        "======================================"
    );


    return result;

}


// ============================================================
// FULL TOOL DEBUG
// ============================================================

function debugWanderBanglaTools() {

    const data =
        getToolData();


    console.log(
        "=========================================="
    );


    console.log(
        "🌿 WanderBangla Tools Debug"
    );


    console.log(
        "Destinations:",
        data.destinations.length
    );


    console.log(
        "Foods:",
        data.foods.length
    );


    console.log(
        "Travel Tips:",
        data.travelTips.length
    );


    console.log(
        "Emergency Numbers:",
        emergencyNumbers.length
    );


    console.log(
        "FAQ Count:",
        faqData.length
    );


    console.log(
        "Packing Types:",
        Object.keys(
            packingByType
        )
    );


    console.log(
        "WanderBangla data available:",
        Boolean(
            window.WanderBangla
        )
    );


    console.log(
        "=========================================="
    );


    return {

        destinations:
            data.destinations.length,

        foods:
            data.foods.length,

        travelTips:
            data.travelTips.length,

        emergency:
            emergencyNumbers.length,

        faq:
            faqData.length,

        packing:
            Object.keys(
                packingByType
            ).length

    };

}


// ============================================================
// AUTO INIT
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initSmartTools();

        console.log(
            "🛠️ WanderBangla Smart Tools v4.0 ready."
        );

    }
);


// ============================================================
// GLOBAL ACCESS
// ============================================================

window.WanderBanglaTools = {

    // --------------------------------------------------------
    // Emergency
    // --------------------------------------------------------

    emergencyNumbers,

    findEmergency,

    getEmergencyNumber,

    callEmergency,

    renderEmergencyTools,


    // --------------------------------------------------------
    // FAQ
    // --------------------------------------------------------

    faqData,

    searchFAQ,

    getFAQ,

    renderFAQ,

    initFAQTools,


    // --------------------------------------------------------
    // Packing
    // --------------------------------------------------------

    packingByType,

    detectDestinationType,

    getPackingList,

    getPackingChecklist,

    savePackingChecklist,

    loadPackingChecklist,

    renderPackingTool,


    // --------------------------------------------------------
    // Number utilities
    // --------------------------------------------------------

    convertBanglaDigits,

    convertEnglishDigitsToBangla,

    cleanNumber,


    // --------------------------------------------------------
    // Money utilities
    // --------------------------------------------------------

    parseBudgetRange,

    formatMoney,

    formatBanglaMoney,

    formatMoneyRange,


    // --------------------------------------------------------
    // Budget
    // --------------------------------------------------------

    calculateSmartBudget,

    calculateSimpleBudget,

    getBudgetBreakdown,


    // --------------------------------------------------------
    // Destination
    // --------------------------------------------------------

    getDestinationById,


    // --------------------------------------------------------
    // Debug
    // --------------------------------------------------------

    debugBudget,

    debugWanderBanglaTools

};


// ============================================================
// LEGACY GLOBAL COMPATIBILITY
// ============================================================
//
// These are kept because older code may call them directly.
// ============================================================

window.calculateSmartBudget =
    calculateSmartBudget;

window.parseBudgetRange =
    parseBudgetRange;

window.formatBanglaMoney =
    formatBanglaMoney;

window.getPackingList =
    getPackingList;

window.searchFAQ =
    searchFAQ;

window.callEmergency =
    callEmergency;


// ============================================================
// LOAD STATUS
// ============================================================

console.log(
    "🛠️ WanderBangla tools.js v4.0 loaded successfully."
);

console.log(
    "💰 Smart Budget Calculator: READY"
);

console.log(
    "📦 Packing Assistant: READY"
);

console.log(
    "❓ FAQ Engine: READY"
);

console.log(
    "🚨 Emergency Help: READY"
);

console.log(
    "🔢 Bangla Number Converter: READY"
);

console.log(
    "🔗 joy.js compatibility layer: READY"
);