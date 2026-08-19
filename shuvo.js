// ============================================================
// WanderBangla - DATA FILE
// Version: 5.0
// Cleaned + Safer + More Consistent Data Structure
// ============================================================

/*
  IMPORTANT
  ----------
  This file keeps the original WanderBangla global structure:
    window.WanderBangla = {
      destinations,
      foods,
      cultures,
      travelTips,
      tripTemplates,
      categories,
      foodCategories,
      bangladeshRegions,
      wikiImage,
      handleImageError
    };

  Existing main.js / tools.js can continue using these names.
*/

// ============================================================
// IMAGE HELPERS
// ============================================================

const DEFAULT_IMAGE =
    "https://commons.wikimedia.org/wiki/Special:FilePath/" +
    encodeURIComponent("Bangladesh map.svg");

function wikiImage(fileName) {
    const safeName = String(fileName || "").trim();

    if (!safeName) {
        return DEFAULT_IMAGE;
    }

    return (
        "https://commons.wikimedia.org/wiki/Special:FilePath/" +
        encodeURIComponent(safeName)
    );
}

function handleImageError(img) {
    if (!img) return;

    // Prevent endless fallback loops
    if (img.dataset && img.dataset.fallbackUsed === "true") {
        return;
    }

    if (img.dataset) {
        img.dataset.fallbackUsed = "true";
    }

    img.src = DEFAULT_IMAGE;

    if (!img.alt) {
        img.alt = "WanderBangla Bangladesh map";
    }
}

// ============================================================
// DESTINATIONS
// ============================================================

