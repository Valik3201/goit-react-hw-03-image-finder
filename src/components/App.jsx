import { Component } from 'react';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';

import { Container, Row, Col, Alert } from 'react-bootstrap';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '41006597-e52c63fe5093395ccafd50f48';

axios.defaults.baseURL = 'https://pixabay.com/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      searchQuery: '',
    };
  }

  getImages = async searchQuery => {
    try {
      const response = await axios.get(
        `/?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({ images: response.data.hits, searchQuery });
    } catch (error) {
      console.error('Error searching for images:', error);
    } finally {
      // for Loader
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.getImages(this.props.searchQuery);
    }
  }

  render() {
    const { images, searchQuery } = this.state;

    return (
      <>
        <Searchbar onSearch={this.getImages} />
        <Container>
          {images.length > 0 ? (
            <Row className="d-flex justify-content-center mb-5 mx-auto">
              <Alert
                variant="primary"
                as={Col}
                style={{ width: 'fit-content' }}
              >
                Showing results for
                <span className="fw-bold"> {searchQuery}</span>
              </Alert>

              <ImageGallery images={images} />
            </Row>
          ) : (
            <ImagePortalWelcome />
          )}
        </Container>
      </>
    );
  }
}

export default App;
