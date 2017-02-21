import React from 'react';
import Header from '../component/Header';

const ApplicationComponent = props => (
  <div className="wrapper">
    <Header />
    <div>
      {props.children}
    </div>
  </div>
);

ApplicationComponent.defaultProps = {
    children: null,
};

ApplicationComponent.propTypes = {
    children: React.PropTypes.node,
};
export default ApplicationComponent;
