import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js"

// rest object
const app = express();

///configure dotenv
dotenv.config();

connectDB();

app.use(cors());
/////middleware
app.use(express.json());
app.use(morgan('dev'));

//////routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category",categoryRoutes);



//rest api
app.get('/', (req, res) => {

    res.send("<h1>welcome to ecommerce app</h1>" );

});

const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{

    console.log(`port running on ${PORT}`.bgCyan.white);

});