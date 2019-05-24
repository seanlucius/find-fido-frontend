import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { gettingSearchCenter, resetFail } from "../redux/actionCreator";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Segment
} from "semantic-ui-react";

class HomePage extends React.Component {
  state = {
    searchedAddress: "",
    searched: false
  };

  renderRedirect = () => {
    if (
      this.props.failed === true &&
      this.props.loading === true &&
      this.state.searched
    ) {
      window.alert("Invalid ZIP code!");
      this.setState({
        searchedAddress: "",
        searched: false
      });
      this.props.resetFail();
    }

    if (
      this.props.failed !== true &&
      this.props.loading !== true &&
      this.state.searched
    ) {
      return <Redirect to="/home_container" />;
    }
  };

  searchButtonHandler = () => {
    let a = this.state.searchedAddress;
    if (a.length === 5 && !isNaN(Number(a))) {
      this.props.gettingSearchCenter(this.state.searchedAddress);
      this.setState({
        searched: true
      });
    } else {
      window.alert("That ain't a ZIP code");
      this.setState({
        searchedAddress: ""
      });
    }
  };

  render() {
    return (
      <>
        {this.renderRedirect()}
        <Segment placeholder>
          <Grid columns={1} stackable textAlign="center">
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="world" />
                  Search for Lost Pets:
                </Header>
              </Grid.Column>
              <Input
                onChange={e =>
                  this.setState({ searchedAddress: e.target.value })
                }
                size="massive"
                icon="search"
                placeholder="Enter ZIP code..."
                value={this.state.searchedAddress}
              />
            </Grid.Row>
            <Grid.Row>
              <Button
                fluid
                size="massive"
                onClick={() => this.searchButtonHandler()}
              >
                Find Pets!
              </Button>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="paw" />
                </Header>
                <Button as={NavLink} to="/register" primary fluid size="huge">
                  Post Lost Pet
                </Button>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name="eye" />
                </Header>
                <Button
                  as={NavLink}
                  to="/home_container"
                  primary
                  fluid
                  size="huge"
                >
                  Post Sighting
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
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
    { gettingSearchCenter, resetFail }
  )(HomePage)
);
