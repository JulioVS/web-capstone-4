import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { setup: "The joke", delivery: "The punchline"});
});

app.listen(port, () => {
  console.log(`Server started on Port ${port}.`);
});
