const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./Routes/expenseRoutes");

const app = express();      

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);

app.get("/", (req,res)=>{
    res.send("Expense Tracker Backend Running");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});