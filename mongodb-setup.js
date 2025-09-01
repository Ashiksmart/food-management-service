use biryani_portal;

db.createCollection("items");

db.items.insertMany([
  { name: "Chicken Biryani", category: "Food", price: 120, quantity: 50 },
  { name: "Mutton Biryani", category: "Food", price: 200, quantity: 30 },
  { name: "Veg Biryani", category: "Food", price: 100, quantity: 40 }
]);
