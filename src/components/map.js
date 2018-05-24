import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyB-w6uVNO3Cs4EMkSvEojoqeyHnTXOvbQU'};

class Map extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <Gmaps
          width={'800px'}
          height={'600px'}
          lat={this.props.coords.latitude}
          lng={this.props.coords.longitude}
          zoom={12}
          loadingMessage={'Be happy'}
          params={params}
          onMapCreated={this.onMapCreated}>
          <Marker
            lat={this.props.coords.latitude}
            lng={this.props.coords.longitude}/>
            <Marker
              lat={35.901}
              lng={-78}/>
          <InfoWindow
            lat={this.props.coords.latitude}
            lng={this.props.coords.longitude}
            content={'YOU ARE HERE!'}
            onCloseClick={this.onCloseClick} />

        </Gmaps>
      </div>
    );
  }

};

function mapStateToProps(state) {
  return {
    coords: state.currentLocation,
  };
}

export default connect(mapStateToProps)(Map);
