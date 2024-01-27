import { Container, Row, Col, Alert } from 'react-bootstrap';

function ErrorAlert({ errorMessage }) {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>{errorMessage}</p>
            <hr />
            <p className="mb-0">
              Please try again or check your internet connection.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default ErrorAlert;
