import { Component } from 'react';
import Searchbar from './Searchbar';
import { ImageGallery } from './ImageGallery';
import ImagePortalWelcome from './ImagePortalWelcome';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '41006597-e52c63fe5093395ccafd50f48';

axios.defaults.baseURL = 'https://pixabay.com/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  getImages = async searchQuery => {
    try {
      const response = await axios.get(
        `/?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({ images: response.data.hits });
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
    const { images } = this.state;

    return (
      <>
        <Searchbar onSearch={this.getImages} />
        <div>
          {images.length > 0 ? (
            <ImageGallery images={images} />
          ) : (
            <ImagePortalWelcome />
          )}
        </div>
      </>
    );
  }
}

export default App;