const destinations = [
    {
        id: "coxsbazar",
        name: "Cox's Bazar",
        nameBn: "কক্সবাজার",
        category: ["beach", "nature"],
        region: "চট্টগ্রাম",

        shortDesc:
            "বাংলাদেশের সবচেয়ে পরিচিত দীর্ঘ সমুদ্র সৈকত ও জনপ্রিয় পর্যটন শহর।",

        description:
            "কক্সবাজার বাংলাদেশের অন্যতম জনপ্রিয় সমুদ্র পর্যটন কেন্দ্র। দীর্ঘ বালুকাবেলা, সমুদ্রের ঢেউ, সূর্যাস্ত, মেরিন ড্রাইভ, হিমছড়ি ও ইনানী বিচের জন্য জায়গাটি বিশেষভাবে পরিচিত।",

        highlights: [
            "লাবণী বিচ",
            "কলাতলী বিচ",
            "হিমছড়ি",
            "ইনানী বিচ",
            "মেরিন ড্রাইভ",
            "বার্মিজ মার্কেট"
        ],

        bestTime: "নভেম্বর – মার্চ",
        duration: "২–৪ দিন",
        budget: "৳৮,০০০ – ১৮,০০০",

        budgetBreakdown: {
            transport: "৳২,৫০০–৪,৫০০",
            stay: "৳১,৫০০–৫,০০০/রাত",
            food: "৳৮০০–১,৫০০/দিন",
            local: "৳৫০০–১,২০০"
        },

        howToGo: [
            "ঢাকা থেকে সরাসরি বাসে যাওয়া যায়।",
            "ঢাকা থেকে ফ্লাইটে কক্সবাজার যাওয়া যায়।",
            "চট্টগ্রাম হয়ে বাস বা ট্রেনেও যাওয়া যায়।"
        ],

        tips: [
            "সকালে সৈকতে গেলে তুলনামূলক কম ভিড় পাওয়া যায়।",
            "সূর্যাস্ত দেখার জন্য বিকেলে সৈকতে থাকুন।",
            "মেরিন ড্রাইভে যাওয়ার সময় নিরাপদ স্থানীয় পরিবহন ব্যবহার করুন।",
            "বার্মিজ মার্কেটে কেনাকাটার সময় দরদাম করুন।"
        ],

        safety: [
            "সমুদ্রে নামার আগে স্থানীয় সতর্কতা ও পতাকা দেখুন।",
            "রাতে নির্জন সৈকতে একা যাবেন না।",
            "মূল্যবান জিনিসপত্র নিরাপদ জায়গায় রাখুন।"
        ],

        packing: [
            "সানস্ক্রিন",
            "সানগ্লাস",
            "টুপি",
            "হালকা কাপড়",
            "পানির বোতল",
            "পাওয়ার ব্যাংক"
        ],

        nearbyStay: [
            "Sea Pearl Beach Resort",
            "Sayeman Beach Resort",
            "Laboni area budget hotels"
        ],

        image: wikiImage("Cox's_bazar_sea_beach.BD.jpg"),
        imageAlt: "Cox's Bazar Sea Beach, Bangladesh",

        lat: 21.4272,
        lng: 92.0058,

        rating: 4.7,
        reviewsCount: 2840
    },

    {
        id: "sajek",
        name: "Sajek Valley",
        nameBn: "সাজেক ভ্যালি",
        category: ["nature", "adventure", "hills"],
        region: "রাঙ্গামাটি",

        shortDesc:
            "পাহাড়, মেঘ, সূর্যোদয় এবং সবুজ প্রকৃতির জন্য বিখ্যাত।",

        description:
            "সাজেক ভ্যালি পাহাড়ি প্রকৃতি ও মেঘের দৃশ্যের জন্য বাংলাদেশের অন্যতম জনপ্রিয় ভ্রমণ গন্তব্য। রুইলুই পাড়া, কংলাক পাহাড় এবং হেলিপ্যাড এলাকার ভিউ পর্যটকদের বিশেষভাবে আকর্ষণ করে।",

        highlights: [
            "রুইলুই পাড়া",
            "কংলাক পাহাড়",
            "হেলিপ্যাড",
            "সূর্যোদয়",
            "মেঘের দৃশ্য",
            "স্থানীয় পাহাড়ি গ্রাম"
        ],

        bestTime: "অক্টোবর – মার্চ",
        duration: "২–৩ দিন",
        budget: "৳৭,০০০ – ১৪,০০০",

        budgetBreakdown: {
            transport: "৳৩,৫০০–৫,৫০০",
            stay: "৳১,২০০–৩,৫০০/রাত",
            food: "৳৬০০–১,২০০/দিন",
            local: "৳৮০০–১,৫০০"
        },

        howToGo: [
            "ঢাকা → খাগড়াছড়ি বাসে যান।",
            "খাগড়াছড়ি থেকে জীপ বা চান্দের গাড়িতে সাজেক যান।",
            "দলবদ্ধভাবে গেলে জীপ ভাড়া ভাগ করে নেওয়া সুবিধাজনক।"
        ],

        tips: [
            "সূর্যোদয় দেখতে খুব সকালে উঠুন।",
            "পাহাড়ি রাস্তার জন্য আরামদায়ক জুতা পরুন।",
            "স্থানীয় মানুষের ছবি তোলার আগে অনুমতি নিন।",
            "শীতকালে গরম কাপড় সঙ্গে রাখুন।"
        ],

        safety: [
            "পাহাড়ি রাস্তায় সতর্ক থাকুন।",
            "রাতে একা পাহাড়ি এলাকায় বের হবেন না।",
            "স্থানীয় প্রশাসন ও গাইডের নির্দেশনা অনুসরণ করুন।"
        ],

        packing: [
            "জ্যাকেট",
            "হাইকিং জুতা",
            "টর্চ",
            "পাওয়ার ব্যাংক",
            "পানির বোতল",
            "প্রয়োজনীয় ওষুধ"
        ],

        nearbyStay: [
            "Sajek resorts",
            "Ruilui cottages",
            "Local resorts"
        ],

        image: wikiImage("Sajek_Valley,_Bangladesh.jpg"),
        imageAlt: "Sajek Valley, Bangladesh",

        lat: 23.3814,
        lng: 92.2936,

        rating: 4.9,
        reviewsCount: 1920
    },

    {
        id: "sundarbans",
        name: "Sundarbans",
        nameBn: "সুন্দরবন",
        category: ["nature", "wildlife", "adventure"],
        region: "খুলনা",

        shortDesc:
            "বিশাল ম্যানগ্রোভ বনাঞ্চল ও সমৃদ্ধ বন্যপ্রাণীর আবাসস্থল।",

        description:
            "সুন্দরবন বাংলাদেশের দক্ষিণ-পশ্চিমাঞ্চলের একটি বিশাল ম্যানগ্রোভ বনাঞ্চল। নৌপথে ভ্রমণ, ম্যানগ্রোভ বন, হরিণ, কুমির এবং বিভিন্ন পাখি দেখার সুযোগের জন্য এটি বিখ্যাত।",

        highlights: [
            "করামজাল",
            "হিরণ পয়েন্ট",
            "কটকা",
            "দুবলার চর",
            "ম্যানগ্রোভ বন",
            "নৌভ্রমণ"
        ],

        bestTime: "নভেম্বর – ফেব্রুয়ারি",
        duration: "২–৩ দিন",
        budget: "৳১০,০০০ – ২২,০০০",

        budgetBreakdown: {
            transport: "৳২,০০০–৩,৫০০",
            stay: "নৌকায় রাত্রিযাপন",
            food: "ট্যুর প্যাকেজে অন্তর্ভুক্ত হতে পারে",
            local: "৳৮,০০০–১৮,০০০"
        },

        howToGo: [
            "ঢাকা → খুলনা/মংলা",
            "মংলা থেকে নৌযানে সুন্দরবন",
            "বিশ্বস্ত ট্যুর অপারেটরের প্যাকেজ ব্যবহার করা সুবিধাজনক।"
        ],

        tips: [
            "বাইনোকুলার সঙ্গে রাখুন।",
            "প্লাস্টিক বা ময়লা বনে ফেলবেন না।",
            "গাইডের নির্দেশনা অনুসরণ করুন।",
            "নৌকা থেকে অনুমতি ছাড়া নামবেন না।"
        ],

        safety: [
            "বন্যপ্রাণীর কাছে যাবেন না।",
            "লাইফ জ্যাকেট ব্যবহার করুন।",
            "বনের ভিতরে একা হাঁটবেন না।"
        ],

        packing: [
            "মশা নিরোধক",
            "বাইনোকুলার",
            "ক্যামেরা",
            "হালকা জ্যাকেট",
            "পাওয়ার ব্যাংক",
            "প্রয়োজনীয় ওষুধ"
        ],

        nearbyStay: [
            "Tour boat",
            "Mongla hotels",
            "Khulna hotels"
        ],

        image: wikiImage("Sundarban_(সুন্দরবন).jpg"),
        imageAlt: "Sundarbans mangrove forest in Bangladesh",

        lat: 22.0,
        lng: 89.5,

        rating: 4.8,
        reviewsCount: 1560
    },

    {
        id: "sylhet",
        name: "Sylhet & Srimangal",
        nameBn: "সিলেট ও শ্রীমঙ্গল",
        category: ["nature", "tea", "spiritual"],
        region: "সিলেট",

        shortDesc:
            "চা বাগান, ঝরনা, নদী ও সবুজ প্রকৃতির জন্য বিখ্যাত।",

        description:
            "সিলেট অঞ্চলে রয়েছে সবুজ চা বাগান, জাফলং, রাতারগুল, বিছানাকান্দি এবং শ্রীমঙ্গলের চা-বাগান। প্রকৃতির সঙ্গে শান্ত পরিবেশ উপভোগ করতে চাইলে এই অঞ্চল দারুণ একটি গন্তব্য।",

        highlights: [
            "শ্রীমঙ্গল",
            "জাফলং",
            "রাতারগুল",
            "বিছানাকান্দি",
            "লাউয়াছড়া",
            "চা বাগান"
        ],

        bestTime: "সেপ্টেম্বর – মার্চ",
        duration: "৩–৫ দিন",
        budget: "৳৮,০০০ – ১৬,০০০",

        budgetBreakdown: {
            transport: "৳১,৮০০–৩,৫০০",
            stay: "৳১,২০০–৪,০০০/রাত",
            food: "৳৭০০–১,৪০০/দিন",
            local: "৳১,০০০–২,০০০"
        },

        howToGo: [
            "ঢাকা থেকে ট্রেনে সিলেট যাওয়া যায়।",
            "ঢাকা থেকে বাসেও যাওয়া যায়।",
            "ঢাকা–সিলেট বিমান যোগাযোগ রয়েছে।"
        ],

        tips: [
            "চা বাগানে সকালে গেলে সুন্দর আলো পাওয়া যায়।",
            "রাতারগুলে নৌভ্রমণ করুন।",
            "বর্ষাকালে বিছানাকান্দি ও জাফলংয়ের দৃশ্য সুন্দর হয়।"
        ],

        safety: [
            "নদীতে নামার সময় সতর্ক থাকুন।",
            "সীমান্ত এলাকার নিয়ম মেনে চলুন।",
            "পাহাড়ি ও পাথুরে এলাকায় সাবধানে হাঁটুন।"
        ],

        packing: [
            "আরামদায়ক জুতা",
            "ছাতা",
            "রেইনকোট",
            "ক্যামেরা",
            "পানির বোতল"
        ],

        nearbyStay: [
            "Srimangal tea resorts",
            "Sylhet city hotels",
            "Local guest houses"
        ],

        image: wikiImage("Jaflong.jpg"),
        imageAlt: "Jaflong, Sylhet, Bangladesh",

        lat: 24.8949,
        lng: 91.8687,

        rating: 4.6,
        reviewsCount: 2100
    },

    {
        id: "bandarban",
        name: "Bandarban",
        nameBn: "বান্দরবান",
        category: ["hills", "adventure", "nature"],
        region: "চট্টগ্রাম পার্বত্য অঞ্চল",

        shortDesc:
            "পাহাড়, মেঘ, ঝরনা ও ট্রেকিংয়ের জন্য জনপ্রিয়।",

        description:
            "বান্দরবান বাংলাদেশের অন্যতম সুন্দর পাহাড়ি জেলা। নীলগিরি, নীলাচল, চিম্বুক এবং বুদ্ধ ধাতু জাদির মতো স্থানগুলো পর্যটকদের আকর্ষণ করে।",

        highlights: [
            "নীলগিরি",
            "নীলাচল",
            "চিম্বুক",
            "বুদ্ধ ধাতু জাদি",
            "সাঙ্গু নদী",
            "কেওক্রাডং"
        ],

        bestTime: "অক্টোবর – মার্চ",
        duration: "৩–৪ দিন",
        budget: "৳৯,০০০ – ১৮,০০০",

        budgetBreakdown: {
            transport: "৳৩,০০০–৫,০০০",
            stay: "৳১,৫০০–৪,০০০/রাত",
            food: "৳৭০০–১,৩০০/দিন",
            local: "৳১,৫০০–৩,০০০"
        },

        howToGo: [
            "ঢাকা থেকে সরাসরি বাস পাওয়া যায়।",
            "চট্টগ্রাম হয়ে বান্দরবান যাওয়া যায়।",
            "দূরের পাহাড়ি স্পটে জীপ প্রয়োজন হতে পারে।"
        ],

        tips: [
            "ট্রেকিং করলে অভিজ্ঞ গাইড নিন।",
            "পাহাড়ি জনগোষ্ঠীর সংস্কৃতিকে সম্মান করুন।",
            "ছবি তোলার আগে অনুমতি নিন।"
        ],

        safety: [
            "পাহাড়ি রাস্তা ও খাড়া জায়গায় সাবধান থাকুন।",
            "আবহাওয়া খারাপ হলে পাহাড়ে ওঠা এড়িয়ে চলুন।",
            "রাতে অপরিচিত পাহাড়ি পথে যাবেন না।"
        ],

        packing: [
            "হাইকিং জুতা",
            "জ্যাকেট",
            "টর্চ",
            "পানির বোতল",
            "পাওয়ার ব্যাংক"
        ],

        nearbyStay: [
            "Nilgiri Resort",
            "Bandarban town hotels",
            "Hill cottages"
        ],

        image: wikiImage("Bandarban,Chittagong,Bangladesh.JPG"),
        imageAlt: "Bandarban hills, Bangladesh",

        lat: 22.1953,
        lng: 92.2184,

        rating: 4.8,
        reviewsCount: 1340
    },

    {
        id: "kuakata",
        name: "Kuakata",
        nameBn: "কুয়াকাটা",
        category: ["beach", "nature"],
        region: "বরিশাল",

        shortDesc:
            "সূর্যোদয় ও সূর্যাস্ত দেখার জন্য পরিচিত সমুদ্র সৈকত।",

        description:
            "কুয়াকাটা পটুয়াখালী জেলার একটি জনপ্রিয় সমুদ্র সৈকত। সৈকত থেকে সূর্যোদয় ও সূর্যাস্ত দেখার সুযোগের জন্য এটি বিশেষভাবে পরিচিত।",

        highlights: [
            "কুয়াকাটা সমুদ্র সৈকত",
            "সূর্যোদয় পয়েন্ট",
            "সূর্যাস্ত পয়েন্ট",
            "গঙ্গামতির বন",
            "রাখাইন মার্কেট"
        ],

        bestTime: "নভেম্বর – ফেব্রুয়ারি",
        duration: "২–৩ দিন",
        budget: "৳৬,০০০ – ১২,০০০",

        budgetBreakdown: {
            transport: "৳২,০০০–৩,৫০০",
            stay: "৳১,০০০–৩,০০০/রাত",
            food: "৳৬০০–১,২০০/দিন",
            local: "৳৫০০–১,০০০"
        },

        howToGo: [
            "ঢাকা থেকে সরাসরি বাসে যাওয়া যায়।",
            "বরিশাল হয়ে যাওয়া যায়।",
            "লঞ্চ ও বাসের সমন্বয়েও যাওয়া যায়।"
        ],

        tips: [
            "সূর্যোদয় দেখতে ভোরে সৈকতে যান।",
            "সূর্যাস্তের সময় আবার সৈকতে ফিরে আসুন।",
            "রাখাইন মার্কেট ঘুরে দেখতে পারেন।"
        ],

        safety: [
            "সমুদ্রে নামার সময় সতর্ক থাকুন।",
            "রাতে নির্জন সৈকতে একা যাবেন না।"
        ],

        packing: [
            "সানস্ক্রিন",
            "সানগ্লাস",
            "টুপি",
            "হালকা পোশাক",
            "ক্যামেরা"
        ],

        nearbyStay: [
            "Beach-side hotels",
            "Local guest houses",
            "Kuakata resorts"
        ],

        image: wikiImage("Kuakata_Sea_Beach.JPG"),
        imageAlt: "Kuakata Sea Beach, Patuakhali, Bangladesh",

        lat: 21.8167,
        lng: 90.1167,

        rating: 4.4,
        reviewsCount: 980
    },

    {
        id: "saintmartin",
        name: "Saint Martin's Island",
        nameBn: "সেন্ট মার্টিন দ্বীপ",
        category: ["beach", "island", "nature"],
        region: "কক্সবাজার",

        shortDesc:
            "প্রবাল, নীল পানি ও নারকেল গাছের জন্য বিখ্যাত দ্বীপ।",

        description:
            "সেন্ট মার্টিন বাংলাদেশের দক্ষিণ-পূর্ব উপকূলের একটি দ্বীপ। স্বচ্ছ পানি, প্রবাল, নারকেল গাছ ও সামুদ্রিক পরিবেশের জন্য এটি বাংলাদেশের অন্যতম জনপ্রিয় দ্বীপ ভ্রমণ গন্তব্য।",

        highlights: [
            "প্রবাল বিচ",
            "নারকেল গাছ",
            "সূর্যাস্ত",
            "চেয়ার দ্বীপ",
            "স্থানীয় সীফুড"
        ],

        bestTime: "নভেম্বর – মার্চ",
        duration: "২–৩ দিন",
        budget: "৳৮,০০০ – ১৬,০০০",

        budgetBreakdown: {
            transport: "৳৪,০০০–৭,০০০",
            stay: "৳১,৫০০–৪,০০০/রাত",
            food: "৳৮০০–১,৫০০/দিন",
            local: "৳৫০০–১,০০০"
        },

        howToGo: [
            "কক্সবাজার থেকে অনুমোদিত নৌযানে যাওয়া যায়।",
            "ভ্রমণের আগে বর্তমান নৌযান ও পর্যটন নিয়ম যাচাই করুন।",
            "আগে থেকে টিকিট নিশ্চিত করা ভালো।"
        ],

        tips: [
            "দ্বীপে প্লাস্টিক ফেলে যাবেন না।",
            "জোয়ার-ভাটার সময় সম্পর্কে জানুন।",
            "স্থানীয় সামুদ্রিক খাবার উপভোগ করতে পারেন।"
        ],

        safety: [
            "আবহাওয়া খারাপ হলে নৌযাত্রা এড়িয়ে চলুন।",
            "সমুদ্রে নামার সময় সতর্ক থাকুন।"
        ],

        packing: [
            "সানস্ক্রিন",
            "সানগ্লাস",
            "হালকা পোশাক",
            "স্যান্ডেল",
            "নগদ টাকা"
        ],

        nearbyStay: [
            "Local beach cottages",
            "Island hotels",
            "Guest houses"
        ],

        image: wikiImage("Saint-martin's-island.JPG"),
        imageAlt: "Saint Martin's Island, Bangladesh",

        lat: 20.607,
        lng: 92.3222,

        rating: 4.5,
        reviewsCount: 1450
    },

    {
        id: "rangamati",
        name: "Rangamati",
        nameBn: "রাঙ্গামাটি",
        category: ["lake", "nature", "hills"],
        region: "রাঙ্গামাটি",

        shortDesc:
            "কাপ্তাই লেক, পাহাড় ও নৌভ্রমণের জন্য পরিচিত।",

        description:
            "রাঙ্গামাটি পার্বত্য চট্টগ্রামের একটি সুন্দর জেলা। কাপ্তাই লেক, ঝুলন্ত সেতু, শুভলং ঝরনা এবং পাহাড়ি প্রকৃতির জন্য এটি জনপ্রিয়।",

        highlights: [
            "কাপ্তাই লেক",
            "ঝুলন্ত সেতু",
            "শুভলং ঝরনা",
            "রাজবন বিহার",
            "উপজাতীয় জাদুঘর"
        ],

        bestTime: "অক্টোবর – মার্চ",
        duration: "২–৩ দিন",
        budget: "৳৬,৫০০ – ১৩,০০০",

        budgetBreakdown: {
            transport: "৳২,৫০০–৪,০০০",
            stay: "৳১,২০০–৩,৫০০/রাত",
            food: "৳৬০০–১,২০০/দিন",
            local: "৳৮০০–১,৮০০"
        },

        howToGo: [
            "ঢাকা থেকে বাসে যাওয়া যায়।",
            "চট্টগ্রাম হয়ে যাওয়া যায়।",
            "কাপ্তাই লেকে স্থানীয় নৌকা ভাড়া করা যায়।"
        ],

        tips: [
            "কাপ্তাই লেকে নৌভ্রমণ করুন।",
            "বর্ষায় শুভলং ঝরনা দেখতে পারেন।",
            "পাহাড়ি সংস্কৃতিকে সম্মান করুন।"
        ],

        safety: [
            "নৌকায় লাইফ জ্যাকেট ব্যবহার করুন।",
            "পাহাড়ি রাস্তায় সাবধানে চলুন।"
        ],

        packing: [
            "সানস্ক্রিন",
            "ক্যামেরা",
            "পানির বোতল",
            "আরামদায়ক জুতা"
        ],

        nearbyStay: [
            "Lake-side resorts",
            "Rangamati hotels",
            "Local guest houses"
        ],

        image: wikiImage("Rangamati_Kaptai_Lakes.JPG"),
        imageAlt: "Kaptai Lake, Rangamati, Bangladesh",

        lat: 22.7324,
        lng: 92.2988,

        rating: 4.5,
        reviewsCount: 870
    },

    {
        id: "jaflong",
        name: "Jaflong",
        nameBn: "জাফলং",
        category: ["nature", "river"],
        region: "সিলেট",

        shortDesc:
            "পাহাড়, নদী, পাথর ও স্বচ্ছ পানির জন্য বিখ্যাত।",

        description:
            "জাফলং সিলেটের গোয়াইনঘাট অঞ্চলের একটি জনপ্রিয় পর্যটন স্থান। পাহাড়, নদী, পাথর ও সীমান্তবর্তী প্রাকৃতিক দৃশ্যের জন্য এটি পরিচিত।",

        highlights: [
            "দাউকি নদী",
            "পিয়াইন নদী",
            "জিরো পয়েন্ট",
            "পাথর",
            "পাহাড়ি দৃশ্য"
        ],

        bestTime: "অক্টোবর – মার্চ",
        duration: "১–২ দিন",
        budget: "৳৪,০০০ – ৮,০০০",

        budgetBreakdown: {
            transport: "৳২,০০০–৩,৫০০",
            stay: "৳১,০০০–২,৫০০/রাত",
            food: "৳৫০০–১,০০০/দিন",
            local: "৳৪০০–৮০০"
        },

        howToGo: [
            "সিলেট শহর থেকে বাস বা সিএনজি ব্যবহার করা যায়।",
            "দিনের জন্য গাড়ি ভাড়া করেও ঘোরা যায়।"
        ],

        tips: [
            "বর্ষায় নদীর দৃশ্য আলাদা সুন্দর হয়।",
            "সীমান্ত এলাকার নির্দেশনা মেনে চলুন।"
        ],

        safety: [
            "নদীতে নামার আগে পানির অবস্থা বুঝুন।",
            "সীমান্তের কাছে নির্ধারিত এলাকার বাইরে যাবেন না।"
        ],

        packing: [
            "আরামদায়ক জুতা",
            "ছাতা",
            "পানির বোতল",
            "ক্যামেরা"
        ],

        nearbyStay: [
            "Sylhet city hotels",
            "Jaflong local hotels",
            "Guest houses"
        ],

        image: wikiImage("Jaflong.jpg"),
        imageAlt: "Jaflong, Sylhet, Bangladesh",

        lat: 25.175,
        lng: 92.017,

        rating: 4.3,
        reviewsCount: 720
    },

    {
        id: "sonargaon",
        name: "Sonargaon",
        nameBn: "সোনারগাঁও",
        category: ["historical", "cultural"],
        region: "নারায়ণগঞ্জ",

        shortDesc:
            "বাংলার ঐতিহাসিক নগরী ও পানাম নগরের জন্য পরিচিত।",

        description:
            "সোনারগাঁও বাংলাদেশের গুরুত্বপূর্ণ ঐতিহাসিক অঞ্চল। পানাম নগর, লোকশিল্প জাদুঘর এবং পুরনো স্থাপনার জন্য এটি ইতিহাস ও সংস্কৃতিপ্রেমীদের কাছে আকর্ষণীয়।",

        highlights: [
            "পানাম নগর",
            "লোকশিল্প জাদুঘর",
            "বড় সর্দার বাড়ি",
            "গোয়ালদি মসজিদ"
        ],

        bestTime: "অক্টোবর – মার্চ",
        duration: "১ দিন",
        budget: "৳১,৫০০ – ৩,৫০০",

        budgetBreakdown: {
            transport: "৳২০০–৬০০",
            stay: "ডে ট্রিপ",
            food: "৳৪০০–৮০০",
            local: "৳২০০–৫০০"
        },

        howToGo: [
            "ঢাকা থেকে বাসে যাওয়া যায়।",
            "প্রাইভেট কার বা রাইড শেয়ারিং ব্যবহার করা যায়।"
        ],

        tips: [
            "সকালবেলা গেলে গরম কম থাকে।",
            "পুরনো ভবনে সাবধানে হাঁটুন।",
            "ঐতিহাসিক স্থাপনার দেয়ালে কিছু লিখবেন না।"
        ],

        safety: [
            "পুরনো ভবনের দুর্বল অংশে উঠবেন না।",
            "ঐতিহাসিক স্থাপনা স্পর্শ বা ক্ষতি করবেন না।"
        ],

        packing: [
            "পানির বোতল",
            "টুপি",
            "ক্যামেরা",
            "আরামদায়ক জুতা"
        ],

        nearbyStay: [
            "ঢাকা থেকে Day Trip"
        ],

        image: wikiImage("Panam_city1, Sonargaon, Bangladesh.jpg"),
        imageAlt: "Panam City, Sonargaon, Bangladesh",

        lat: 23.65,
        lng: 90.6,

        rating: 4.3,
        reviewsCount: 640
    },

    // ==========================================================
    // NEW DESTINATIONS
    // ==========================================================

    {
        id: "tanguarhaor",
        name: "Tanguar Haor",
        nameBn: "টাঙ্গুয়ার হাওর",
        category: ["nature", "wildlife", "lake"],
        region: "সুনামগঞ্জ",

        shortDesc:
            "বিশাল জলাভূমি, পাখি ও প্রাকৃতিক সৌন্দর্যের জন্য পরিচিত।",

        description:
            "টাঙ্গুয়ার হাওর সুনামগঞ্জের একটি গুরুত্বপূর্ণ জলাভূমি। শীতকালে পরিযায়ী পাখি দেখার জন্য এটি বিশেষভাবে জনপ্রিয়। নৌকায় ঘুরে হাওরের সৌন্দর্য উপভোগ করা যায়।",

        highlights: [
            "পরিযায়ী পাখি",
            "নৌভ্রমণ",
            "সূর্যোদয় ও সূর্যাস্ত",
            "স্থানীয় গ্রাম"
        ],

        bestTime: "নভেম্বর – ফেব্রুয়ারি",
        duration: "২ দিন",
        budget: "৳৫,০০০ – ১০,০০০",

        budgetBreakdown: {
            transport: "৳২,০০০–৩,৫০০",
            stay: "৳১,০০০–২,৫০০/রাত",
            food: "৳৬০০–১,২০০/দিন",
            local: "৳৮০০–১,৫০০"
        },

        howToGo: [
            "ঢাকা থেকে সুনামগঞ্জ বাসে যান।",
            "সুনামগঞ্জ থেকে স্থানীয় পরিবহনে হাওরে যান।"
        ],

        tips: [
            "পাখি দেখার জন্য বাইনোকুলার নিন।",
            "স্থানীয় গাইডের সাথে ঘুরলে ভালো।"
        ],

        safety: [
            "নৌকায় লাইফ জ্যাকেট ব্যবহার করুন।",
            "গভীর পানিতে সতর্ক থাকুন।"
        ],

        packing: [
            "মশা নিরোধক",
            "বাইনোকুলার",
            "হালকা জ্যাকেট",
            "ক্যামেরা",
            "পানির বোতল"
        ],

        nearbyStay: [
            "Local guest houses",
            "Sunamganj hotels"
        ],

        image: wikiImage("Tanguar_Haor.jpg"),
        imageAlt: "Tanguar Haor, Sunamganj",

        lat: 25.15,
        lng: 91.15,

        rating: 4.4,
        reviewsCount: 510
    },

    {
        id: "sreemangal",
        name: "Sreemangal",
        nameBn: "শ্রীমঙ্গল",
        category: ["tea", "nature"],
        region: "সিলেট",

        shortDesc:
            "চা বাগান ও চায়ের জন্য বিখ্যাত।",

        description:
            "শ্রীমঙ্গল বাংলাদেশের অন্যতম পরিচিত চা-বাগান অঞ্চল। সবুজ চা বাগান, লাউয়াছড়া জাতীয় উদ্যান এবং স্থানীয় চা সংস্কৃতির জন্য এটি জনপ্রিয়।",

        highlights: [
            "চা বাগান",
            "লাউয়াছড়া",
            "চা",
            "মাধবপুর লেক"
        ],

        bestTime: "অক্টোবর – মার্চ",
        duration: "২–৩ দিন",
        budget: "৳৬,০০০ – ১২,০০০",

        budgetBreakdown: {
            transport: "৳১,৮০০–৩,০০০",
            stay: "৳১,২০০–৩,৫০০/রাত",
            food: "৳৭০০–১,৩০০/দিন",
            local: "৳৮০০–১,৫০০"
        },

        howToGo: [
            "ঢাকা থেকে ট্রেন বা বাসে শ্রীমঙ্গল যাওয়া যায়।",
            "শ্রীমঙ্গল স্টেশন থেকে স্থানীয় পরিবহনে ঘোরা যায়।"
        ],

        tips: [
            "সকালে চা বাগানে গেলে আলো সুন্দর হয়।",
            "স্থানীয় চা অবশ্যই ট্রাই করুন।"
        ],

        safety: [
            "জঙ্গলে গাইডের সাথে থাকুন।",
            "বন্যপ্রাণীর কাছে যাবেন না।"
        ],

        packing: [
            "আরামদায়ক জুতা",
            "ক্যামেরা",
            "পানির বোতল",
            "হালকা কাপড়"
        ],

        nearbyStay: [
            "Tea resort",
            "Sreemangal hotels"
        ],

        image: wikiImage("Sreemangal_Tea_Garden.jpg"),
        imageAlt: "Sreemangal Tea Garden",

        lat: 24.3065,
        lng: 91.7296,

        rating: 4.6,
        reviewsCount: 1180
    }
];

