import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <Menu size="large" stackable>
        <Menu.Item as={NavLink} exact to="/">
          <i class="paw icon" />
        </Menu.Item>
        <Menu.Item as={NavLink} to="/register">
          Register A Lost Pet
        </Menu.Item>
        <Menu.Item as={NavLink} to="/sighting">
          Post a Sighting
        </Menu.Item>
        <Menu.Item as={NavLink} to="/home_container">
          Map
        </Menu.Item>
        <Menu.Item position="right">Sign-in</Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
