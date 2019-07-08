import React from "react";
import { connect } from "react-redux";
import { userLogIn } from "../redux/actionCreator";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: ""
  };

  // LOGIN FUNCTION DOES POST FETCH TO AUTH CONTROLLER ON BACKEND, SETS JWT IN LOCAL STORAGE IF SUCCESSFUL
  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(r => r.json())
      .then(d => {
        if (d["status"] === "accepted") {
          localStorage.setItem("token", d.jwt);
          this.props.userLogIn(d.user);
          window.alert(`Welcome, back ${d.user.name}!`);
          this.props.history.push("/home_container");
        } else {
          window.alert(d.message);
        }
      });
  };

  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Log in to your account
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />

              <Button color="blue" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/signup">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  null,
  { userLogIn }
)(LoginForm);
