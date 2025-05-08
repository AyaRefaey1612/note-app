require("dotenv").config();
const express = require("express");
const path = require("path"); // Import the path module
const expressEjsLayouts = require("express-ejs-layouts");
const connectmongodb = require("./server/config/db");
const expressSession = require("express-session");
const override = require("method-override");
const passport = require("passport");
const mongoConnect = require("connect-mongo");

const app = express();
require("./server/routes/auth");
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(override("_method"));

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: mongoConnect.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 60480000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

const routes = require("./server/routes/index");
const dashboardRouter = require("./server/routes/dashboarRouter");
const auth = require("./server/routes/auth");
app.use("/", auth);
app.use("/", routes);
app.use("/", dashboardRouter);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

connectmongodb();
app.listen(PORT, () => {
  console.log(`listen to sever ${PORT}`);
});
