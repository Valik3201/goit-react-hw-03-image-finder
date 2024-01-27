import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md="auto">
          <Button variant="primary" className="w-100" onClick={onClick}>
            Load More
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
