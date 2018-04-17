

export const findBook = (bookId, bookArray) => {
        return bookArray.find( el => el.id === bookId );
}