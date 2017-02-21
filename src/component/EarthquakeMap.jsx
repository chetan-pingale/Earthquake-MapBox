import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { FadingCircle } from 'better-react-spinkit';

const EathquakeMap = props => (
  <Grid fluid>
    <Row>
      <Col md={3} mdOffset={1}>
        <ol className="breadcrumb">
          <li><a onClick={props.navigateToHome}>Home</a></li>
          <li className="active">Eathquake Map</li>
        </ol>
      </Col>
    </Row>
    <Row>
      <Col md={3} mdOffset={3}>
        <Button
          disabled={props.isLoading}
          onClick={props.toggleMapData}
          bsStyle="primary"
        >
          Toggle Map Data
        </Button>
      </Col>
    </Row>
    <Row>
      <div id="map" style={props.styles.map} />
    </Row>
    {
      props.isLoading ? <FadingCircle size={100} className="custom-spinner" /> : null
    }
  </Grid>
);

EathquakeMap.propTypes = {
    navigateToHome: React.PropTypes.func,
    toggleMapData: React.PropTypes.func,
    styles: React.PropTypes.object,
    isLoading: React.PropTypes.bool,
}
export default EathquakeMap;
