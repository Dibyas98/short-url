import express from 'express';
// import { nanoid } from 'nanoid';
import fs from "node:fs"
import path from "node:path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "node:url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLE WARE OF EXRESS TO CALL THE BODY
app.use(express.json())

app.get("/:short", (req,res) =>{
    const fileData = JSON.parse(fs.readFileSync("UrlMap.json"));
   
    const Lurl = fileData[req.params.short];

    res.redirect(Lurl)
})



app.get('/', (req,res) =>{
    console.log("Request received on /");
  res.sendFile(__dirname + "/index.html");
})

// POST API FOR GET SHORT URL
app.post('/short-url', (req,res) => {
    const shortUrl = nanoid(10)
    const longUrl = req.body.url;

    // FILE HANDEL
    const fileData = JSON.parse(fs.readFileSync("UrlMap.json"));
    fileData[shortUrl] = longUrl
    fs.writeFileSync("UrlMap.json", JSON.stringify(fileData))
    
    return res.json({
        success: true,
        message:`http://localhost:5001/${shortUrl}`
    })
})

app.listen(5001, ()=> console.log('Server is started at 5001 port'));