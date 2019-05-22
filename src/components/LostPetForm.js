import React from "react";
import { connect } from "react-redux";
import { gettingLostPetPosition } from "../redux/actionCreator";
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
    user_id: 1,
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    picture: "",
    species: "",
    breed: "",
    sex: "",
    age: "",
    color: "",
    defining_features: "",
    instructions: ""
  };

  onPost = e => {
    e.preventDefault();
    let pet = this.state;
    this.props.gettingLostPetPosition(pet);
  };

  render() {
    return (
      <div className="login-form">
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
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
            <Header as="h2" color="teal" textAlign="center">
              {" "}
              Register Lost Pet
            </Header>
            <Form size="large" onSubmit={this.onPost}>
              <Segment stacked>
                <Form.Input
                  label="Your Pet's Name"
                  placeholder=""
                  onChange={e => this.setState({ name: e.target.value })}
                />
                <h4>Address Last Seen At:</h4>
                <Form.Group widths="equal">
                  <Form.Input
                    label="Street Address"
                    placeholder=""
                    onChange={e => this.setState({ street: e.target.value })}
                  />
                  <Form.Input
                    label="City"
                    placeholder=""
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    label="State"
                    placeholder=""
                    onChange={e => this.setState({ state: e.target.value })}
                  />
                  <Form.Input
                    label="ZIP Code"
                    placeholder=""
                    onChange={e => this.setState({ zip: e.target.value })}
                  />
                </Form.Group>
                <Form.Input
                  placeholder="Picture"
                  onChange={e => this.setState({ picture: e.target.value })}
                />
                <Form.Input
                  placeholder="Species"
                  onChange={e => this.setState({ species: e.target.value })}
                />
                <Form.Input
                  placeholder="Breed"
                  onChange={e => this.setState({ breed: e.target.value })}
                />
                <Form.Input
                  placeholder="Sex"
                  onChange={e => this.setState({ sex: e.target.value })}
                />
                <Form.Input
                  placeholder="Age"
                  onChange={e => this.setState({ age: e.target.value })}
                />
                <Form.Input
                  placeholder="Color"
                  onChange={e => this.setState({ color: e.target.value })}
                />
                <Form.Input
                  placeholder="Defining Features"
                  onChange={e =>
                    this.setState({ defining_features: e.target.value })
                  }
                />
                <Form.TextArea
                  placeholder="If found instructions"
                  onChange={e =>
                    this.setState({ instructions: e.target.value })
                  }
                />
                <Button color="teal" fluid size="large">
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
    );
  }
}

export default connect(
  null,
  { gettingLostPetPosition }
)(LostPetForm);
