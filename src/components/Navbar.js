import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu stackable>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <i class="paw icon" />
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          to="/register"
          name="Register A Lost Pet"
          active={activeItem === "Register A Lost Pet"}
          onClick={this.handleItemClick}
        >
          Register A Lost Pet
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to="/home_container"
          name="map"
          active={activeItem === "map"}
          onClick={this.handleItemClick}
        >
          Map
        </Menu.Item>
        <Menu.Item
          name="sign-in"
          active={activeItem === "sign-in"}
          onClick={this.handleItemClick}
        >
          Sign-in
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
