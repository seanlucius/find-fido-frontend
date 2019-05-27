import React from "react";
import MapComponent from "./MapComponent";
import { Grid } from "semantic-ui-react";

class HomeContainer extends React.Component {
  render() {
    return (
      <Grid celled>
        <Grid.Row style={{ "justify-content": "center" }}>
          <h1>Local Map</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <ul>
              <li>Stuff</li>
              <li>Stuff</li>
            </ul>
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

export default HomeContainer;
