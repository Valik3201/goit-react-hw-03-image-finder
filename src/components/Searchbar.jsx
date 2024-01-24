import { useState } from 'react';
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

export const Searchbar = () => {
  const [theme, setTheme] = useState('light');

  const radios = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  const handleThemeChange = selectedTheme => {
    setTheme(selectedTheme);

    document.documentElement.setAttribute('data-bs-theme', selectedTheme);
  };

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
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`theme-radio-${idx}`}
                  type="radio"
                  variant={`outline-${theme === 'light' ? 'dark' : 'light'}`}
                  name="theme"
                  value={radio.value}
                  checked={theme === radio.value}
                  onChange={() => handleThemeChange(radio.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>

            <Form className="d-flex" as={Col} xs={12} md={6}>
              <Form.Control
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                className="me-2"
                aria-label="Search"
                bg={theme}
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </Form>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};
