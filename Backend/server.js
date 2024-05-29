import express from "express";
import rootrouter from "./routes/server.js";
import cors from 'cors';
const app = express();

app.use(cors({
    origin: 'https://paytm-eta-umber.vercel.app'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',rootrouter);

app.get("/",(req,res) => {
    console.log("Hello World");
    res.send("Hello World");

});

app.listen(8000,()=>{
    console.log("server is running on port 8000");
})