// ============================================================
// FOODS
// ============================================================

const foods = [
    {
        id: "kacchi",
        name: "Kacchi Biryani",
        nameBn: "কাচ্চি বিরিয়ানি",
        category: "main",
        region: "ঢাকা",

        description:
            "সুগন্ধি চাল, মাংস, আলু ও বিশেষ মসলায় রান্না করা বাংলাদেশের অন্যতম জনপ্রিয় খাবার।",

        mustTry: "কাচ্চি বিরিয়ানি + বোরহানি",
        priceRange: "৳২৫০ – ৫০০",

        image: wikiImage("Kacchi_Biryani.jpg"),
        imageAlt: "Kacchi Biryani, Bangladesh",

        rating: 4.9
    },

    {
        id: "hilsa",
        name: "Hilsa",
        nameBn: "ইলিশ",
        category: "main",
        region: "পদ্মা / মেঘনা",

        description:
            "ইলিশ বাংলাদেশের জাতীয় মাছ এবং বাঙালি খাবারের একটি গুরুত্বপূর্ণ অংশ।",

        mustTry: "সরিষা ইলিশ",
        priceRange: "৳৮০০ – ২,৫০০",

        image: wikiImage("Hilsa_Fish_in_Dhaka.jpg"),
        imageAlt: "Hilsa fish in Bangladesh",

        rating: 4.8
    },

    {
        id: "fuchka",
        name: "Fuchka",
        nameBn: "ফুচকা",
        category: "street",
        region: "সারা বাংলাদেশ",

        description:
            "মচমচে পুরি, আলু, মসলা, টক পানি ও বিভিন্ন উপকরণের মিশ্রণে তৈরি জনপ্রিয় বাংলাদেশি স্ট্রিট ফুড।",

        mustTry: "ফুচকা + চটপটি",
        priceRange: "৳৩০ – ১০০",

        image: wikiImage(
            "Fuchka_from_Polli_food_village_Savar_Bangladesh.jpg"
        ),
        imageAlt: "Fuchka street food in Bangladesh",

        rating: 4.7
    },

    {
        id: "bhapa-pitha",
        name: "Bhapa Pitha",
        nameBn: "ভাপা পিঠা",
        category: "dessert",
        region: "সারা বাংলাদেশ",

        description:
            "চালের গুঁড়া, নারকেল ও খেজুরের গুড় দিয়ে তৈরি ঐতিহ্যবাহী বাঙালি পিঠা। শীতকালে এটি বিশেষভাবে জনপ্রিয়।",

        mustTry: "গরম ভাপা পিঠা + খেজুরের গুড়",
        priceRange: "৳২০ – ৫০",

        image: wikiImage("Bhapa_Pitha.jpg"),
        imageAlt: "Bhapa Pitha, Bangladesh",

        rating: 4.8
    },

    {
        id: "chingri-malai",
        name: "Chingri Malai Curry",
        nameBn: "চিংড়ি মালাই কারি",
        category: "main",
        region: "বাংলার উপকূলীয় অঞ্চল",

        description:
            "চিংড়ি, নারকেলের দুধ ও বিভিন্ন মসলায় রান্না করা জনপ্রিয় বাঙালি খাবার।",

        mustTry: "গোলদা চিংড়ির মালাই কারি + সাদা ভাত",
        priceRange: "৳৪০০ – ৯০০",

        image: wikiImage("Chingri_Malai_Curry.jpg"),
        imageAlt: "Chingri Malai Curry",

        rating: 4.7
    },

    {
        id: "mezban",
        name: "Mezban Beef",
        nameBn: "মেজবানি গরু",
        category: "main",
        region: "চট্টগ্রাম",

        description:
            "চট্টগ্রামের ঐতিহ্যবাহী মেজবান ভোজে বিশেষ মসলায় রান্না করা গরুর মাংস পরিবেশন করা হয়।",

        mustTry: "মেজবানি গরু + সাদা ভাত",
        priceRange: "৳৩০০ – ৬০০",

        image: wikiImage("Mejban_Beef_and_Rice-Chittagong.jpg"),
        imageAlt: "Mezban beef and rice from Chittagong",

        rating: 4.8
    },

    {
        id: "tehari",
        name: "Beef Tehari",
        nameBn: "বিফ তেহারি",
        category: "main",
        region: "পুরান ঢাকা",

        description:
            "সুগন্ধি চাল, গরুর মাংস ও মসলায় রান্না করা ঢাকার জনপ্রিয় ঐতিহ্যবাহী খাবার।",

        mustTry: "পুরান ঢাকার বিফ তেহারি",
        priceRange: "৳২২০ – ৪০০",

        image: wikiImage("Tehari.jpg"),
        imageAlt: "Beef Tehari, Bangladesh",

        rating: 4.7
    },

    {
        id: "mishti-doi",
        name: "Mishti Doi",
        nameBn: "মিষ্টি দই",
        category: "dessert",
        region: "বগুড়া / বাংলাদেশ",

        description:
            "দুধ ও চিনি দিয়ে তৈরি মিষ্টি দই সাধারণত মাটির হাঁড়িতে জমিয়ে পরিবেশন করা হয়।",

        mustTry: "মাটির হাঁড়ির মিষ্টি দই",
        priceRange: "৳৫০ – ১৫০",

        image: wikiImage("Mishti_doi_01.png"),
        imageAlt: "Mishti Doi, Bengali sweet yogurt",

        rating: 4.6
    },

    {
        id: "panta-bhat",
        name: "Panta Bhat",
        nameBn: "পান্তা ভাত",
        category: "traditional",
        region: "সারা বাংলাদেশ",

        description:
            "পানিতে ভিজিয়ে রাখা ভাতের সঙ্গে লবণ, মরিচ, পেঁয়াজ, শুঁটকি বা অন্যান্য ভর্তা পরিবেশন করা হয়।",

        mustTry: "পান্তা ভাত + ইলিশ ভাজা + ভর্তা",
        priceRange: "৳৮০ – ৩০০",

        image: wikiImage("Panta_Bhat.jpg"),
        imageAlt: "Panta Bhat, Bangladesh",

        rating: 4.5
    },

    {
        id: "chitai-pitha",
        name: "Chitai Pitha",
        nameBn: "চিতই পিঠা",
        category: "traditional",
        region: "বাংলাদেশ",

        description:
            "চালের গুঁড়া দিয়ে তৈরি গোলাকার নরম পিঠা। ভর্তা, ভাজি অথবা ঝাল তরকারির সঙ্গে খাওয়া হয়।",

        mustTry: "চিতই পিঠা + ভর্তা",
        priceRange: "৳৩০ – ১০০",

        image: wikiImage("Chitai_Pitha.jpg"),
        imageAlt: "Chitai Pitha",

        rating: 4.6
    },

    {
        id: "shutki",
        name: "Shutki Bhuna",
        nameBn: "শুঁটকি ভুনা",
        category: "main",
        region: "চট্টগ্রাম / উপকূল",

        description:
            "শুকনো মাছের ঝাল ভুনা। চট্টগ্রাম ও উপকূলীয় এলাকার জনপ্রিয় খাবার।",

        mustTry: "ইলিশ শুঁটকি বা চিংড়ি শুঁটকি ভুনা",
        priceRange: "৳২০০ – ৫০০",

        image: wikiImage("Shutki.jpg"),
        imageAlt: "Shutki Bhuna",

        rating: 4.4
    },

    {
        id: "vuna-khichuri",
        name: "Vuna Khichuri",
        nameBn: "ভুনা খিচুড়ি",
        category: "main",
        region: "সারা বাংলাদেশ",

        description:
            "মসলায় রান্না করা খিচুড়ি, সাধারণত মাংস বা ডিম দিয়ে পরিবেশন করা হয়।",

        mustTry: "গরুর মাংসের ভুনা খিচুড়ি",
        priceRange: "৳১৫০ – ৩৫০",

        image: wikiImage("Khichuri.jpg"),
        imageAlt: "Vuna Khichuri",

        rating: 4.5
    }
];

