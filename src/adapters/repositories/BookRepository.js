const book = require("../entities/Book");

class BooksRepository {
    constructor() {
        this._books = [];
    }

    addBook(book) {
        this._books.push(book);
        return book.id;
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
        } else {
            throw new Error("Book not found");
        }
    }

    deleteBookById(id) {
        const index = this._books.findIndex((book) => book.id === id);
        if (index !== -1) {
            this._books.splice(index, 1);
        } else {
            throw new Error("Book not found");
        }
    }
    getBooksByReadingStatus(readingStatus) {
        return this._books.filter((book) => book.reading === readingStatus);
    }

    getBooksByFinishedStatus(finishedStatus) {
        return this._books.filter((book) => book.finished === finishedStatus);
    }
    getBooksByName(name) {
        const lowerCaseName = name.toLowerCase();
        return this._books.filter((book) =>
            book.name.toLowerCase().includes(lowerCaseName)
        );
    }
}

module.exports = BooksRepository;
