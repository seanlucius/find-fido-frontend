import React from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import HomeContainer from "./HomeContainer";
import LostPetForm from "./LostPetForm";
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
          <Route exact path="/" component={HomePage} />
          <Route path="/home_container" component={HomeContainer} />
          <Route path="/register" component={LostPetForm} />
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
