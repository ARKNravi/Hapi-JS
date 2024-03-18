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
        return bookId;
    }

    getBooks() {
        const books = this._booksRepository.getBooks();
        return books.map(({ id, name, publisher }) => ({
            id,
            name,
            publisher,
        }));
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
    getBooksByReadingStatus(readingStatus) {
        const books =
            this._booksRepository.getBooksByReadingStatus(readingStatus);
        return books.map(({ id, name, publisher }) => ({
            id,
            name,
            publisher,
        }));
    }

    getBooksByFinishedStatus(finishedStatus) {
        const books =
            this._booksRepository.getBooksByFinishedStatus(finishedStatus);
        return books.map(({ id, name, publisher }) => ({
            id,
            name,
            publisher,
        }));
    }
    getBooksByName(name) {
        const books = this._booksRepository.getBooksByName(name);
        return books.map(({ id, name, publisher }) => ({
            id,
            name,
            publisher,
        }));
    }
}

module.exports = BooksService;
