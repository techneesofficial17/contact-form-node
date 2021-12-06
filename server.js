const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const mainRoute = require("./routes/index");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

const PORT = process.env.PORT || 5555;

app.get("/", mainRoute);
app.post("/", mainRoute);

app.use((req, res, next) => {
	res.render("404");
});

app.listen(PORT, () => {
	console.log(`Your server is running on http://localhost:${PORT}`);
});
