import { Component } from 'react';
import {
  Button,
  Container,
  Col,
  Row,
  Form,
  Navbar,
  ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      searchQuery: '',
    };

    this.radios = [
      { name: 'Light', value: 'light' },
      { name: 'Dark', value: 'dark' },
    ];
  }

  componentDidMount() {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    this.handleThemeChange(prefersDarkMode ? 'dark' : 'light');

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleSystemThemeChange);
  }

  componentWillUnmount() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.handleSystemThemeChange);
  }

  handleSystemThemeChange = e => {
    const prefersDarkMode = e.matches;
    this.handleThemeChange(prefersDarkMode ? 'dark' : 'light');
  };

  handleThemeChange = selectedTheme => {
    this.setState({ theme: selectedTheme });

    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
    document.body.className = `bg-${selectedTheme}`;
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSearch } = this.props;
    const { searchQuery } = this.state;

    onSearch(searchQuery);
  };

  render() {
    const { theme, searchQuery } = this.state;

    return (
      <Navbar bg={theme} variant={theme} fixed="top">
        <Container className="justify-content-center pt-1 pb-1">
          <Row className="justify-content-between mb-2 mb-md-0 align-items-center w-100">
            <Col xs={2} className="ps-0">
              <Navbar.Brand>Image Finder</Navbar.Brand>
            </Col>

            <Col xs={2} md={{ order: 'last' }} className="pe-0">
              <ButtonGroup className="mb-2 mb-md-0 d-flex justify-content-end">
                {this.radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`theme-radio-${idx}`}
                    type="radio"
                    variant={`outline-${theme === 'light' ? 'dark' : 'light'}`}
                    name="theme"
                    value={radio.value}
                    checked={theme === radio.value}
                    onChange={() => this.handleThemeChange(radio.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Col>

            <Col xs={12} md={6} className="ps-0 pe-0">
              <Form onSubmit={this.handleSubmit} className="d-flex">
                <Form.Control
                  type="text"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search images and photos"
                  className="me-2"
                  aria-label="Search"
                  bg={theme}
                  value={searchQuery}
                  onChange={this.handleInputChange}
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}

export default Searchbar;
