import React from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import HomeContainer from "./HomeContainer";
import LostPetForm from "./LostPetForm";
import PetSightingForm from "./PetSightingForm";
import { Route, Switch, withRouter } from "react-router-dom";
import { fetchingLostPets } from "../redux/actionCreator";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchingLostPets();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/home_container" component={HomeContainer} />
          <Route path="/register" component={LostPetForm} />
          <Route path="/sighting" component={PetSightingForm} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { fetchingLostPets }
  )(App)
);
