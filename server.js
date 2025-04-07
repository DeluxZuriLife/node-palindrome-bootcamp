const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');

const createServer = http.createServer(function(req, res){
    const page = url.parse(req.url).pathname; 
    const params = querystring.parse(url.parse(req.url).query);
    console.Log(page);
    console.Log(params)
    if (page == '/'){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    } 
    else if (page == '/api'){
        if ('theWords'in params){
            const palindromeCheck = params['theWords']
            const sameInReverse = palindromeCheck.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();  
            if(sameInReverse(params['theWords'])){
                (palindromeCheck === [palindromeCheck].reverse().join(''))
                res.writeHead(200, {'Content-Type':'application/json'});
                const objToJson = {
                    status: "Correct! This is a Palindrome."
                }
                res.end(JSON.stringify(objToJson));
            }
            else{
                res.writeHead(200, {'Content-Type':'application/json'});
                const objToJson = {
                    status: "sorry yrros is not a palindrome either!"
                }
                res.end(JSON.stringify(objToJson)); 
            }
        }
        else{
            res.writeHead(404)
            const objToJson = {
                status: "I'm not working! Reboot me."
            }
            res.end(JSON.stringify(objToJson));
        }
    }
    else if (page == 'style.css'){
        fs.readFile('style.css', function(err, data){
            res.write(data);
            res.end(); 
        }); 
    }else if (page == 'client.js'){
        fs.readFile('client.js', function(err, data){
            res.writeHead(200, {'Content-Type':'text/javascript'}); 
            res.write(data); 
            res.end();
        })
})

Server.listen(8001); 