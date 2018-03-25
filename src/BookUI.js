import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

const validateShelf = (shelf, shelves) => {
    return Object.keys(shelves).some( s => s===shelf ) ? shelf : "none"
}


const BookShelfChangerUI = (bookId, shelf, shelves, bookShelfChanger) => (
    <select id="BookShelfSelector" value={validateShelf(shelf, shelves)} 
            onChange={event => bookShelfChanger(bookId, event.target.value)}>
        <option value="none" disabled>Move to...</option>
        {Object.keys(shelves).map(
            (shelfKey, index) => <option key={index} value={shelfKey}>{shelves[shelfKey]}</option>)}
        <option value="none">None</option>
    </select>
)


const display = (book, shelves, bookShelfChanger) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}></div>
            <div className="book-shelf-changer">
                {BookShelfChangerUI(book.id, book.shelf, shelves, bookShelfChanger)}
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.toString() : null}</div>
    </div>
)


export const BookUI = (props) => {

    return (
        props.book ? display(props.book, props.shelves, props.bookShelfChanger) : null 
    )

}