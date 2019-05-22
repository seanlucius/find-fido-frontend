import React from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";

class MapComponent extends React.Component {
  state = {
    viewport: {
      width: 800,
      height: 400,
      latitude: this.props.mapCenter[0],
      longitude: this.props.mapCenter[1],
      zoom: 15
    },
    popUpInfo: null
  };

  renderPopup() {
    const { popUpInfo } = this.state;

    return (
      popUpInfo && (
        <Popup
          tipSize={5}
          offsetLeft={20}
          offsetTop={10}
          longitude={popUpInfo.longitude}
          latitude={popUpInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popUpInfo: null })}
        >
          <div>{popUpInfo.name}</div>
          <p>{popUpInfo.instructions}</p>
        </Popup>
      )
    );
  }

  render() {
    return this.props.loading ? (
      <h1>Loading...</h1>
    ) : (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoic2Vhbmx1Y2l1cyIsImEiOiJjanZudmVhZmQwZ3FqNDlxa2RvbDBtajRhIn0.vqWuEx7nomi_EhmWt948ZA"
        }
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onViewportChange={viewport => this.setState({ viewport })}
        />
        {this.props.lostPets.map(pet => (
          <Marker
            key={pet.id}
            latitude={pet.latitude}
            longitude={pet.longitude}
          >
            <div
              className={"marker"}
              onClick={() => this.setState({ popUpInfo: pet })}
            />
          </Marker>
        ))}
        {this.renderPopup()}
      </ReactMapGL>
    );
  }
}

const mapStateToProps = store => ({
  lostPets: store.lostPets,
  loading: store.loading,
  mapCenter: store.mapCenter
});

export default connect(mapStateToProps)(MapComponent);
