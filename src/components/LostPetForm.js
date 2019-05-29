import React from "react";
import { connect } from "react-redux";
import { gettingLostPetPosition, resetFail } from "../redux/actionCreator";
import { withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class LostPetForm extends React.Component {
  state = {
    name: "",
    nameError: false,
    street: "",
    streetError: false,
    city: "",
    cityError: false,
    state: "",
    stateError: false,
    zip: "",
    zipError: false,
    picture: "",
    species: "",
    speciesError: false,
    breed: "",
    breedError: false,
    sex: "",
    sexError: false,
    age: "",
    ageError: false,
    color: "",
    colorError: false,
    defining_features: "",
    definingFeaturesError: false,
    instructions: "",
    instructionsError: false,
    formError: false,
    submitted: false
  };

  onPost = e => {
    e.preventDefault();

    let error = false;

    if (this.state.name === "") {
      this.setState({ nameError: true });
      error = true;
    } else {
      this.setState({ nameError: false });
      error = false;
    }
    if (this.state.street === "") {
      this.setState({ streetError: true });
      error = true;
    } else {
      this.setState({ streetError: false });
      error = false;
    }
    if (this.state.city === "") {
      this.setState({ cityError: true });
      error = true;
    } else {
      this.setState({ cityError: false });
      error = false;
    }
    if (this.state.state === "") {
      this.setState({ stateError: true });
      error = true;
    } else {
      this.setState({ stateError: false });
      error = false;
    }
    if (this.state.zip === "") {
      this.setState({ zipError: true });
      error = true;
    } else {
      this.setState({ zipError: false });
      error = false;
    }
    if (this.state.species === "") {
      this.setState({ speciesError: true });
      error = true;
    } else {
      this.setState({ speciesError: false });
      error = false;
    }
    if (this.state.breed === "") {
      this.setState({ breedError: true });
      error = true;
    } else {
      this.setState({ breedError: false });
      error = false;
    }
    if (this.state.sex === "") {
      this.setState({ sexError: true });
      error = true;
    } else {
      this.setState({ sexError: false });
      error = false;
    }
    if (this.state.age === "") {
      this.setState({ ageError: true });
      error = true;
    } else {
      this.setState({ ageError: false });
      error = false;
    }
    if (this.state.color === "") {
      this.setState({ colorError: true });
      error = true;
    } else {
      this.setState({ colorError: false });
      error = false;
    }
    if (this.state.defining_features === "") {
      this.setState({ definingFeaturesError: true });
      error = true;
    } else {
      this.setState({ definingFeaturesError: false });
      error = false;
    }
    if (this.state.instructions === "") {
      this.setState({ instructionsError: true });
      error = true;
    } else {
      this.setState({ instructionsError: false });
      error = false;
    }

    if (error) {
      this.setState({ formError: true });
      return;
    } else {
      this.setState({ formError: false });
    }

    let pet = {
      user_id: this.props.currentUser.id,
      name: this.state.name,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      picture: this.state.picture,
      species: this.state.species,
      breed: this.state.breed,
      sex: this.state.sex,
      age: this.state.age,
      color: this.state.color,
      defining_features: this.state.defining_features,
      instructions: this.state.instructions
    };

    this.props.gettingLostPetPosition(pet);
    this.setState({
      submitted: true
    });
  };

  renderRedirect = () => {
    if (
      this.props.failed === true &&
      this.props.loading === true &&
      this.state.submitted
    ) {
      window.alert("Address not found, please enter a different location.");
      this.setState({
        submitted: false
      });
      this.props.resetFail();
    }

    if (
      this.props.failed !== true &&
      this.props.loading !== true &&
      this.state.submitted
    ) {
      return <Redirect to="/home_container" />;
    }
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        {this.props.currentUser === null ? (
          <Header as="h1" color="orange" textAlign="center">
            {" "}
            You Must Log In or Create an Account to Register a Lost Pet!
          </Header>
        ) : (
          <div className="login-form">
            <style>
              {`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
            </style>
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 550 }}>
                <Header as="h1" color="orange" textAlign="center">
                  {" "}
                  Register Lost Pet
                </Header>
                <Form
                  size="large"
                  onSubmit={this.onPost}
                  error={this.state.formError}
                >
                  <Segment className="lostform">
                    <Form.Input
                      label="Your Pet's Name"
                      placeholder=""
                      onChange={e => this.setState({ name: e.target.value })}
                      error={this.state.nameError}
                    />
                    <h4>Address Last Seen At:</h4>
                    <Form.Group widths="equal">
                      <Form.Input
                        label="Street Address"
                        placeholder=""
                        onChange={e =>
                          this.setState({ street: e.target.value })
                        }
                        error={this.state.streetError}
                        required={true}
                      />
                      <Form.Input
                        label="City"
                        placeholder=""
                        onChange={e => this.setState({ city: e.target.value })}
                        error={this.state.cityError}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Input
                        label="State"
                        placeholder=""
                        onChange={e => this.setState({ state: e.target.value })}
                        error={this.state.stateError}
                      />
                      <Form.Input
                        label="ZIP Code"
                        placeholder=""
                        onChange={e => this.setState({ zip: e.target.value })}
                        error={this.state.zipError}
                      />
                    </Form.Group>
                    <Form.Input
                      placeholder="Picture"
                      onChange={e => this.setState({ picture: e.target.value })}
                    />
                    <Form.Input
                      placeholder="Species"
                      onChange={e => this.setState({ species: e.target.value })}
                      error={this.state.speciesError}
                    />
                    <Form.Input
                      placeholder="Breed"
                      onChange={e => this.setState({ breed: e.target.value })}
                      error={this.state.breedError}
                    />
                    <Form.Input
                      placeholder="Sex"
                      onChange={e => this.setState({ sex: e.target.value })}
                      error={this.state.sexError}
                    />
                    <Form.Input
                      placeholder="Age"
                      onChange={e => this.setState({ age: e.target.value })}
                      error={this.state.ageError}
                    />
                    <Form.Input
                      placeholder="Color"
                      onChange={e => this.setState({ color: e.target.value })}
                      error={this.state.colorError}
                    />
                    <Form.Input
                      placeholder="Defining Features"
                      onChange={e =>
                        this.setState({ defining_features: e.target.value })
                      }
                      error={this.state.definingFeaturesError}
                    />
                    <Form.TextArea
                      placeholder="If found instructions"
                      onChange={e =>
                        this.setState({ instructions: e.target.value })
                      }
                      error={this.state.instructionsError}
                    />
                    <Button color="orange" fluid size="large">
                      Create Lost Poster
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href="#">Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.loading,
  failed: store.failed,
  currentUser: store.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    { gettingLostPetPosition, resetFail }
  )(LostPetForm)
);
