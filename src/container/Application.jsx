import React from 'react';
import ApplicationComponent from '../component/Application';

class Application extends React.Component {
    render() {
        return (
          <ApplicationComponent {...this.props} {...this.state} />
        );
    }
}

export default Application;
