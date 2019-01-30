const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const fs = require('fs')

const index = fs.readFileSync('./public/index.html')

// Serves resources from public folder
app.use(express.static(__dirname + '/public'))

// create a GET route
app.get('/', (req, res) => {
	res.end(index)
})

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${ PORT }`))
