require('dotenv').config()

module.exports = {
   DB_URL: process.env.DB_URL,
   SECRET_WORD: process.env.SECRET_WORD,
   PORT: process.env.PORT
}