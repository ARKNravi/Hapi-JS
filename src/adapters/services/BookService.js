// src/adapters/services/BooksService.js
const Book = require("../entities/Book");
const BooksRepository = require("../repositories/BookRepository");

class BooksService {
    constructor(booksRepository) {
        this._booksRepository = booksRepository;
    }

    addBook({
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    }) {
        const book = new Book(
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        );
        const bookId = this._booksRepository.addBook(book);
        return bookId; // make sure to return the id
    }

    getBooks() {
        return this._booksRepository.getBooks();
    }

    getBookById(id) {
        return this._booksRepository.getBookById(id);
    }

    updateBookById(id, updatedData) {
        this._booksRepository.updateBookById(id, updatedData);
    }

    deleteBookById(id) {
        this._booksRepository.deleteBookById(id);
    }
}

module.exports = BooksService;
