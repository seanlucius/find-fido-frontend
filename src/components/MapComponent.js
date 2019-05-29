import React from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";

class MapComponent extends React.Component {
  state = {
    viewport: {
      width: "100%",
      height: 500,
      latitude: this.props.mapCenter[0],
      longitude: this.props.mapCenter[1],
      zoom: 12
    },
    popUpInfo: null,
    sightingPopUpInfo: null
  };

  renderPopup() {
    const { popUpInfo } = this.state;

    return (
      popUpInfo && (
        <Popup
          className="poster"
          tipSize={5}
          offsetLeft={20}
          offsetTop={10}
          longitude={popUpInfo.longitude}
          latitude={popUpInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popUpInfo: null })}
        >
          <div className="postername">{popUpInfo.name}</div>
          <img src={popUpInfo.picture} height="80px" alt="pet" />
          <p>Breed: {popUpInfo.breed}</p>
          <p>Age: {popUpInfo.age}</p>
          <p>Color: {popUpInfo.color}</p>
          <button>Conact Owner</button>
          <a href={`sms:${popUpInfo.user.phone}`}>{popUpInfo.user.phone}</a>
        </Popup>
      )
    );
  }

  renderSightingPopup() {
    const { sightingPopUpInfo } = this.state;

    return (
      sightingPopUpInfo && (
        <Popup
          className="poster"
          tipSize={5}
          offsetLeft={20}
          offsetTop={10}
          longitude={sightingPopUpInfo.longitude}
          latitude={sightingPopUpInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ sightingPopUpInfo: null })}
        >
          <div className="postername">Sighted: {sightingPopUpInfo.species}</div>
          <img src={sightingPopUpInfo.picture} height="80px" alt="pet" />
          <p>Breed: {sightingPopUpInfo.breed}</p>
          <p>Age: {sightingPopUpInfo.age}</p>
          <p>Color: {sightingPopUpInfo.color}</p>
          <div className="sightingname">Contact Me:</div>
          <p className="poster">
            <a href={`mailto:${sightingPopUpInfo.name}`}>
              {sightingPopUpInfo.name}
            </a>
          </p>
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
          className="geobutton"
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
              onClick={() =>
                this.setState({ popUpInfo: pet, sightingPopUpInfo: null })
              }
            />
          </Marker>
        ))}
        {this.props.sightings.map(sighting => (
          <Marker
            key={sighting.id}
            latitude={sighting.latitude}
            longitude={sighting.longitude}
          >
            <div
              className={"sighting-marker"}
              onClick={() =>
                this.setState({ popUpInfo: null, sightingPopUpInfo: sighting })
              }
            />
          </Marker>
        ))}
        {this.renderPopup()}
        {this.renderSightingPopup()}
      </ReactMapGL>
    );
  }
}

const mapStateToProps = store => ({
  lostPets: store.lostPets,
  loading: store.loading,
  mapCenter: store.mapCenter,
  sightings: store.sightings
});

export default connect(mapStateToProps)(MapComponent);
