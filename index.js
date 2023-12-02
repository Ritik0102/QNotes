const mongoose = require('mongoose')
const express = require('express')
var cors = require('cors')
const app = express();

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    next();
  });

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/notes', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{
    console.log('Connected to Mongo')
})
.catch((e) => {
    console.log('Failed')
    console.log(e)
})

app.get('/',(req, res) => {
    res.send('hello')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(9000,() => {
    console.log('this is running at port 9000')
})