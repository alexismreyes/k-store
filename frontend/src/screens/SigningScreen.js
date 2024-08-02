import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store.js';
import { toast } from 'react-toastify';
import { getError } from '../utils.js';

export default function SigningScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  /*   Example Scenario
Consider the URL: http://example.com?redirect=/dashboard

useLocation() will provide the location object, and search will be '?redirect=/dashboard'.
new URLSearchParams(search).get('redirect') will extract the value /dashboard.
redirectInUrl will be /dashboard.
redirect will be set to /dashboard because redirectInUrl is not null.
If the URL does not contain the redirect parameter, such as http://example.com, then:

new URLSearchParams(search).get('redirect') will return null.
redirectInUrl will be null.
redirect will be set to '/'. */

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      //alert('Invalid email or password!');}
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container style={{ maxWidth: '600px' }}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>{' '}
      {/* my-3 -> margin top and bottom 3 rem */}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          {' '}
          {/* margin bottom 3 rem */}
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          {' '}
          {/* margin bottom 3 rem */}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
