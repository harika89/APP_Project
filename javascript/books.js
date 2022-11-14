const express = require('express');
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Content-disposition, Accept, Authorization, User-Role"
	);
	next();
});

//Database conn
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const port = 3001;

let getAllBooksq = "SELECT book_id, title, language_id, num_pages, publication_year, author_name, book_cover "+
                    "FROM Book inner join Author ON Author.author_id = Book.author_id";
let searchByBookId = "SELECT book_id, title, language_id, num_pages, publication_year, author_name, book_cover "+
                    "FROM Book inner join Author ON Author.author_id = Book.author_id WHERE book_id = ?"


app.get('/getAllBooks', async(req, res) => {

    const db = await open({
        filename: './bookstore.db', 
        driver: sqlite3.Database
    })
    let arr = await db.all(getAllBooksq);

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

    let arr = await db.all(searchByBookId, [bid]);
    //select author_name from Book inner join Author ON Author.author_id = Book.author_id

   res.status(200).json(arr);

    await db.close();
})

app.get('/getFeaturedBooks', async(req, res) => {
    // console.log(resFromDB);
    //const bid = req.body.bid;

    const db = await open({         
        filename: './bookstore.db',
        driver: sqlite3.Database
    })

    let arr = await db.all("SELECT title, publication_year, book_cover FROM Book WHERE featured == 1");

   res.status(200).json(arr);

    await db.close();
})

app.listen(port, () => {
    console.log('Listening to port ' + port);
})
