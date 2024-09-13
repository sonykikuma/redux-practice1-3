import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBook } from '../features/books/bookSlice';
import Header from '../components/Header';

const Booksdetail = () => {
  const books1 = useSelector((state) => state.books1.books1);
  const status = useSelector((state) => state.books1.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();

  const bookData = books1.find((book) => book._id === bookId);
  // console.log(bookData);

  const deleteHandler = () => {
    dispatch(deleteBook(bookId))
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        console.error('failed to delete student');
      });
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!bookData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="container p-3">
        {status === 'loading && <p>Loading...</p>'}
        <h1>Book Detail</h1>
        <p>Book Name: {bookData.bookName}</p>
        <p> Author: {bookData.author}</p>
        <p> Genre: {bookData.genre}</p>
        <div>
          <Link
            to={`/editBook/${bookData._id}`}
            state={{ book: bookData }}
            className=" bg-warning p-3 rounded "
          >
            Edit Details
          </Link>
          <span className="ms-2 ">
            {' '}
            <button onClick={deleteHandler} className="btn btn-danger">
              Delete
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Booksdetail;
