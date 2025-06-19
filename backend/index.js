import express from 'express';
import dotenv from 'dotenv';
// import connectDB from './config/database.js';
import cors from 'cors';
import PostFilter from './Router/PostFilter.js';


const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

//mounting the router
app.use('/api/v1/',PostFilter);

const PORT =process.env.PORT || 5000;
// connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
    res.send('HELLO BROTHER FROM EXPRESS');
})