// ============================================================
// CULTURE
// ============================================================

const cultures = [
    {
        id: "pohela-boishakh",
        name: "Pohela Boishakh",
        nameBn: "পহেলা বৈশাখ",
        type: "উৎসব",

        description:
            "বাংলা নববর্ষ উপলক্ষে বাংলাদেশজুড়ে বিভিন্ন সাংস্কৃতিক অনুষ্ঠান, মেলা ও শোভাযাত্রা আয়োজন করা হয়।",

        image: wikiImage("Pohela_Boishakh.jpg"),
        imageAlt: "Pohela Boishakh celebration in Bangladesh"
    },

    {
        id: "nakshi-kantha",
        name: "Nakshi Kantha",
        nameBn: "নকশি কাঁথা",
        type: "হস্তশিল্প",

        description:
            "সেলাই ও সূচিকর্মের মাধ্যমে কাপড়ের উপর বিভিন্ন নকশা তৈরি করা বাংলাদেশের ঐতিহ্যবাহী হস্তশিল্প।",

        image: wikiImage("Nakshi_Kantha_of_Bangla.png"),
        imageAlt: "Nakshi Kantha"
    },

    {
        id: "baul",
        name: "Baul Music",
        nameBn: "বাউল সংগীত",
        type: "সংগীত",

        description:
            "বাউল সংগীত বাংলার লোকসংস্কৃতির একটি গুরুত্বপূর্ণ অংশ। মানবতা, আত্মঅনুসন্ধান ও আধ্যাত্মিকতার বিভিন্ন বিষয় এই সংগীতে প্রকাশ পায়।",

        image: wikiImage("Baul_of_Bengal.jpg"),
        imageAlt: "Baul musician of Bengal"
    },

    {
        id: "jamdani",
        name: "Jamdani",
        nameBn: "জামদানি শাড়ি",
        type: "বস্ত্র",

        description:
            "সূক্ষ্ম তাঁত ও জটিল নকশার জন্য জামদানি বাংলাদেশের বিশেষ ঐতিহ্যবাহী বস্ত্র।",

        image: wikiImage("Jamdani_Art.png"),
        imageAlt: "Jamdani textile"
    },

    {
        id: "rickshaw-art",
        name: "Rickshaw Art",
        nameBn: "রিকশা আর্ট",
        type: "শিল্প",

        description:
            "রঙিন হাতে আঁকা নকশা বাংলাদেশের রিকশাকে একটি বিশেষ লোকশিল্পের রূপ দিয়েছে।",

        image: wikiImage("Rickshaw_Art.jpg"),
        imageAlt: "Bangladeshi Rickshaw Art"
    },

    {
        id: "boat-race",
        name: "Nouka Baich",
        nameBn: "নৌকা বাইচ",
        type: "খেলা / উৎসব",

        description:
            "বর্ষাকালে নদীতে লম্বা নৌকা নিয়ে দলগতভাবে প্রতিযোগিতা করার ঐতিহ্যবাহী আয়োজন।",

        image: wikiImage(
            "Nouka_Baich_(Boat_Race)_(9903944955).jpg"
        ),
        imageAlt: "Nouka Baich boat race in Bangladesh"
    },

    {
        id: "nabanna",
        name: "Nabanna",
        nameBn: "নবান্ন",
        type: "উৎসব",

        description:
            "নতুন ধান কাটার আনন্দে পালিত ঐতিহ্যবাহী উৎসব। পিঠা-পুলি ও মিষ্টান্ন দিয়ে উদযাপন করা হয়।",

        image: wikiImage("Nabanna.jpg"),
        imageAlt: "Nabanna festival"
    }
];

