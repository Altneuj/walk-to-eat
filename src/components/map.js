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
          lng={this.props.coords.longitude}
          draggable={true}
          onDragEnd={this.onDragEnd} />
          <Marker
            lat={35.901}
            lng={-78}
            draggable={true}
            onDragEnd={this.onDragEnd} />
        <InfoWindow
          lat={this.props.coords.latitude}
          lng={this.props.coords.longitude}
          content={'Hello, React :)'}
          onCloseClick={this.onCloseClick} />

      </Gmaps>
    );
  }

};

function mapStateToProps(state) {
  return {
    coords: state.currentLocation,
  };
}

export default connect(mapStateToProps)(Map);
