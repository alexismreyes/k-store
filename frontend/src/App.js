import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen.js';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Nav } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Store.js';
import CartScreen from './screens/CartScreen.js';
import SigningScreen from './screens/SigningScreen.js';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        {/* d-flex flex-column are classes from react-bootstrap */}
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              {/* places elements side by side in a row */}
              <LinkContainer to="/">
                <Navbar.Brand>K-Store</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce(
                        //this allow to increase the cart items taking into account the quantity of a same product
                        (acc, cur) => acc + cur.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            {/* class from bootstrap means margin top 3 rem */}
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigningScreen />} />
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