// ============================================================
// TRAVEL TIPS
// ============================================================

const travelTips = [
    {
        icon: "🚌",
        title: "পরিবহন",
        points: [
            "দূরের ভ্রমণে বাস বা ট্রেনের সময়সূচি আগে দেখে নিন।",
            "পাহাড়ি এলাকায় জীপ বা স্থানীয় পরিবহন ব্যবহার করুন।",
            "শহরের মধ্যে রাইড শেয়ারিং ব্যবহার করা সুবিধাজনক।",
            "রাতের যাত্রার আগে টিকিট নিশ্চিত করুন।"
        ]
    },

    {
        icon: "💰",
        title: "বাজেট",
        points: [
            "উইকডেতে ভ্রমণ করলে অনেক সময় খরচ কম হতে পারে।",
            "লোকাল খাবার তুলনামূলক সাশ্রয়ী।",
            "সিজনের সময় আগে হোটেল বুক করুন।",
            "দলবদ্ধভাবে গেলে গাড়ি ভাড়া ভাগ করা যায়।"
        ]
    },

    {
        icon: "🛡️",
        title: "নিরাপত্তা",
        points: [
            "মূল্যবান জিনিসপত্র নিরাপদ জায়গায় রাখুন।",
            "রাতে নির্জন এলাকায় একা যাবেন না।",
            "নদী বা সমুদ্রে নামার আগে স্থানীয় সতর্কতা দেখুন।",
            "স্থানীয় প্রশাসনের নির্দেশনা মেনে চলুন।"
        ]
    },

    {
        icon: "📱",
        title: "যোগাযোগ",
        points: [
            "পাহাড়ি ও দূরবর্তী এলাকায় মোবাইল নেটওয়ার্ক দুর্বল হতে পারে।",
            "Offline map আগে ডাউনলোড করে রাখুন।",
            "Power bank সঙ্গে রাখুন।",
            "জরুরি নম্বর ৯৯৯ সংরক্ষণ করুন।"
        ]
    },

    {
        icon: "🌧️",
        title: "আবহাওয়া",
        points: [
            "শীতকাল অনেক গন্তব্যের জন্য আরামদায়ক।",
            "বর্ষায় জলপ্রপাত ও নদীর সৌন্দর্য বাড়ে।",
            "বর্ষায় পাহাড়ি রাস্তায় অতিরিক্ত সতর্ক থাকুন।",
            "ভ্রমণের আগে আবহাওয়ার পূর্বাভাস দেখে নিন।"
        ]
    },

    {
        icon: "🤝",
        title: "স্থানীয় সংস্কৃতি",
        points: [
            "স্থানীয় মানুষের ছবি তোলার আগে অনুমতি নিন।",
            "ধর্মীয় স্থানে উপযুক্ত পোশাক পরুন।",
            "স্থানীয় নিয়ম ও সংস্কৃতিকে সম্মান করুন।",
            "প্রাকৃতিক জায়গায় ময়লা ফেলবেন না।"
        ]
    }
];

