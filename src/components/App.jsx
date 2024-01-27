import { Component } from 'react';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';
import { LoadMoreBtn } from './Button';
import { SearchResultInfo } from './SearchResultInfo';
import ErrorAlert from './ErrorAlert';
import NoResultsAlert from './NoResultsAlert';

import { Container, Row } from 'react-bootstrap';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from './Loader';

const API_KEY = '41006597-e52c63fe5093395ccafd50f48';

axios.defaults.baseURL = 'https://pixabay.com/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      searchQuery: '',
      activePage: 1,
      isLoading: false,
      error: null,
    };
  }

  getImages = async (searchQuery, activePage) => {
    try {
      this.setState({
        isLoading: true,
      });

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
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  loadMoreImages = () => {
    const { searchQuery, activePage } = this.state;
    const nextPage = activePage + 1;

    this.getImages(searchQuery, nextPage);
    this.setState({ activePage: nextPage });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.getImages(this.props.searchQuery);
    }
  }

  render() {
    const { images, searchQuery, isLoading, error } = this.state;

    return (
      <>
        <Searchbar onSearch={this.getImages} />
        <Container className="d-flex flex-column justify-content-center mb-5 mx-auto">
          {isLoading && <Loader />}
          {error && <ErrorAlert errorMessage={error} />}
          {images.length > 0 && !error ? (
            <>
              <Row>
                <SearchResultInfo searchQuery={searchQuery} />
              </Row>
              <Row>
                <ImageGallery images={images} />
              </Row>
              <Row>
                <LoadMoreBtn onClick={this.loadMoreImages} />
              </Row>
            </>
          ) : images.length === 0 && searchQuery && !error ? (
            <Row>
              <NoResultsAlert searchQuery={searchQuery} />
            </Row>
          ) : (
            !error && <ImagePortalWelcome />
          )}
        </Container>
      </>
    );
  }
}

export default App;
