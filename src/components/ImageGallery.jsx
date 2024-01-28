import { Component } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { ImageModal } from './Modal';

class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedImage: null,
    };
  }

  openModal = image => {
    this.setState({
      showModal: true,
      selectedImage: image,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      selectedImage: null,
    });
  };

  render() {
    const { images } = this.props;
    const { showModal, selectedImage } = this.state;

    return (
      <Container className="justify-content-center">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {images.map(
            (
              { id, webformatURL, largeImageURL, tags, user, userImageURL },
              index
            ) => (
              <ImageGallery.Item
                key={`${index}-${id}`}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                user={user}
                userImageURL={userImageURL}
                openModal={this.openModal}
              />
            )
          )}
        </Row>

        <ImageModal
          showModal={showModal}
          selectedImage={selectedImage}
          closeModal={this.closeModal}
        />
      </Container>
    );
  }
}

class ImageGalleryItem extends Component {
  render() {
    const { id, largeImageURL, tags, openModal, user, userImageURL } =
      this.props;

    return (
      <Col
        key={id}
        onClick={() =>
          openModal({ id, largeImageURL, tags, user, userImageURL })
        }
      >
        <Image
          src={largeImageURL}
          alt={tags}
          role="button"
          rounded
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
      </Col>
    );
  }
}

ImageGallery.Item = ImageGalleryItem;

export default ImageGallery;
