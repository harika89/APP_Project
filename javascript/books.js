const express = require('express');
const app = express();

app.use(express.json());

//Database conn
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const port = 3000;

app.get('/getAllBooks', async(req, res) => {

    const db = await open({
        filename: './bookstore.db', 
        driver: sqlite3.Database
    })

    let arr = await db.all("SELECT * FROM Book");

   res.status(200).json(arr);

    await db.close();
})


app.post('/getBookDetails', async(req, res) => {
    // console.log(resFromDB);
    const bid = req.body.bid;

    const db = await open({
        filename: './bookstore.db',
        driver: sqlite3.Database
    })

    let arr = await db.all("SELECT * FROM Book WHERE book_id = ?", [bid]);

   res.status(200).json(arr);

    await db.close();
})

app.listen(port, () => {
    console.log('Listening to port ' + port);
})