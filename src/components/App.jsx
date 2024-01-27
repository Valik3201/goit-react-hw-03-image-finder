import { Component } from 'react';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';
import { LoadMoreBtn } from './Button';

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
      activePage: 1,
    };
  }

  getImages = async (searchQuery, activePage) => {
    try {
      const params = {
        q: searchQuery,
        page: activePage,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      };

      const response = await axios.get('/', { params });

      this.setState(prevState => ({
        images:
          searchQuery !== prevState.searchQuery
            ? response.data.hits
            : [...prevState.images, ...response.data.hits],

        activePage: searchQuery !== prevState.searchQuery ? 1 : activePage,

        searchQuery,
      }));
    } catch (error) {
      console.error('Error searching for images:', error.message);
    } finally {
      // for Loader
    }
  };

  loadMoreImages = () => {
    const { searchQuery, activePage } = this.state;
    const nextPage = activePage + 1;

    this.getImages(searchQuery, nextPage);
    this.setState({ activePage: nextPage });
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
        <Container className="d-flex flex-column justify-content-center mb-5 mx-auto">
          {images.length > 0 ? (
            <>
              <Row>
                <Container>
                  <Row className="justify-content-center text-center">
                    <Col xs="auto">
                      <Alert variant="primary">
                        Showing results for
                        <span className="fw-bold"> {searchQuery}</span>
                      </Alert>
                    </Col>
                  </Row>
                </Container>
              </Row>
              <Row>
                <ImageGallery images={images} />
              </Row>
              <Row>
                <LoadMoreBtn onClick={this.loadMoreImages} />
              </Row>
            </>
          ) : (
            <ImagePortalWelcome />
          )}
        </Container>
      </>
    );
  }
}

export default App;
