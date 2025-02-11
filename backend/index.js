const express = require("express")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")
const blogRoute = require("./routes/blogRoute")
const imageRoute = require("./routes/imageRoute")
const adminRoute = require("./routes/adminRoute")
const app = express()
require("dotenv").config()

const db = require("./models")

/*const corsOptions = {
    origin:(origin,callback)=>{
        if (origin === "http://localhost:5173" || origin ==="http://localhost:5174") {
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
app.use(cors())
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