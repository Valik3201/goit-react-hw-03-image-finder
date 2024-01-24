import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

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

  async componentDidMount() {
    const response = await axios.get(
      `/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState({ images: response.data.hits });
  }

  render() {
    const { images } = this.state;

    return (
      <>
        <Searchbar />
        <div>{images.length > 0 ? <ImageGallery images={images} /> : null}</div>
      </>
    );
  }
}

export default App;
