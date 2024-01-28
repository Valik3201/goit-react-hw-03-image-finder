import { Container, Row, Col, Alert } from 'react-bootstrap';

export const SearchResultInfo = ({ searchQuery, totalHits }) => (
  <Container>
    <Row className="justify-content-center text-center">
      <Col xs="auto">
        <Alert variant="primary">
          Showing <span className="fw-bold"> {totalHits}</span> results for
          <span className="fw-bold"> {searchQuery}</span>
        </Alert>
      </Col>
    </Row>
  </Container>
);
