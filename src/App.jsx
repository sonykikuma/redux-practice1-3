import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import Bookview from './components/Bookview';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Bookview />
      </div>
    </>
  );
}

export default App;
