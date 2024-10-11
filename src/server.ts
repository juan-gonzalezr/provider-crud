import express from 'express';
import connectDB from './db'
import dotenv from 'dotenv'
import morgan from 'morgan'
import providers from './routes/providers';
import apiRouter from './routes/api'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware parse JSON
app.use(express.json());
// Usin Morgan to log request
app.use(morgan('dev'));
// Using the routes
app.use('/api',providers);
app.use('/api',apiRouter);

app.get('/',(req,res)=>{
    res.send('Api is Runinng'); 
});

app.listen(PORT,()=>{
    console.log(`Server runnin on port ${PORT}`);
})


