import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

const LandingLayoutComponent = props => (
  <Grid fluid>
    <Row>
      <Col mdOffset={4} md={4}>
        <h4>Home Page</h4>
      </Col>
    </Row>
    <Row>
      <Col mdOffset={4} md={4}>
        <ul>
          <li className="custom-link" onClick={props.navigateToEarthquakeMap}>
            <h4>Earthquake Map </h4>
          </li>
        </ul>
      </Col>
    </Row>
  </Grid>
);

LandingLayoutComponent.propTypes = {
    navigateToEarthquakeMap: React.PropTypes.func,
};

export default LandingLayoutComponent;
