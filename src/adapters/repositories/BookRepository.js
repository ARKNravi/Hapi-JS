// src/adapters/repositories/BooksRepository.js
const book = require("../entities/Book");

class BooksRepository {
    constructor() {
        this._books = [];
    }

    addBook(book) {
        this._books.push(book);
        return book.id; // make sure to return the id
    }

    getBooks() {
        return this._books;
    }

    getBookById(id) {
        return this._books.find((book) => book.id === id);
    }

    updateBookById(id, updatedData) {
        const index = this._books.findIndex((book) => book.id === id);
        if (index !== -1) {
            this._books[index] = { ...this._books[index], ...updatedData };
        }
    }

    deleteBookById(id) {
        const index = this._books.findIndex((book) => book.id === id);
        if (index !== -1) {
            this._books.splice(index, 1);
        }
    }
}

module.exports = BooksRepository;
