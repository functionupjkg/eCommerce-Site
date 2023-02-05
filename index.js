const express   = require('express');
const mongoose = require('mongoose');
const route = require('./src/routes/route');
const  app = express();

app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Jyoti273-db:djukOqR9QbI5Itvc@cluster0.nzuylps.mongodb.net/eCommerce-Site-db",
   {useNewUrlParser : true}
)
.then(()=>console.log("mongoDB Is connected"))
.catch((err)=>console.log(err))



app.use("/", route)


app.listen(3000, ()=> {
    console.log("Express Running on port", 3000)
})


