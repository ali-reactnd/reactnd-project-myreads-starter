import React from 'react'
import './App.css'
import { Shelf } from "./Shelf"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const MainUI = (props) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div> {Object.keys(props.shelves).map(
                            (shelfKey, index) => 
                            <Shelf 
                                key={index} 
                                shelfKey={shelfKey} 
                                shelves={props.shelves} 
                                books={props.books}
                                isValid={props.isValid}
                                bookShelfChanger={props.bookShelfChanger} 
                            />
                )} </div>
            </div>
            <div className='open-search'> 
                <Link to='/search' className='open-search'>Add a book</Link>
            </div>
        </div>
    );
}



MainUI.propTypes = {
    shelves: PropTypes.object.isRequired, 
    books: PropTypes.array.isRequired,
    bookShelfChanger: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired
}