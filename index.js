const dogecore = require("bitcore-lib-doge");
const axios = require('axios')
const fs = require('fs')
const dotenv = require('dotenv')
const mime = require('mime-types')
const express = require('express')
const { PrivateKey, PublicKey, Address, Transaction, Script, Opcode } = dogecore
const { Hash, Signature } = dogecore.crypto
const path = require("path")



const generatePair = () => {
    //generate a random private key
    var priv = PrivateKey();

    //get the associated address
    var addr = priv.toAddress();

    //export private key to WIF format.
    var exportedPriv  =  priv.toWIF();
    console.log(exportedPriv);
    //export address to human format (string);
    var humanAddr = addr.toString();
    console.log(humanAddr);

    return {"priv" : exportedPriv , "addr" : humanAddr}
}


const app = express();

//set view engine to ejs mode
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
const port = process.env.PORT || 3000 ;


// sendFile will go here
app.get('/', function(req, res) {
   var addressDoge = generatePair();
   res.render(path.join(__dirname, '/pages/index'),{
                                                    hello:addressDoge});
});

app.get('/pages/output.css', function(req,res){
    res.sendFile(path.join(__dirname, '/pages/output.css'));
});

app.listen(port);
console.log("server is listenning on port : " + port);


/*
app.get('/json', (request, response) => {
    var pair = generatePair();
    response.render('qr.ejs',{"qrAdress":pair.addr});
});
*/
