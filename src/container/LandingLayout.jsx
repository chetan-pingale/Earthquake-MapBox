import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as applicationActionCreators from '../actions/application';
import LandingLayoutComponent from '../component/LandingLayout';

class LandingLayout extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToEarthquakeMap = this.navigateToEarthquakeMap.bind(this);
    }

    navigateToEarthquakeMap() {
        this.props.actions.redirectToEathquakeMap('Earthquake Map');
    }

    render() {
        return (
          <LandingLayoutComponent
            navigateToEarthquakeMap={this.navigateToEarthquakeMap}
          />
        );
    }
}

LandingLayout.propTypes = {
    actions: React.PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(applicationActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(LandingLayout);