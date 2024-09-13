import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './app/store';
import App from './App.jsx';
import Bookdetail from './pages/Bookdetail';
import './index.css';
import BookForm from './components/BookForm';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/books1/:bookId', element: <Bookdetail /> },
  {path:'/addBook', element:<BookForm/>},
  {path:"/editBook/:bookId", element: <BookForm/>}// for editing book detail
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
