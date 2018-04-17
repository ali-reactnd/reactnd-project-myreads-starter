export const findBook = (bookId, bookArray) => {
        return bookArray.find( el => el.id === bookId );
}

export const isValid = (object) => {
    return (!!object);
}


export const updateBook = (book, shelf, bookArray) => {
    book.shelf = shelf;
    return bookArray.map( el => el.id === book.id ? book : el )
}