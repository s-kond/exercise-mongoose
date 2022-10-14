const mongoose = require("mongoose");
const argv = require("minimist-lite")(process.argv.slice(2));

checkArgv(argv.c, "category");

function checkArgv(input, inputName) {
  if (!input) {
    console.log(
      `Nothing was saved. Please provide a ${inputName} for the fish.`
    );
    process.exit();
  }
}

main().catch((err) => console.log(err));

async function main() {
  //mit einer Datenbank verbinden (≈ use)
  await mongoose.connect("mongodb://localhost:27017/shop2");
  console.log("connected");

  //Schema für Einträge erstellen (notwendig):
  const fishSchema = mongoose.Schema({
    name: { type: String, required: true, default: "Unknown." },
    description: { type: String, default: "This is an unknown fish." },
    price: { type: Number, default: 0 },
    category: { type: String },
  });

  const Fish = mongoose.model("fish", fishSchema);

  const newFish = Fish({
    name: argv.n,
    description: argv.d,
    price: argv.p,
    category: argv.c,
  });

  await newFish.save();

  console.log("Successfully added");
  process.exit();
}
