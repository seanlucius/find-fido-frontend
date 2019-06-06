import React from "react";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

const MAPBOX_KEY = `${process.env.REACT_APP_MAPBOX_KEY}`;

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
          className="lostpop"
          tipSize={1}
          offsetLeft={20}
          offsetTop={10}
          longitude={popUpInfo.longitude}
          latitude={popUpInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popUpInfo: null })}
        >
          <div className="postername">
            Lost {popUpInfo.species}: {popUpInfo.name}
          </div>
          <img src={popUpInfo.picture} height="80px" alt="pet" />
          <p>Breed: {popUpInfo.breed}</p>
          <p>Age: {popUpInfo.age}</p>
          <p>Color: {popUpInfo.color}</p>
          {this.props.currentUser === null ? (
            <Button as={NavLink} to="/login" color="orange" fluid size="tiny">
              Log in to contact
            </Button>
          ) : (
            <div className="sightingname">
              Contact {popUpInfo.user.name}:
              <p className="poster">
                <a href={`sms:${popUpInfo.user.phone}`}>
                  {popUpInfo.user.phone}
                </a>
              </p>
            </div>
          )}
        </Popup>
      )
    );
  }

  renderSightingPopup() {
    const { sightingPopUpInfo } = this.state;

    return (
      sightingPopUpInfo && (
        <Popup
          className="sightingpop"
          tipSize={1}
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
          {this.props.currentUser === null ? (
            <Button as={NavLink} to="/login" color="blue" fluid size="tiny">
              Log in to contact
            </Button>
          ) : (
            <div className="sightingname">
              Contact Me:
              <p className="poster">
                <a href={`mailto:${sightingPopUpInfo.name}`}>
                  {sightingPopUpInfo.name}
                </a>
              </p>
            </div>
          )}
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
        mapboxApiAccessToken={MAPBOX_KEY}
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
  sightings: store.sightings,
  currentUser: store.currentUser
});

export default withRouter(connect(mapStateToProps)(MapComponent));
