import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userLogOut } from "../redux/actionCreator";

class Navbar extends React.Component {
  handleLogOut = () => {
    localStorage.removeItem("token");
    this.props.userLogOut();
    this.props.history.push("/");
    window.alert("Logged out. Goodbye!");
  };

  render() {
    return (
      <Menu size="large" stackable>
        <Menu.Item as={NavLink} exact to="/">
          <i class="paw icon" />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/register">
          Register Pet
        </Menu.Item>
        <Menu.Item as={NavLink} to="/sighting">
          Post Sighting
        </Menu.Item>
        <Menu.Item as={NavLink} to="/home_container">
          Map
        </Menu.Item>
        {this.props.currentUser !== null ? (
          <Menu.Menu position="right">
            <Menu.Item>Account</Menu.Item>
            <Menu.Item position="right" onClick={this.handleLogOut}>
              Log Out
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item as={NavLink} to="/signup">
              Sign Up
            </Menu.Item>
            <Menu.Item position="right" as={NavLink} to="/login">
              Log In
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    { userLogOut }
  )(Navbar)
);
