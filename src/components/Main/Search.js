import React from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

function Search() {
  return (
    <section className="my-5 search-section">
      <Container fluid>
        <Row>
          <Col md={10} className="mx-auto">
            <h3>Insert Youtube Playlist Id</h3>
            <InputGroup as="form" className="mb-3">
              <InputGroup.Text
                as="label"
                htmlFor="pl-id"
                className="overflow-auto pl-id-input"
              >
                https://www.youtube.com/playlist?list=
              </InputGroup.Text>
              <FormControl
                placeholder="Youtube Playlist ID"
                id="pl-id"
                aria-describedby="playlist-id"
                className="pl-id-input"
                type="text"
              />
              <Button type="submit" variant="secondary">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Search;
