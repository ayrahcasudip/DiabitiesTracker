import express from 'express';
import 'dotenv/config';
import register from './routes/userRoute.js';
import connectDb from './config/dbConnection.js';
import cors from 'cors';

const app = express();

const allowedOrigin = "https://diabetes-tracker-black.vercel.app/";

app.use(cors({
  origin: allowedOrigin,  // Allow requests only from your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true,  // Allow cookies and credentials to be sent
}));

connectDb();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use('/user', register);

// Export Express app as a serverless function for Vercel
export default app;
