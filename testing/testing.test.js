const app = require('./books')
const request = require('supertest');

describe("getBookDetails API", () => {
    it('Should Get Book Details', async () => {
        const response = await request(app).post('/getBookDetails').send({
            bid: "8036809654"
        })
        const body = response.body[0];
        console.log(body)
        expect(body.book_id).toEqual(expect.any(Number));
        expect(body.book_cover).toEqual(expect.any(String));

    })

    it('Should Get Book Details', async () => {
        const response = await request(app).post('/getBookDetails').send({
            bid: "-1"
        })
        expect(response.body).toEqual([]);
    })

    it('Should Get Book Details', async () => {
        const response = await request(app).post('/getBookDetails').send({
            bid: "2845645283"
        })
        const body = response.body[0];
        console.log(body)
        expect(body.book_id).toEqual(expect.any(Number));
        expect(body.publication_year).toEqual(expect.any(Number));
    })
})

describe("getAllBooks API", () => {
    it('Should Get All Books Details', async () => {
        const response = await request(app).get('/getAllBooks')
        const body = response.body[0];
        console.log(body)
        expect(body.book_id).toEqual(expect.any(Number));
        expect(body.book_cover).toEqual(expect.any(String));

    })
})

describe("getFeaturedBooks API", () => {
    it('Should Get All Featured Books', async () => {
        const response = await request(app).get('/getFeaturedBooks')
        const body = response.body[0];
        console.log(body)
        expect(body.title).toEqual(expect.any(String));
        expect(body.book_cover).toEqual(expect.any(String));
        expect(body.publication_year).toEqual(expect.any(Number));

    })
})

