// src/adapters/hapi/handlers/BooksHandler.js
const BooksRepository = require("../../repositories/BookRepository");
const BooksService = require("../../services/BookService");

const booksRepository = new BooksRepository();
const booksService = new BooksService(booksRepository);

class BooksHandler {
    constructor() {
        this._booksService = booksService;
    }

    postBookHandler(request, h) {
        this._booksService.addBook(request.payload);
        return h
            .response({
                status: "success",
                message: "Buku berhasil ditambahkan",
            })
            .code(201);
    }

    getBooksHandler() {
        const books = this._booksService.getBooks();
        return {
            status: "success",
            data: {
                books,
            },
        };
    }

    getBookByIdHandler(request) {
        const book = this._booksService.getBookById(request.params.id);
        return {
            status: "success",
            data: {
                book,
            },
        };
    }

    putBookByIdHandler(request, h) {
        this._booksService.updateBookById(request.params.id, request.payload);
        return h
            .response({
                status: "success",
                message: "Buku berhasil diperbarui",
            })
            .code(200);
    }

    deleteBookByIdHandler(request, h) {
        this._booksService.deleteBookById(request.params.id);
        return h
            .response({
                status: "success",
                message: "Buku berhasil dihapus",
            })
            .code(200);
    }
}

module.exports = BooksHandler;
