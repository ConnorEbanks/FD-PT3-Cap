require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getAllGames, addGame, randomGame, getCrossPlayGames} = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

// Games
app.get('/game-list', getAllGames)
app.get('/crossPlayGames', getCrossPlayGames)

app.post('/game-list', addGame)

app.get('/random-game', randomGame)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))