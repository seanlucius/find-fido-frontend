import React from "react";
import { connect } from "react-redux";
import { userLogIn } from "../redux/actionCreator";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

class LoginForm extends React.Component {
  state = {
    name: "",
    phone: "",
    email: "",
    address: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        password: this.state.password
      })
    })
      .then(r => r.json())
      .then(d => {
        if (d["status"] === "created") {
          localStorage.setItem("token", d.jwt);
          this.props.userLogIn(d.user);
          window.alert(`Welcome, ${d.user.name}!`);
          this.props.history.push("/home_container");
        } else {
          window.alert(d.error);
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
            Sign up for an account
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Name"
                onChange={e => this.setState({ name: e.target.value })}
              />
              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Phone Number"
                onChange={e => this.setState({ phone: e.target.value })}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Form.Input
                fluid
                icon="home"
                iconPosition="left"
                placeholder="Home Address"
                onChange={e => this.setState({ address: e.target.value })}
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
                Create Account
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  null,
  { userLogIn }
)(LoginForm);
