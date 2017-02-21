import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import * as applicationActionCreators from '../actions/application';
import EarthquakeMapComponent from '../component/EarthquakeMap';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hldGFucGluZ2FsZSIsImEiOiJjaXl5ODJxbjQwMDBkMndvY3I0YXg5aXZvIn0.w35lGeEIadlyViRvmizeBg';

class EarthquakeMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapBoxObject: {},
            navListItems: [],
            isMapLoaded: false,
        };
        this.markerObject = null;
        this.drawEarthquakePoints = this.drawEarthquakePoints.bind(this);
        this.navigateToHome = this.navigateToHome.bind(this);
        this.toggleMapData = this.toggleMapData.bind(this);
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            center: [103.8543, 1.2906],
            zoom: 1,
            hash: false,
            style: 'mapbox://styles/mapbox/streets-v9',
        });

        const queryObject = {
            startTime: '2016-01-01',
            endTime: '2016-12-31',
            magnitude: 6,
        };
        this.loadMapData(map, queryObject);
        this.setMapBoxObject(map);
    }
    setMapBoxObject(mapObj) {
        this.setState({ mapBoxObject: mapObj });
    }
    loadMapData(map, queryObject) {
        const that = this;
        this.props.actions.requestData();
        const { startTime, endTime, magnitude } = queryObject;
        fetch(`http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=${magnitude}`)
          .then(response => {
              return response.json();
          }).then(json => {
              if (!_.isEmpty(json.features)) {
                  that.drawEarthquakePoints(map, json);
              } else {
                  alert(`No data for : ${json.metadata.url}`);
              }
              that.props.actions.requestCompleted();
          }).catch(e => {
              console.log('Server error:', e);
          });
    }
    navigateToHome() {
        this.props.actions.navigateToHome();
    }
    toggleMapData() {
        this.markerObject.remove();
        const map = this.state.mapBoxObject;
        const randomYear = Math.floor((Math.random() * 15) + 2001);
        const queryObject = {
            startTime: `${randomYear}-01-01`,
            endTime: `${randomYear}-12-31`,
            magnitude: Math.floor((Math.random() * 5) + 6),
        };
        if (map.getSource('earthquake-points')) {
            map.removeSource('earthquake-points');
            map.removeLayer('earthquake-points');
        }
        this.loadMapData(map, queryObject);
    }
    drawEarthquakePoints(mapBoxObject, data) {
        const map = mapBoxObject;
        map.addLayer({
            id: 'earthquake-points',
            type: 'circle',
            source: {
                type: 'geojson',
                data,
            },
            paint: {
                'circle-radius': 8,
                'circle-color': 'gray',
            },
        });
        const markerPosition = data.features[0].geometry.coordinates;
        const el = document.createElement('div');
        el.id = 'marker';
        el.className = 'marker';
        el.addEventListener('click', () => {
            console.log('Title: ', data.metadata.title);
            console.log('URL: ', data.metadata.url);
        });
        const marker = new mapboxgl.Marker(el, { offset: [-25, -25] })
            .setLngLat([markerPosition[0], markerPosition[1]])
            .addTo(map);
        map.setCenter([markerPosition[0], markerPosition[1]]);
        map.setZoom(1);
        this.markerObject = marker;
    }
    render() {
        const styles = {
            map: {
                width: '40%',
                height: '70%',
                bottom: '0px',
                top: '0px',
                position: 'absolute',
                marginTop: '7%',
                marginLeft: '40%',
            },
        };
        return (
          <div>
            <EarthquakeMapComponent
              styles={styles}
              navigateToHome={this.navigateToHome}
              toggleMapData={this.toggleMapData}
              {...this.props}
              {...this.state}
            />
          </div>
        );
    }
}

EarthquakeMap.propTypes = {
    actions: React.PropTypes.object,
};

const mapStateToProps = state => {
    const headerTitle = state.application.headerTitle;
    const isLoading = state.application.isLoading;
    return { headerTitle, isLoading };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(applicationActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EarthquakeMap);
