var express = require('express')
var app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// Node.js의 native Promise 사용,
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect('mongodb://54.180.92.204:27017/style', { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

var goodSchema = new mongoose.Schema({
    name: String,
    provider: String,
    test: String,
    options: [{id: Number, color: String, size: String, stock: Number }],
},
{ 
    collection: 'goods',
    timestamps: true
}
);

// var Kitten = mongoose.model('Kitten', kittySchema);

var goods = mongoose.model('goodOne',goodSchema);
// new goods({name:"new Shirts", provide:"Cress", test: "case1"}).save()

app.get('/', (req, res, next) => {
    goods.find({})
    .then((data)=>{
        data[1].options.forEach((e)=>console.log(e.size))
        // console.log(data[1].options.forEach((e)=>e))
        res.send(JSON.stringify(data))
    })
})




app.listen(3001, ()=>console.log('App listening on port 3000'))


