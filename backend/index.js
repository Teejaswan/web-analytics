const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())

app.post("/api", ({ body }, res) => {
    fs.writeFileSync("data.json", JSON.stringify(body, " ", " "))
    res.status(200)
    res.send("ok")
})

app.listen(3000)

console.log("server started")