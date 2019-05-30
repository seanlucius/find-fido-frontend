import React from "react";
import MapComponent from "./MapComponent";
import { connect } from "react-redux";
import { Grid, Feed } from "semantic-ui-react";

class HomeContainer extends React.Component {
  render() {
    return (
      <Grid celled>
        <Grid.Row style={{ "justify-content": "center" }}>
          <h1 className="title" style={{ "padding-bottom": "10px" }}>
            Find Fido
          </h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            {this.props.currentUser !== null ? (
              <>
                <h3>Your Pet(s)</h3>
                <Feed>
                  {this.props.currentUser.lost_pets.map(p => (
                    <Feed.Event
                      image={p.picture}
                      summary={`Your ${p.species}: ${p.name}`}
                    />
                  ))}
                </Feed>
              </>
            ) : null}
          </Grid.Column>
          <Grid.Column width={10}>
            <MapComponent />
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = store => ({
  lostPets: store.lostPets,
  sightings: store.sightings,
  currentUser: store.currentUser
});

export default connect(mapStateToProps)(HomeContainer);
