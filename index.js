const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  //mit einer Datenbank verbinden (≈ use)
  await mongoose.connect("mongodb://localhost:27017/shop2");
  console.log("connected");

  //Schema für Einträge erstellen (notwendig):
  const fishSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String },
  });

  const Fish = mongoose.model("fish", fishSchema);

  const guppy = Fish({
    name: "Tuna",
    description: "Blub Blub.",
    price: 100,
    category: "Fish",
  });

  await guppy.save();

  console.log("Fisch erstellt");
  process.exit();
}
