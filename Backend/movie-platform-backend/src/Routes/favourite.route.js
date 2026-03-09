const express = require("express")
const router = express.Router()

const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require("../controllers/favourite.controller")

const authMiddleware = require("../middlewares/auth.Middleware")

router.post("/add", authMiddleware, addFavorite)

router.delete("/remove", authMiddleware, removeFavorite)

router.get("/", authMiddleware, getFavorites)

module.exports = router