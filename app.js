 const QRCode = require('qrcode');
const express = require('express');
var bodyParser = require("body-parser")
const cors = require('cors')
const app = express()
const QRreader = require('qrcode-reader');
const jimp = require('jimp');
const port = 2040
const fs = require('fs');


app.set('view engine', 'ejs');
app.set('views', 'frontend');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
   extended: true
   }));

app.listen(port, ()=>{
   console.log(`'listening to port ${port}'`)
})
//  start
app.get('/generate', (req,res)=>{
   res.render('index')
})

app.post('/QRcode', async(req,res)=>{
      try{
        const qr = await QRCode.toString( req.body.text_input, {type: 'svg'});
       res.status(200).send(qr)
      } catch(err){
      res.status(401).send(err)
      }  
})
   
const buffer = fs.readFileSync('./image/QR.png');

jimp.read(buffer, (err, image) => {
   if (err) {
       console.error(err);
   }})

// Creating an instance of qrcode-reader 

    const qrCodeInstance = new QRreader();

    qrCodeInstance.callback = (err, value) => {
        if (err) {
            console.error(err);
        }
// __ Printing the decrypted value __ \\
        console.log(value.result);

        // __ Decoding the QR code __ \\
    qrCodeInstance.decode(image.bitmap);
    };
