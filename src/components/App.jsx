import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';
import { LoadMoreBtn } from './Button';
import { SearchResultInfo } from './SearchResultInfo';
import ErrorAlert from './ErrorAlert';
import NoResultsAlert from './NoResultsAlert';

import { Container, Row } from 'react-bootstrap';

import fetchImages from 'services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from './Loader';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      searchQuery: '',
      currentPage: 1,
      isLoading: false,
      error: null,
      totalHits: 0,
    };
  }

  getImages = async () => {
    const { searchQuery, currentPage } = this.state;

    if (!searchQuery) {
      return;
    }

    try {
      this.setState({
        isLoading: true,
      });

      const { hits, totalHits } = await fetchImages(searchQuery, currentPage);

      // Append new images to the existing ones
      this.setState(prev => ({
        images: [...prev.images, ...hits],
        error: null,
        totalHits: totalHits || 0,
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

  async componentDidUpdate(_prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImages();
    }
  }

  loadMoreImages = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  handleSubmit = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      images: [],
      currentPage: 1,
    });
  };

  render() {
    const { images, searchQuery, isLoading, error, totalHits } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Container className="d-flex flex-column justify-content-center mb-5 mx-auto">
          {isLoading && <Loader />}
          {error && <ErrorAlert errorMessage={error} />}
          {images.length > 0 && !error ? (
            <>
              <Row>
                <SearchResultInfo
                  searchQuery={searchQuery}
                  totalHits={totalHits}
                />
              </Row>
              <Row>
                <ImageGallery images={images} />
              </Row>
              <Row>
                {totalHits > images.length && (
                  <LoadMoreBtn onClick={this.loadMoreImages} />
                )}
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
