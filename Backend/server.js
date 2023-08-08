const dotenv = require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require('cors');
const bodyParser = require("body-parser")


const extractRouter = require('./routes/extractRoute')
const userRouter = require('./routes/userRoute')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => console.error(error) )

try {
    db.once('open', () => console.log('Connected to Database') );
} catch (error) {
    console.error(error);
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(cors())

app.use("/api/v1/metadata", extractRouter)
app.use("/api/v1/users", userRouter)



const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})