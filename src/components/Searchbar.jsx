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
  const [radioValue, setRadioValue] = useState('light');

  const radios = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
  ];

  const handleThemeChange = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  };

  return (
    <div>
      <Navbar bg="light" data-bs-theme="light" fixed="top">
        <Container className="justify-content-center">
          <Row className="mb-2 mb-md-0 justify-content-between align-items-center w-100">
            <Navbar.Brand as={Col} xs={2} href="#">
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
                  variant="secondary"
                  name="theme"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={e => {
                    setRadioValue(e.currentTarget.value);
                    handleThemeChange(e.currentTarget.value);
                  }}
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
