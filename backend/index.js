const express = require('express')
//eslint-disable-next-line
const server =require("./dbs")
const app = express()
var cors = require('cors')
require('dotenv').config()

const port = process.env.port || 3818;
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Testing!');
});
app.use('/blog', require('./routes/blog'))
app.use('/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})














































