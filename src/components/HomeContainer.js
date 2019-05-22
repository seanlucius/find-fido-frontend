import React from "react";
import MapComponent from "./MapComponent";
import { Grid } from "semantic-ui-react";

class HomeContainer extends React.Component {
  render() {
    return (
      <Grid celled>
        <Grid.Column width={3} />
        <Grid.Column width={10}>
          <MapComponent />
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    );
  }
}

export default HomeContainer;
