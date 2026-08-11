/**
 * Lendlease Global Commercial REIT Module
 * Covers 313@somerset, JEM, PLQ Mall
 */

export function generateLendleaseBaseStoreList(mallId) {
  const stores = {
    "313-somerset": [
      { name: "Forever 21 / Cotton On Flagship", unit: "#01-01 to 05", category: "Fashion" },
      { name: "ZARA", unit: "#01-14 to 20", category: "Fashion" },
      { name: "PUMA Select", unit: "#01-12", category: "Streetwear" },
      { name: "Love, Bonito Flagship", unit: "#02-16 to 21", category: "Fashion" },
      { name: "Marché Mövenpick 313", unit: "#01-29", category: "F&B European" },
      { name: "Chipotle Mexican Grill", unit: "#01-18", category: "F&B" },
      { name: "Privé 313", unit: "#01-28", category: "F&B Bistro Bar" },
      { name: "Bacha Coffee 313", unit: "#01-15", category: "F&B Luxury" }
    ],
    "jem": [
      { name: "IKEA Jurong (Digital Store)", unit: "#02-12 to 16", category: "Home & Furnishing" },
      { name: "FairPrice Xtra JEM", unit: "#B1-01", category: "Hypermarket" },
      { name: "Cathay Cineplexes JEM", unit: "#05-01", category: "Cinema" },
      { name: "Uniqlo", unit: "#02-27 to 31", category: "Fashion" },
      { name: "MUJI JEM", unit: "#04-33 to 37", category: "Lifestyle & Home" },
      { name: "Don Don Donki JEM", unit: "#02-24 to 26", category: "Supermarket & F&B" },
      { name: "Kinokuniya Bookstore", unit: "#04-23", category: "Books & Gifts" },
      { name: "Din Tai Fung", unit: "#02-32", category: "F&B" }
    ],
    "plq-mall": [
      { name: "Shaw Theatres PLQ", unit: "#05-01", category: "Cinema" },
      { name: "FairPrice Finest PLQ", unit: "#B2-09", category: "Supermarket" },
      { name: "Uniqlo PLQ", unit: "#01-01 to 04", category: "Fashion" },
      { name: "Popular Bookstore", unit: "#03-11", category: "Books & Stationery" },
      { name: "Joy Luck Teahouse", unit: "#01-K1", category: "F&B Teahouse" },
      { name: "Haakon Superfoods", unit: "#01-34", category: "F&B Health" },
      { name: "Komoro Ramen", unit: "#B2-18", category: "F&B Japanese" }
    ]
  };

  return stores[mallId] || [
    { name: "FairPrice Finest", unit: "#B1-01", category: "Supermarket" },
    { name: "Toast Box", unit: "#01-05", category: "F&B Cafe" },
    { name: "Watsons", unit: "#B1-10", category: "Beauty & Pharmacy" }
  ];
}