// ============================================================
// TRIP TEMPLATES
// ============================================================

const tripTemplates = {
    coxsbazar: {
        2: [
            {
                day: 1,
                title: "লাবণী, হিমছড়ি ও সূর্যাস্ত",
                items: [
                    {
                        time: "সকাল",
                        activity: "লাবণী বিচে হাঁটা ও সমুদ্র দেখা",
                        place: "Laboni Beach",
                        note: "সকালে তুলনামূলক কম ভিড় থাকে।"
                    },
                    {
                        time: "দুপুর",
                        activity: "স্থানীয় সীফুড লাঞ্চ",
                        place: "Beach Road",
                        note: "স্থানীয় রেস্টুরেন্ট বেছে নিন।"
                    },
                    {
                        time: "বিকাল",
                        activity: "হিমছড়ি ভ্রমণ",
                        place: "Himchari",
                        note: "ভিউ পয়েন্ট ঘুরে দেখুন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "সূর্যাস্ত ও বাজার",
                        place: "Beach Road / Burmese Market",
                        note: "কেনাকাটায় দরদাম করুন।"
                    }
                ]
            },

            {
                day: 2,
                title: "ইনানী ও মেরিন ড্রাইভ",
                items: [
                    {
                        time: "সকাল",
                        activity: "ইনানী বিচ ভ্রমণ",
                        place: "Inani Beach",
                        note: "সকালের আলোতে ছবি তুলুন।"
                    },
                    {
                        time: "দুপুর",
                        activity: "মেরিন ড্রাইভ",
                        place: "Marine Drive",
                        note: "নিরাপদ যানবাহন ব্যবহার করুন।"
                    },
                    {
                        time: "বিকাল",
                        activity: "হোটেলে ফিরে বিশ্রাম",
                        place: "Hotel",
                        note: "ফিরতি যাত্রার প্রস্তুতি নিন।"
                    }
                ]
            }
        ],

        3: [
            {
                day: 1,
                title: "আগমন ও লাবণী বিচ",
                items: [
                    {
                        time: "সকাল",
                        activity: "হোটেলে চেক-ইন",
                        place: "Cox's Bazar",
                        note: "সৈকতের কাছাকাছি থাকলে সুবিধা।"
                    },
                    {
                        time: "বিকাল",
                        activity: "লাবণী বিচ",
                        place: "Laboni Beach",
                        note: "সমুদ্রের পাশে হাঁটুন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "সূর্যাস্ত ও স্ট্রিট ফুড",
                        place: "Beach Road",
                        note: "ফুচকা বা চটপটি ট্রাই করতে পারেন।"
                    }
                ]
            },

            {
                day: 2,
                title: "হিমছড়ি ও ইনানী",
                items: [
                    {
                        time: "সকাল",
                        activity: "হিমছড়ি ভ্রমণ",
                        place: "Himchari",
                        note: "সকালে গেলে ভালো।"
                    },
                    {
                        time: "দুপুর",
                        activity: "ইনানী বিচ",
                        place: "Inani Beach",
                        note: "সমুদ্রের অবস্থা দেখে পানিতে নামুন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "বার্মিজ মার্কেট",
                        place: "Burmese Market",
                        note: "স্থানীয় পণ্য দেখতে পারেন।"
                    }
                ]
            },

            {
                day: 3,
                title: "মেরিন ড্রাইভ ও ফেরা",
                items: [
                    {
                        time: "সকাল",
                        activity: "মেরিন ড্রাইভ",
                        place: "Marine Drive",
                        note: "ভ্রমণের সময় হাতে রাখুন।"
                    },
                    {
                        time: "দুপুর",
                        activity: "লাঞ্চ ও প্যাকিং",
                        place: "Hotel",
                        note: "চেক-আউটের আগে সব জিনিস দেখুন।"
                    },
                    {
                        time: "বিকাল",
                        activity: "ফিরতি যাত্রা",
                        place: "Bus / Airport",
                        note: "আগে থেকে টিকিট নিশ্চিত করুন।"
                    }
                ]
            }
        ]
    },

    sajek: {
        2: [
            {
                day: 1,
                title: "খাগড়াছড়ি থেকে সাজেক",
                items: [
                    {
                        time: "সকাল",
                        activity: "খাগড়াছড়ি থেকে সাজেক যাত্রা",
                        place: "Khagrachhari → Sajek",
                        note: "জীপ/চান্দের গাড়ি ব্যবহার করুন।"
                    },
                    {
                        time: "বিকাল",
                        activity: "রুইলুই পাড়া ঘোরা",
                        place: "Ruilui Para",
                        note: "চেক-ইন করে বিশ্রাম নিন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "মেঘ ও সূর্যাস্ত দেখা",
                        place: "Helipad",
                        note: "আবহাওয়া পরিষ্কার থাকলে সুন্দর ভিউ পাওয়া যায়।"
                    }
                ]
            },

            {
                day: 2,
                title: "সূর্যোদয় ও প্রস্থান",
                items: [
                    {
                        time: "ভোর",
                        activity: "সূর্যোদয় দেখা",
                        place: "Konglak / View Point",
                        note: "ভোরে বের হন।"
                    },
                    {
                        time: "সকাল",
                        activity: "স্থানীয় এলাকা ঘোরা",
                        place: "Local Para",
                        note: "স্থানীয় সংস্কৃতিকে সম্মান করুন।"
                    },
                    {
                        time: "দুপুর",
                        activity: "খাগড়াছড়ির দিকে ফেরা",
                        place: "Sajek Road",
                        note: "ফিরতি সময় আগে হিসাব করুন।"
                    }
                ]
            }
        ],

        3: [
            {
                day: 1,
                title: "আগমন",
                items: [
                    {
                        time: "সকাল–বিকাল",
                        activity: "সাজেক যাত্রা ও চেক-ইন",
                        place: "Sajek",
                        note: "পাহাড়ি রাস্তার জন্য প্রস্তুত থাকুন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "মেঘ ও সূর্যাস্ত",
                        place: "Helipad",
                        note: "আবহাওয়ার উপর নির্ভরশীল।"
                    }
                ]
            },

            {
                day: 2,
                title: "সাজেক এক্সপ্লোর",
                items: [
                    {
                        time: "ভোর",
                        activity: "সূর্যোদয়",
                        place: "Konglak",
                        note: "খুব সকালে উঠুন।"
                    },
                    {
                        time: "সকাল–বিকাল",
                        activity: "রুইলুই ও আশপাশ ঘোরা",
                        place: "Ruilui Para",
                        note: "হাঁটার জন্য প্রস্তুত থাকুন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "স্থানীয় খাবার",
                        place: "Local Restaurant",
                        note: "স্থানীয় খাবার ট্রাই করুন।"
                    }
                ]
            },

            {
                day: 3,
                title: "শেষ ভিউ ও প্রস্থান",
                items: [
                    {
                        time: "সকাল",
                        activity: "শেষবার পাহাড়ের ভিউ",
                        place: "Sajek",
                        note: "প্যাকিং শেষ করুন।"
                    },
                    {
                        time: "দুপুর",
                        activity: "সাজেক থেকে নামা",
                        place: "Sajek Road",
                        note: "জীপের সময় আগে নিশ্চিত করুন।"
                    }
                ]
            }
        ]
    },

    sundarbans: {
        2: [
            {
                day: 1,
                title: "নৌযাত্রা শুরু",
                items: [
                    {
                        time: "সকাল",
                        activity: "নৌকায় যাত্রা শুরু",
                        place: "Mongla / Jetty",
                        note: "ট্যুর প্যাকেজ অনুযায়ী সময় পরিবর্তিত হতে পারে।"
                    },
                    {
                        time: "দুপুর",
                        activity: "করামজাল ভ্রমণ",
                        place: "Karamjal",
                        note: "ম্যানগ্রোভ ও বন্যপ্রাণী পর্যবেক্ষণ করুন।"
                    },
                    {
                        time: "রাত",
                        activity: "নৌকায় রাত্রিযাপন",
                        place: "Tour Boat",
                        note: "নিরাপত্তা নির্দেশনা মেনে চলুন।"
                    }
                ]
            },

            {
                day: 2,
                title: "গভীর বন ও ফেরা",
                items: [
                    {
                        time: "সকাল",
                        activity: "হিরণ পয়েন্ট / কটকা",
                        place: "Sundarbans",
                        note: "বন্যপ্রাণী দেখার সম্ভাবনা রয়েছে।"
                    },
                    {
                        time: "দুপুর",
                        activity: "ফিরতি নৌযাত্রা",
                        place: "Canal",
                        note: "ম্যানগ্রোভ দৃশ্য উপভোগ করুন।"
                    }
                ]
            }
        ],

        3: [
            {
                day: 1,
                title: "সুন্দরবনে প্রবেশ",
                items: [
                    {
                        time: "সকাল",
                        activity: "মংলা থেকে নৌযাত্রা",
                        place: "Mongla",
                        note: "প্যাকেজ অনুযায়ী।"
                    },
                    {
                        time: "বিকাল",
                        activity: "করামজাল",
                        place: "Karamjal",
                        note: "ম্যানগ্রোভ এলাকা দেখুন।"
                    },
                    {
                        time: "রাত",
                        activity: "নৌকায় রাত",
                        place: "Tour Boat",
                        note: ""
                    }
                ]
            },

            {
                day: 2,
                title: "গভীর বন",
                items: [
                    {
                        time: "সকাল–বিকাল",
                        activity: "হিরণ পয়েন্ট ও কটকা",
                        place: "Sundarbans Core Area",
                        note: "সবসময় গাইডের সঙ্গে থাকুন।"
                    },
                    {
                        time: "রাত",
                        activity: "নৌকায় রাত",
                        place: "Tour Boat",
                        note: ""
                    }
                ]
            },

            {
                day: 3,
                title: "ফেরার দিন",
                items: [
                    {
                        time: "সকাল",
                        activity: "দুবলার চর",
                        place: "Dublar Char",
                        note: "রুট ও সিজনের উপর নির্ভরশীল।"
                    },
                    {
                        time: "বিকাল",
                        activity: "মংলায় ফেরা",
                        place: "Mongla Jetty",
                        note: ""
                    }
                ]
            }
        ]
    },

    default: {
        2: [
            {
                day: 1,
                title: "আগমন ও প্রধান আকর্ষণ",
                items: [
                    {
                        time: "সকাল",
                        activity: "গন্তব্যে পৌঁছে চেক-ইন",
                        place: "Hotel",
                        note: ""
                    },
                    {
                        time: "দুপুর",
                        activity: "প্রধান দর্শনীয় স্থান",
                        place: "Main Attraction",
                        note: ""
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "স্থানীয় খাবার",
                        place: "Local Restaurant",
                        note: ""
                    }
                ]
            },

            {
                day: 2,
                title: "আরও ঘোরাঘুরি ও প্রস্থান",
                items: [
                    {
                        time: "সকাল",
                        activity: "বাকি দর্শনীয় স্থান",
                        place: "Secondary Attractions",
                        note: ""
                    },
                    {
                        time: "দুপুর",
                        activity: "কেনাকাটা",
                        place: "Local Market",
                        note: ""
                    },
                    {
                        time: "বিকাল",
                        activity: "ফিরতি যাত্রা",
                        place: "Transport",
                        note: ""
                    }
                ]
            }
        ],

        3: [
            {
                day: 1,
                title: "আগমন",
                items: [
                    {
                        time: "সকাল",
                        activity: "চেক-ইন ও বিশ্রাম",
                        place: "Hotel",
                        note: ""
                    },
                    {
                        time: "বিকাল",
                        activity: "কাছের আকর্ষণ",
                        place: "Nearby Attraction",
                        note: ""
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "স্থানীয় খাবার",
                        place: "Local Restaurant",
                        note: ""
                    }
                ]
            },

            {
                day: 2,
                title: "পূর্ণ দিনের ভ্রমণ",
                items: [
                    {
                        time: "সকাল–বিকাল",
                        activity: "প্রধান সব আকর্ষণ",
                        place: "Main Attractions",
                        note: "সময় নিয়ে ঘুরুন।"
                    },
                    {
                        time: "সন্ধ্যা",
                        activity: "স্থানীয় সংস্কৃতি",
                        place: "Local Area",
                        note: ""
                    }
                ]
            },

            {
                day: 3,
                title: "শেষ দিন",
                items: [
                    {
                        time: "সকাল",
                        activity: "শেষবার ঘোরাঘুরি",
                        place: "Local Area",
                        note: ""
                    },
                    {
                        time: "দুপুর",
                        activity: "কেনাকাটা",
                        place: "Local Market",
                        note: ""
                    },
                    {
                        time: "বিকাল",
                        activity: "ফিরতি যাত্রা",
                        place: "Transport",
                        note: ""
                    }
                ]
            }
        ]
    }
};

