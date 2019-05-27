import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { gettingSearchCenter, resetFail } from "../redux/actionCreator";
import {
  Form,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
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

  searchButtonHandler = e => {
    e.preventDefault();
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
                <Header size="huge" icon>
                  <Icon name="world" />
                  Search for Lost Pets in Your Area:
                </Header>
              </Grid.Column>
              <Form onSubmit={this.searchButtonHandler}>
                <Form.Input
                  size="big"
                  icon="search"
                  iconPosition="left"
                  placeholder="Enter ZIP code..."
                  onChange={e =>
                    this.setState({ searchedAddress: e.target.value })
                  }
                  value={this.state.searchedAddress}
                />
                <Button color="blue" fluid size="massive">
                  Find Pets!
                </Button>
              </Form>
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
                <Button
                  as={NavLink}
                  to="/register"
                  color="orange"
                  fluid
                  size="huge"
                >
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
                  color="blue"
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
