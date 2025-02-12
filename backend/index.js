const express = require("express")
const errorHandler = require("./middlewares/errorHandler")
const blogRoute = require("./routes/blogRoute")
const imageRoute = require("./routes/imageRoute")
const adminRoute = require("./routes/adminRoute")
const app = express()
const cors = require("cors")

require("dotenv").config()

const db = require("./models")

/*const corsOptions = {
    origin:(origin,callback)=>{
        if (!origin || origin === "http://localhost:5173" || origin ==="http://localhost:5174") {
            callback(null,true)
        }else{
            callback(new Error("Not allowed by cors"))
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET","POST","PUT","DELETE","OPTIONS"]
  };*/
  
  //app.use(cors(corsOptions));

//   app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE,OPTIONS")
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
//     if (req.method==="OPTIONS") {
//         return res.status(200)
//     }
//     next()
//   })
app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods:["GET","POST","PUT","DELETE","OPTIONS"]
}))
app.options("*", cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods:["GET","POST","PUT","DELETE","OPTIONS"]
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api", blogRoute)
app.use("/api", imageRoute)
app.use("/api", adminRoute)
app.use(errorHandler)

const port = process.env.PORT
db.sequelize.sync({alter:true}).then(()=>{})
app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${port}`)
})