import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Image, Table } from 'react-bootstrap';
import parse from 'html-react-parser';

import { MainContext } from '../Main';

function ItemDetails() {
  const { dataState } = useContext(MainContext);

  const [ytIframe, setYtIframe] = useState({});
  useEffect(() => {
    if (dataState.playlist.data)
      setYtIframe(
        parse(dataState.playlist.data.items[0].player.embedHtml).props
      );
  }, [dataState]);
  return (
    <Card
      border={false}
      className="shadow sticky-top overflow-auto w-100"
      style={{ maxHeight: '100vh' }}
    >
      <div className="yt-embed-container">
        <Card.Img variant="top" as="iframe" {...ytIframe} />
      </div>
      <Card.Body>
        <h5>the smartest person ever</h5>
        <Row className="g-0 align-items-center my-1 mt-3">
          <Col
            md={4}
            xs={4}
            className="my-auto"
            style={{ width: '5vw', maxWidth: '80px', minWidth: '50px' }}
          >
            <Image
              fluid
              roundedCircle
              src={
                'https://yt3.ggpht.com/Zv2uW6HRszX6QhU7N-IRq7R7ZPAgINwBmbc36C-kmhFGckbRlWODC17juSPI9CCAOPY0ho8ld-I=s240-c-k-c0x00ffffff-no-rj'
              }
              alt="GabeSweats"
            />
          </Col>
          <Col md xs>
            <Card.Body className="p-2">
              <Card.Title as="h6" className="mb-1">
                GabeSweats
              </Card.Title>
              <p className="small h6 text-muted m-0">1.07M subscribers</p>
              <p className="small h6 text-muted m-0">111 videos</p>
            </Card.Body>
          </Col>
        </Row>

        <Table borderless className="mt-3">
          <tbody>
            <tr>
              <th>Total viewers</th>
              <td>20478719</td>
            </tr>
            <tr>
              <th>Published date</th>
              <td>12 September 2021</td>
            </tr>
            <tr>
              <th>Published time</th>
              <td>3:15:00 AM</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>00:54</td>
            </tr>
            <tr>
              <th colSpan={2}>Description</th>
            </tr>
            <tr>
              <td colSpan={2}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                sapiente illum ratione officia, commodi deserunt, eveniet
                consequuntur expedita nemo sit ex consectetur similique in
                officiis explicabo ipsa molestiae alias dolorum consequatur.
                Magni, voluptate maxime. Rem a dignissimos quo beatae eius
                aliquid accusantium culpa eum qui numquam explicabo quod totam
                facilis cum ad, fuga nulla minima, quas magnam sit tenetur. Nisi
                porro molestias cum vel quia ad voluptatibus quas iusto aut
                magni! Perspiciatis excepturi hic eaque esse quasi quas
                voluptates, quia tenetur natus tempora temporibus quam
                recusandae consequuntur veniam, facilis necessitatibus
                assumenda! Iure adipisci non animi neque recusandae architecto,
                eos iste.
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ItemDetails;
