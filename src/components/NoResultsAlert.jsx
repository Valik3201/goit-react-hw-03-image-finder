import { Container, Row, Col, Alert } from 'react-bootstrap';

function NoResultsAlert({ searchQuery }) {
  return (
    <Row>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <Alert variant="warning">
              <Alert.Heading>Oops!</Alert.Heading>
              <p>
                We couldn't find any results for{' '}
                <span className="fw-bold">{searchQuery}</span>.
              </p>
              <hr />
              <p className="mb-0">Please try a different search term.</p>
            </Alert>
          </Col>
        </Row>
      </Container>
    </Row>
  );
}

export default NoResultsAlert;
