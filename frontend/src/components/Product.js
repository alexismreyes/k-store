/* import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; */
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../index.css';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id); //does the current product already exists in cart?
    const quantity = existItem ? existItem.quantity + 1 : 1; //if exists add one more product to cart, if not add one
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
        {/* card-img-top is from react-boostrap to place the element top inside the Card */}
      </Link>
      <Card.Body>
        <Link href={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled variant="light">
            Out of Stock
          </Button>
        ) : (
          <Button
            style={{
              backgroundColor: '#ffc000',
              color: 'black',
              borderColor: 'black',
            }}
            onClick={() => addToCartHandler(product)}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
