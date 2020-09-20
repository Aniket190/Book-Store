if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const multer=require('multer')
const express = require('express')
const app= express();
const path=require('path');
const expressLayouts = require('express-ejs-layouts');
const bodyParser=require('body-parser');



const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author')
const booksRouter = require('./routes/books')


app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"))

app.set('layout','layouts/layout');
app.use(expressLayouts);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}));

const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,
     useUnifiedTopology: true })



const db=mongoose.connection;

db.on('error',error=>console.error(error))
db.once('open',()=>console.log('Mongoose is connected'));

app.use('/',indexRouter);
app.use('/authors',authorRouter);
app.use('/books',booksRouter);



app.listen(process.env.PORT || 3000);





