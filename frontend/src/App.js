import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen.js';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {' '}
        {/* d-flex flex-column are classes from react-bootstrap */}
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              {/* places elements side by side in a row */}
              <LinkContainer to="/">
                <Navbar.Brand>K-Store</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            {/* class from bootstrap means margin top 3 rem */}
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>{' '}
          {/* text-center is from react-boostrap */}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
