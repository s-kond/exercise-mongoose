const mongoose = require("mongoose");
const argv = require("minimist-lite")(process.argv.slice(2));
console.log(argv.id);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shop2");
  console.log("connected");

  const fishSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    category: { type: String },
  });

  const Fish = mongoose.model("fish", fishSchema);

  if (argv.id) {
    console.log("Start search for ID");
    const result = await Fish.find({ _id: argv.id });
    console.log(
      `${result.length} ${
        result.length === 1 ? "fish" : "fishes"
      } found: ${result}`
    );
    process.exit();
  } else {
    const result = await Fish.find({});
    console.log(
      `${result.length} ${
        result.length === 1 ? "fish" : "fishes"
      } found: ${result}`
    );
    process.exit();
  }
}
