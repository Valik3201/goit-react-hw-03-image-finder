import { Container, Row, Col, Alert } from 'react-bootstrap';

function ImagePortalWelcome() {
  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center vh-100 position-absolute top-0 start-0">
        <Col xs={8} md={6}>
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you!</Alert.Heading>
            <p>
              Explore over 4.3 million+ high-quality stock images shared by
              talented community. This site is powered by the Pixabay API,
              providing you with a vast collection of visuals for your creative
              projects.
            </p>
            <hr />
            <p className="mb-0">
              Simply enter your search query, and voilà! Discover a world of
              captivating visuals at your fingertips.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default ImagePortalWelcome;
