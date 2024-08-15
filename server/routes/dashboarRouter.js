const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/dashboardController");
const { isLoggedIn } = require("../middleware/checkAuth");

router.get("/dashboard", isLoggedIn, dashboard.dashboard);
router.get("/dashboard/items/:id", isLoggedIn, dashboard.items);
router.put("/dashboard/items/:id", isLoggedIn, dashboard.update);
router.delete("/dashboard/items-delete/:id", isLoggedIn, dashboard.deleteItem);
router.get("/dashboard/add", isLoggedIn, dashboard.addItem);
router.post("/dashboard/add", isLoggedIn, dashboard.addItemsubmit);
router.post("/dashboard/search", isLoggedIn, dashboard.searchItemsSubmit);

module.exports = router;
