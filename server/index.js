const express = require('express')
const bodyParser = require('body-parser')

const requestHandlers = require('./requestHandlers')
const configManager = require('./configManager')
const app = express()

app.use(bodyParser.json())
configManager.loadConfig()

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on part ${port}`))

app.get('/pulls', requestHandlers.getPullRequests)