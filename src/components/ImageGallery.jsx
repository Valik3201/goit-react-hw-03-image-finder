import { Container, Col, Row, Image } from 'react-bootstrap';

export const ImageGallery = ({ images }) => (
  <Container className="justify-content-center">
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      <ImageGalleryItem images={images} />
    </Row>
  </Container>
);

const ImageGalleryItem = ({ images }) => (
  <>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <Col key={id}>
        <Image
          src={webformatURL}
          alt={tags}
          rounded
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
      </Col>
    ))}
  </>
);

ImageGallery.Item = ImageGalleryItem;
