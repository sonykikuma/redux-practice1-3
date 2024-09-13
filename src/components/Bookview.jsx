import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { fetchBooks } from '../features/books/bookSlice';
import BookList from './BookList';

const Bookview = () => {
  const dispatch = useDispatch();
  const books1 = useSelector((state) => state.books1);
  const status = useSelector((state) => state.staus);
  const error = useSelector((state) => state.error);
  console.log(books1);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className="container p-4">
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1 className="mb-3">Book View</h1>
      <Link to="/addBook" className="rounded px-3 py-2 bg-warning ">
        Add Book
      </Link>

      <BookList books1={books1.books1} />
    </div>
  );
};

export default Bookview;
