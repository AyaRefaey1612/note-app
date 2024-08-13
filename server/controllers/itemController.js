// const mongoose = require("mongoose");
// const notes = require("../models/notes");
// const Layout = require("layout");

// const items = async (req, res) => {
//   const note = await notes
//     .findById({ _id: req.params.id })
//     .where(req.user.id)
//     .lean();
//   const locals = {
//     title: "dashboard",
//     discription: "free node.js notes app",
//   };
//   if (note) {
//     res.render("dashboard/items", {
//       note,
//       locals,
//       id: req.params.id,
//       Layout: ".../views/layouts/dashboard.ejs",
//     });
//   } else {
//     res.send("somthing went wrong");
//   }
// };

// // const addItems = async (req, res) => {
// //   res.render("dashboard/add", {});
// //   try {
// //     const newNote = {
// //       user: req.user.id,
// //       title: req.body.title,
// //       body: req.body.body,
// //     };
// //     const newnote = await notes.create(newNote);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // const deleteItem = async (req, res) => {
// //   res.render("dashboard/changingAtItem.ejs", {
// //     word: "deleted",
// //   });
// //   try {
// //     const noteId = req.params.id;
// //     const deleteNote = await notes.deleteOne({ _id: noteId });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // const updateItem = async (req, res) => {
// //   const noteId = req.params.id;
// //   res.render("dashboard/update.ejs", {
// //     word: "updated",
// //     noteId,
// //   });
// //   try {
// //     const newData = {
// //       user: req.user.id,
// //       title: req.body.title,
// //       body: req.body.body,
// //     };
// //     // const editNote = await notes.findByIdAndUpdate(noteId, newData);
// //     console.log("req", req.bod);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// module.exports = {
//   items,
//   // addItems,
//   // deleteItem,
//   // updateItem,
// };
