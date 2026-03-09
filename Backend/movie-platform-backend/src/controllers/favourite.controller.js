const userModel = require("../models/user.model")



async function addFavorite(req, res) {
  const { movie } = req.body; // Poora movie object frontend se aayega

  try {
    const user = await userModel.findById(req.user.id);

    // movie.id se check karo ki pehle se hai ya nahi
    const alreadyFavorite = user.favorites.find(fav => fav.id === movie.id);

    if (alreadyFavorite) {
      return res.status(409).json({ message: "Pehle se list mein hai!" });
    }

    user.favorites.push({ ...movie, addedAt: new Date() });
    await user.save();

    res.status(200).json({
      message: "Movie added to GilVerse list",
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function removeFavorite(req, res) {

  const { movieId } = req.body

  try {

    const user = await userModel.findById(req.user.id)

    user.favorites = user.favorites.filter(
      fav => fav.movieId !== movieId
    )

    await user.save()

    res.status(200).json({
      message: "Movie removed from favorites",
      favorites: user.favorites
    })

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    })

  }
}

async function getFavorites(req, res) {

  try {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
      favorites: user.favorites
    })

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    })

  }

}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
}