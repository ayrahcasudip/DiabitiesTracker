import express from "express"
import 'dotenv/config'
import register from "./routes/userRoute.js"
import connectDb from "./config/dbConnection.js"
const app = express()

const PORT = process.env.PORT;

import cors from 'cors';


app.use(cors({
  }));


connectDb();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello world")

})

app.use('/user', register)


