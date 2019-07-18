let express = require('express'),
    path    = require('path'),
    books = require('./static/json/books.js');

const PORT = process.env.PORT || 8080

let app = express();

app.use('/',express.static(__dirname + '/static'));

app.get('/api/books/',(req, res,err)=>{
    res.status(200);
    res.json(books);
});
app.post('/api/books/',(req, res, err)=>{
    var newBook = req.query;
    newBook.id = books.length;

    console.log(newBook);
    books.push(newBook);
    res.status(200);
    res.json(newBook);

});
app.get('/api/books/:id', (req,res)=> {
  var reqBook = books.find((book) => {
    return book.id == req.params.id;
  });
  console.log(reqBook);
  res.status(200);
  res.json(reqBook);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
});

