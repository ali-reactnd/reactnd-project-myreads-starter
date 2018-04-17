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

export const addBook = (book, bookArray) => {
    book = isValid(book) ? book : []
    return bookArray.concat([ book ])
}

export const findAndMatch = (newBooks, oldBooks) => {
    if (!isValid(newBooks))
        return []

    return newBooks.map( newBook => {
            let oldBook = findBook(newBook.id, oldBooks)
            return isValid(oldBook) ? oldBook : newBook}
        )
}