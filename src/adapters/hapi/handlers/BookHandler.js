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
        try {
            const {
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
            } = request.payload;

            // Check if name attribute is present
            if (!name) {
                return h
                    .response({
                        status: "fail",
                        message: "Gagal menambahkan buku. Mohon isi nama buku",
                    })
                    .code(400);
            }

            // Check if readPage is greater than pageCount
            if (readPage > pageCount) {
                return h
                    .response({
                        status: "fail",
                        message:
                            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
                    })
                    .code(400);
            }

            const bookId = this._booksService.addBook({
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                reading,
            });
            return h
                .response({
                    status: "success",
                    message: "Buku berhasil ditambahkan",
                    data: {
                        bookId: bookId,
                    },
                })
                .code(201);
        } catch (error) {
            return h
                .response({
                    status: "fail",
                    message: "Gagal menambahkan buku. Mohon isi nama buku",
                })
                .code(400);
        }
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

    getBookByIdHandler(request, h) {
        const book = this._booksService.getBookById(request.params.id);
        if (!book) {
            return h
                .response({
                    status: "fail",
                    message: "Buku tidak ditemukan",
                })
                .code(404);
        }
        return {
            status: "success",
            data: {
                book,
            },
        };
    }

    putBookByIdHandler(request, h) {
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = request.payload;

        // Check if name attribute is present
        if (!name) {
            return h
                .response({
                    status: "fail",
                    message: "Gagal memperbarui buku. Mohon isi nama buku",
                })
                .code(400);
        }

        // Check if readPage is greater than pageCount
        if (readPage > pageCount) {
            return h
                .response({
                    status: "fail",
                    message:
                        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
                })
                .code(400);
        }

        try {
            this._booksService.updateBookById(
                request.params.id,
                request.payload
            );
            return h
                .response({
                    status: "success",
                    message: "Buku berhasil diperbarui",
                })
                .code(200);
        } catch (error) {
            if (error.message === "Book not found") {
                return h
                    .response({
                        status: "fail",
                        message: "Gagal memperbarui buku. Id tidak ditemukan",
                    })
                    .code(404);
            }
            // handle other errors
        }
    }

    deleteBookByIdHandler(request, h) {
        try {
            this._booksService.deleteBookById(request.params.id);
            return h
                .response({
                    status: "success",
                    message: "Buku berhasil dihapus",
                })
                .code(200);
        } catch (error) {
            if (error.message === "Book not found") {
                return h
                    .response({
                        status: "fail",
                        message: "Buku gagal dihapus. Id tidak ditemukan",
                    })
                    .code(404);
            }
            // handle other errors
        }
    }
}

module.exports = BooksHandler;
