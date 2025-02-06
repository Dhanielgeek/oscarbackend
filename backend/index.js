const express = require("express")
const errorHandler = require("./middlewares/errorHandler")
const blogRoute = require("./routes/blogRoute")
const imageRoute = require("./routes/imageRoute")
const adminRoute = require("./routes/adminRoute")
const app = express()
require("dotenv").config()

const db = require("./models")
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