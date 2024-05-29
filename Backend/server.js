import express from 'express';
import rootrouter from './routes/server.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'https://paytm-eta-umber.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', rootrouter);

app.options('*', cors(corsOptions)); // Handle preflight requests

app.get("/", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