// ============================================================
// CATEGORIES
// ============================================================

const categories = [
    {
        id: "all",
        name: "সবগুলো",
        icon: "🌍"
    },

    {
        id: "beach",
        name: "সৈকত",
        icon: "🏖️"
    },

    {
        id: "nature",
        name: "প্রকৃতি",
        icon: "🌳"
    },

    {
        id: "hills",
        name: "পাহাড়",
        icon: "⛰️"
    },

    {
        id: "historical",
        name: "ঐতিহাসিক",
        icon: "🏛️"
    },

    {
        id: "cultural",
        name: "সংস্কৃতি",
        icon: "🎭"
    },

    {
        id: "adventure",
        name: "অ্যাডভেঞ্চার",
        icon: "🎒"
    },

    {
        id: "wildlife",
        name: "বন্যপ্রাণী",
        icon: "🐯"
    },

    {
        id: "tea",
        name: "চা বাগান",
        icon: "🍃"
    },

    {
        id: "island",
        name: "দ্বীপ",
        icon: "🏝️"
    },

    {
        id: "lake",
        name: "হ্রদ",
        icon: "💧"
    },

    {
        id: "river",
        name: "নদী",
        icon: "🌊"
    }
];

// ============================================================
// FOOD CATEGORIES
// ============================================================

