import React from "react";
import { connect } from "react-redux";
import { gettingSightingPosition, resetFail } from "../redux/actionCreator";
import { withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

const speciesOptions = [
  { key: "d", text: "Dog", value: "Dog" },
  { key: "c", text: "Cat", value: "Cat" },
  { key: "ro", text: "Rodent", value: "Rodent" },
  { key: "b", text: "Bird", value: "Bird" },
  { key: "l", text: "Livestock", value: "Livestock" },
  { key: "re", text: "Reptile", value: "Reptile" }
];

const ageOptions = [
  { key: "b", text: "Baby(0 - 1yr)", value: "Baby" },
  { key: "y", text: "Young(1 - 3yr)", value: "Young" },
  { key: "a", text: "Adult(3 - 10yr)", value: "Adult" },
  { key: "o", text: "Old(10yr+)", value: "Old" }
];

class PetSightingForm extends React.Component {
  state = {
    picture: "",
    street: "",
    streetError: false,
    city: "",
    cityError: false,
    state: "",
    stateError: false,
    zip: "",
    zipError: false,
    species: "",
    speciesError: false,
    name: "",
    nameError: false,
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
    description: "",
    descriptionError: false,
    formError: false,
    submitted: false
  };

  onPost = e => {
    e.preventDefault();

    let error = false;

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
    if (this.state.name === "") {
      this.setState({ nameError: true });
      error = true;
    } else {
      this.setState({ nameError: false });
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
    if (this.state.description === "") {
      this.setState({ descriptionError: true });
      error = true;
    } else {
      this.setState({ descriptionError: false });
      error = false;
    }

    if (error) {
      this.setState({ formError: true });
      window.alert("Highlighted fields cannot be left empty!");
      return;
    } else {
      this.setState({ formError: false });
    }

    let sighting = {
      picture: this.state.picture,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      species: this.state.species,
      name: this.state.name,
      breed: this.state.breed,
      sex: this.state.sex,
      age: this.state.age,
      color: this.state.color,
      defining_features: this.state.defining_features,
      description: this.state.description
    };

    this.props.gettingSightingPosition(sighting);
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

  handleSpeciesSelect = (e, { value }) => this.setState({ species: value });

  handleAgeSelect = (e, { value }) => this.setState({ age: value });

  handleSexChange = (e, { value }) => this.setState({ sex: value });

  render() {
    const { value } = this.state;
    return (
      <>
        {this.renderRedirect()}
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
              <Header as="h1" color="blue" textAlign="center">
                {" "}
                Post a Possible Lost Pet Sighting
              </Header>
              <Form
                size="large"
                onSubmit={this.onPost}
                error={this.state.formError}
              >
                <Segment className="sightingform">
                  <Form.Input
                    label="Post a picture of the pet"
                    placeholder="Picture"
                    onChange={e => this.setState({ picture: e.target.value })}
                    required={true}
                  />
                  <h4>Address Closest to Sighting:</h4>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="Street Address"
                      placeholder=""
                      onChange={e => this.setState({ street: e.target.value })}
                      error={this.state.streetError}
                      required={true}
                    />
                    <Form.Input
                      label="City"
                      placeholder=""
                      onChange={e => this.setState({ city: e.target.value })}
                      error={this.state.cityError}
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      label="State"
                      placeholder=""
                      onChange={e => this.setState({ state: e.target.value })}
                      error={this.state.stateError}
                      required={true}
                    />
                    <Form.Input
                      label="ZIP Code"
                      placeholder=""
                      onChange={e => this.setState({ zip: e.target.value })}
                      error={this.state.zipError}
                      required={true}
                    />
                  </Form.Group>
                  <Form.Select
                    onChange={this.handleSpeciesSelect}
                    value={value}
                    fluid
                    label="Species"
                    options={speciesOptions}
                    placeholder="Species"
                  />
                  <Form.Input
                    placeholder="Breed"
                    onChange={e => this.setState({ breed: e.target.value })}
                    error={this.state.breedError}
                  />
                  <Form.Group inline>
                    <label>Sex</label>
                    <Form.Radio
                      label="Male"
                      value="Male"
                      checked={this.state.sex === "Male"}
                      onChange={this.handleSexChange}
                    />
                    <Form.Radio
                      label="Female"
                      value="Female"
                      checked={this.state.sex === "Female"}
                      onChange={this.handleSexChange}
                    />
                    <Form.Radio
                      label="Unkown"
                      value="Unkown"
                      checked={this.state.sex === "Unkown"}
                      onChange={this.handleSexChange}
                    />
                  </Form.Group>
                  <Form.Select
                    onChange={this.handleAgeSelect}
                    value={value}
                    fluid
                    options={ageOptions}
                    placeholder="Age"
                  />
                  <Form.Input
                    placeholder="Color"
                    onChange={e => this.setState({ color: e.target.value })}
                    error={this.state.colorError}
                    required={true}
                  />
                  <Form.Input
                    label="Defining Features"
                    placeholder="i.e. marks, unique coloring, name tag, etc."
                    onChange={e =>
                      this.setState({ defining_features: e.target.value })
                    }
                    error={this.state.definingFeaturesError}
                  />
                  <Form.TextArea
                    label="Description of interaction/sighting"
                    placeholder=""
                    onChange={e =>
                      this.setState({ description: e.target.value })
                    }
                    error={this.state.descriptionError}
                  />
                  <Form.Input
                    label="Your e-mail address"
                    placeholder=""
                    onChange={e => this.setState({ name: e.target.value })}
                    error={this.state.nameError}
                    required={true}
                  />
                  <Button color="blue" fluid size="large">
                    Create Pet Sighting
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href="/signup">Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  loading: store.loading,
  failed: store.failed
});

export default withRouter(
  connect(
    mapStateToProps,
    { gettingSightingPosition, resetFail }
  )(PetSightingForm)
);
