const express = require("express");
const app = express();
const dotenv = require("dotenv"); 
const cors = require("cors");
const { connection } = require("./configs/db.js");
const { userRouter } = require("./routes/user.route.js");
const { postRouter } = require("./routes/post.route.js");
const { auth } = require("./middlewares/auth.js");

dotenv.config();
app.use(cors({origin:"*"}));
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", auth);
app.use("/posts", postRouter);

app.get('/', (req, res)=>{
    res.json("Social Media App");
})

app.get("*", (req, res)=>{
    res.json("Invalid end point");
})


app.listen(process.env.port, async()=>{
    console.log(`server is running at http://localhost:${process.env.port}`)
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error While connecting to DB");
        console.log(error);
    }
})