const foodCategories = [
    {
        id: "all",
        name: "সব খাবার",
        icon: "🍽️"
    },

    {
        id: "main",
        name: "প্রধান খাবার",
        icon: "🍛"
    },

    {
        id: "street",
        name: "স্ট্রিট ফুড",
        icon: "🥘"
    },

    {
        id: "dessert",
        name: "মিষ্টি",
        icon: "🍮"
    },

    {
        id: "traditional",
        name: "ঐতিহ্যবাহী",
        icon: "🥣"
    }
];

// ============================================================
// BANGLADESH REGIONS
// ============================================================

const bangladeshRegions = [
    {
        id: "dhaka",
        name: "Dhaka",
        nameBn: "ঢাকা"
    },

    {
        id: "chattogram",
        name: "Chattogram",
        nameBn: "চট্টগ্রাম"
    },

    {
        id: "sylhet",
        name: "Sylhet",
        nameBn: "সিলেট"
    },

    {
        id: "khulna",
        name: "Khulna",
        nameBn: "খুলনা"
    },

    {
        id: "barishal",
        name: "Barishal",
        nameBn: "বরিশাল"
    },

    {
        id: "rajshahi",
        name: "Rajshahi",
        nameBn: "রাজশাহী"
    },

    {
        id: "rangpur",
        name: "Rangpur",
        nameBn: "রংপুর"
    },

    {
        id: "mymensingh",
        name: "Mymensingh",
        nameBn: "ময়মনসিংহ"
    }
];

// ============================================================
// GLOBAL ACCESS
// ============================================================

window.WanderBangla = {
    destinations,
    foods,
    cultures,
    travelTips,
    tripTemplates,

    categories,
    foodCategories,
    bangladeshRegions,

    wikiImage,
    handleImageError,

    DEFAULT_IMAGE
};

// ============================================================
// LOAD CHECK
// ============================================================

console.log("🌿 WanderBangla data.js v5.0 loaded");
console.log("📍 Destinations:", destinations.length);
console.log("🍛 Foods:", foods.length);
console.log("🎭 Culture:", cultures.length);
console.log("🧭 Trip templates:", Object.keys(tripTemplates).length);