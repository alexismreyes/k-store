import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

export default function SigningScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

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

  return (
    <Container style={{ maxWidth: '600px' }}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>{' '}
      {/* my-3 -> margin top and bottom 3 rem */}
      <Form>
        <Form.Group className="mb-3" controlId="email">
          {' '}
          {/* margin bottom 3 rem */}
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          {' '}
          {/* margin bottom 3 rem */}
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required />
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
