/* import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; */
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import '../index.css';

function Product(props) {
  const { product } = props;

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
        <Button
          style={{
            backgroundColor: '#ffc000',
            color: 'black',
            borderColor: 'black',
          }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
