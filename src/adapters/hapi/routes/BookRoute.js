const BooksHandler = require("../handlers/bookHandler");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: (request, h) => new BooksHandler().postBookHandler(request, h),
    },
    {
        method: "GET",
        path: "/books",
        handler: (request, h) => new BooksHandler().getBooksHandler(request, h),
    },
    {
        method: "GET",
        path: "/books/{id}",
        handler: (request, h) =>
            new BooksHandler().getBookByIdHandler(request, h),
    },
    {
        method: "PUT",
        path: "/books/{id}",
        handler: (request, h) =>
            new BooksHandler().putBookByIdHandler(request, h),
    },
    {
        method: "DELETE",
        path: "/books/{id}",
        handler: (request, h) =>
            new BooksHandler().deleteBookByIdHandler(request, h),
    },
];

module.exports = routes;
