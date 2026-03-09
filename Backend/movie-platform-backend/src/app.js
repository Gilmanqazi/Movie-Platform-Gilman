const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("../src/Routes/auth.route")
const favoriteRoutes = require("./Routes/favourite.route")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors({
  origin:"*",
  credentials:true
}))

app.use(cookieParser())

app.use(express.json())
app.use("/api/auth",authRouter)

app.use("/api/favorites", favoriteRoutes)

app.use(express.static(path.resolve("../../Frontend/movie-platform/dist")))

app.get((req,res)=>{
  res.sendFile(path.resolve("../../Frontend/movie-platform/dist/index.html"))
})

module.exports = app