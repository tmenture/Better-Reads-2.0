import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveBook, searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

import { SAVE_BOOK } from '../utils/mutations';
import {useMutation} from '@apollo/react-hooks';

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook, {error}]  = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleSaveBook = async (bookId) => {

    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveBook({
        variables: { input: { ...bookToSave } }
      });


      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid id='jumboSearch'>
        <Container id='search-text'>
          <h1 id='search'>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row id='form-row'>
              <Col xs={12} lg={11} md={9} sm={7}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} lg={1} md={2} sm={3} id='submit-button'>
                <Button type='submit' id='submit'>
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container id='searched-text'>
        <h2 id='searched'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : ''}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} id='card-holder'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button id='save'
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;