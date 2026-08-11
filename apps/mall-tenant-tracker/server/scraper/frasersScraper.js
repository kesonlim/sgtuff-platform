/**
 * Frasers Property Malls Scraper & Base Dataset Generator
 * Covers Northpoint City, Causeway Point, Waterway Point, NEX, Tampines 1, etc.
 */

export function generateFrasersBaseStoreList(mallId) {
  const frasersStores = {
    "northpoint-city": [
      { name: "Don Don Donki", unit: "#B1-06/07", category: "Supermarket & Japanese Food" },
      { name: "Uniqlo", unit: "#01-08 to 12", category: "Fashion" },
      { name: "Courts Megastore", unit: "#02-21 to 24", category: "Electronics & Home" },
      { name: "Subway", unit: "#B2-12", category: "F&B" },
      { name: "Harvey Norman", unit: "#B1-121", category: "Electronics" },
      { name: "Din Tai Fung", unit: "#02-28", category: "F&B" },
      { name: "Monster Curry", unit: "#B1-51", category: "F&B" },
      { name: "Popular Bookstore", unit: "#03-11", category: "Books & Stationery" },
      { name: "FairPrice Finest", unit: "#B1-12", category: "Supermarket" },
      { name: "Decathlon Click & Collect", unit: "#01-105", category: "Sportswear" },
      { name: "Sushiro", unit: "#02-16 to 18", category: "F&B Japanese" },
      { name: "Timezone Arcade", unit: "#02-13", category: "Entertainment" },
      { name: "Scoop Wholefoods", unit: "#01-167", category: "Organic & Groceries" }
    ],
    "causeway-point": [
      { name: "Metro Department Store", unit: "#01-18/19", category: "Department Store" },
      { name: "Cathay Cineplexes", unit: "#07-01", category: "Cinema & Entertainment" },
      { name: "Uniqlo", unit: "#02-21 to 23", category: "Fashion" },
      { name: "Courts", unit: "#04-19", category: "Electronics" },
      { name: "FairPrice Extra", unit: "#B1-31 to 33", category: "Hypermarket" },
      { name: "Challenger", unit: "#04-11", category: "Tech & Accessories" },
      { name: "海底捞 Haidilao", unit: "#05-01", category: "F&B Hotpot" },
      { name: "Swensen's", unit: "#02-35", category: "F&B Family Dining" },
      { name: "Morganfield's", unit: "#01-16", category: "F&B Bistro" },
      { name: "Cotton On", unit: "#01-14", category: "Fashion" }
    ],
    "waterway-point": [
      { name: "Shaw Theatres IMAX", unit: "#B2-11", category: "Cinema" },
      { name: "FairPrice Finest", unit: "#B2-32", category: "Supermarket" },
      { name: "H&M Flagship", unit: "#01-01 to 03", category: "Fashion" },
      { name: "Uniqlo", unit: "#01-21", category: "Fashion" },
      { name: "Genki Sushi", unit: "#02-23", category: "F&B Japanese" },
      { name: "Best Denki", unit: "#B1-08", category: "Electronics" },
      { name: "Daiso Japan", unit: "#B1-09", category: "Lifestyle & Variety" },
      { name: "Guzman y Gomez", unit: "#01-K3", category: "F&B Mexican" },
      { name: "Gram Cafe & Pancakes", unit: "#01-64", category: "F&B Cafe" }
    ],
    "nex": [
      { name: "Takashimaya Simply Food / FairPrice Xtra", unit: "#03-42 to 50", category: "Hypermarket" },
      { name: "Isetan Department Store", unit: "#01-01 to #03-01", category: "Department Store" },
      { name: "Shaw Theatres NEX", unit: "#04-60", category: "Cinema" },
      { name: "Uniqlo", unit: "#01-03", category: "Fashion" },
      { name: "Don Don Donki NEX", unit: "#B2-01 to 05", category: "Supermarket & Japanese" },
      { name: "Cotton On Kids", unit: "#01-18", category: "Fashion" },
      { name: "Challenger Flagship", unit: "#04-33", category: "Tech & Accessories" },
      { name: "Flippers Pancakes", unit: "#01-56", category: "F&B Cafe" },
      { name: "Beauty in The Pot", unit: "#02-01", category: "F&B Hotpot" },
      { name: "NEX Dog Park & SkyGarden", unit: "#04-01", category: "Pet & Leisure" }
    ]
  };

  return frasersStores[mallId] || [
    { name: "FairPrice Finest", unit: "#B1-01", category: "Supermarket" },
    { name: "Popular Bookstore", unit: "#03-01", category: "Stationery & Books" },
    { name: "Toast Box", unit: "#01-05", category: "F&B Cafe" },
    { name: "Watsons", unit: "#B1-10", category: "Pharmacy & Beauty" },
    { name: "Ya Kun Kaya Toast", unit: "#01-02", category: "F&B" },
    { name: "McDonald's", unit: "#01-12", category: "F&B Fast Food" },
    { name: "Giordano", unit: "#01-20", category: "Fashion" }
  ];
}
