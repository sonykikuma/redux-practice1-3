import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { addBook, updateBookAsync } from '../features/books/bookSlice';

const BookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookToEdit = location.state?.book || null;

  const [bookname, setBookname] = useState(
    bookToEdit ? bookToEdit.bookName : ''
  );
  const [author, setAuthor] = useState(bookToEdit ? bookToEdit.author : '');
  const [genre, setGenre] = useState(bookToEdit ? bookToEdit.genre : '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookToEdit && Object.keys(bookToEdit).length > 0) {
      setBookname(bookToEdit.bookName || '');
      setAuthor(bookToEdit.author || '');
      setGenre(bookToEdit.genre || '');
    }
  }, [bookToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!bookname || !author || !genre) {
      setError('All fields are required.');
      return;
    }

    const newBook = {
      bookName: bookname,
      author: author,
      genre: genre,
    };

    if (bookToEdit) {
      console.log('Updating book:', newBook); // Add console log for debugging
      dispatch(updateBookAsync({ ...bookToEdit, ...newBook }));
    } else {
      dispatch(addBook(newBook));
    }

    setBookname(' ');
    setAuthor(' ');
    setGenre(' ');
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2>{bookToEdit ? 'Edit Book' : 'Add Book'}</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder="Book Name"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <br />

          <button type="submit">
            {bookToEdit ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      </div>
    </>
  );
};
export default BookForm;
