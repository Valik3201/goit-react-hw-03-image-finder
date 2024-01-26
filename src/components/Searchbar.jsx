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

  handleThemeChange = selectedTheme => {
    this.setState({ theme: selectedTheme });

    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
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
      <div>
        <Navbar bg={theme} variant={theme} fixed="top">
          <Container className="justify-content-center pt-1 pb-1">
            <Row className="mb-2 mb-md-0 justify-content-between align-items-center w-100">
              <Navbar.Brand as={Col} xs={2}>
                Image Finder
              </Navbar.Brand>

              <ButtonGroup
                as={Col}
                xs={2}
                md={{ order: 'last' }}
                className="mb-2 mb-md-0 d-flex justify-content-end"
              >
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

              <Col xs={12} md={6}>
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
      </div>
    );
  }
}

export default Searchbar;
