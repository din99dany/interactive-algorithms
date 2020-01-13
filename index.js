const express = require('express'), bodyParser = require('body-parser');
const app = express()
const port = 3000

var someObject = require('./bd.json')

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-origin")
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'))
app.use(bodyParser.json())

app.post('/', (req, res) => {
    
    console.log( req.body );
    var fs = require('fs')
    var table = JSON.parse(fs.readFileSync('./bd.json', 'utf8'))
    console.log( table );
    table.push(req.body)
    fs.writeFile( './bd.json', JSON.stringify(table) )

    res.send({Status: 'OK'});
})

app.get('/comments', (req, res) => {

    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('./bd.json', 'utf8'));
    res.send(obj);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))