const express = require('express');
const app = express();
const morgan = require("morgan")
const mongoose = require('mongoose');
const productRoutes = require("./routs/product")
const userRoutes = require("./routs/user")
const orderRoutes = require("./routs/order")
// const categoryRoutes = require("./routs/category")
const csvtojson = require("csvtojson");
const MeetingSchema = require('./models/product')

mongoose.connect('mongodb+srv://reshma:reshma@cluster0.edeo5.mongodb.net/myFirstDatabase',
{ useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true, })
.then(() => console.log("mongodb connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    insertData(req, res)
  })
  
  async function insertData(req, res) {
    try {
      const data = await csvtojson()
        .fromFile("file.csv");
          const result = await MeetingSchema.insertMany(data);
          res.send(result)
          process.exit();
    } catch (e) {
      process.exit();
    }
  };


app.use(morgan('dev'))
app.use(express.json());

app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes)
// app.use('/api',categoryRoutes)
app.listen(3000, () => console.log('Server up and running'));