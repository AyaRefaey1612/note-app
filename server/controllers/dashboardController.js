const mongoose = require("mongoose");
const notes = require("../models/notes");
const User = require("../models/User");

const dashboard = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  let perPage = 8;
  let page = req.query.page || 1;
  const locals = {
    title: "dashboard",
    discription: "free node.js notes app",
  };
  const count = await notes.countDocuments({ user: userId });
  try {
    const note = await notes
      .aggregate([
        { $sort: { createdAt: -1 } },
        { $match: { user: userId } },

        {
          $project: {
            title: { $substr: ["$title", 0, 30] },
            body: { $substr: ["$body", 0, 80] },
          },
        },

        { $skip: perPage * page - perPage },
        { $limit: perPage },
      ])
      .exec();

    res.render("dashboard/index", {
      userName: req.user.firstName,
      locals,
      note,
      layout: "../views/layouts/dashboard.ejs",
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};

const items = async (req, res) => {
  const locals = {
    title: "dashboard",
    discription: "free node.js notes app",
  };
  const note = await notes
    .findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();
  if (note) {
    res.render("dashboard/items", {
      note,
      locals,
      id: req.params.id,
      layout: "../views/layouts/dashboard.ejs",
    });
  } else {
    res.send("somthing went wrong");
  }
};

const update = async (req, res) => {
  try {
    const updatedData = await notes
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.body,
          updatedAt: Date.now(),
        }
      )
      .where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const deleteItem = async (req, res) => {
  try {
    const deleteItems = await notes
      .deleteOne({ _id: req.params.id })
      .where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const addItem = async (req, res) => {
  res.render("dashboard/add.ejs", {
    layout: "../views/layouts/dashboard.ejs",
  });
};

const addItemsubmit = async (req, res) => {
  try {
    const newNotes = await notes.create({
      user: req.user.id,
      title: req.body.title,
      body: req.body.body,
    });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const searchItems = async (req, res) => {
  const foundedNote = await notes.find({ title: req.body.searchTerm });
  try {
    res.render("dashboard/search", {
      searchResult: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};

const searchItemsSubmit = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const searchTermNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResult = await notes
      .find({
        $or: [
          { title: { $regex: new RegExp(searchTermNoSpecialChars, "i") } },
          { body: { $regex: new RegExp(searchTermNoSpecialChars, "i") } },
        ],
      })
      .where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResult,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  dashboard,
  items,
  update,
  deleteItem,
  addItem,
  addItemsubmit,
  searchItems,
  searchItemsSubmit,
};
