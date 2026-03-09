const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("../src/Routes/auth.route")
const favoriteRoutes = require("./Routes/favourite.route")
const cors = require("cors")

const app = express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use(cookieParser())

app.use(express.json())
app.use("/api/auth",authRouter)

app.use("/api/favorites", favoriteRoutes)

module.exports = app