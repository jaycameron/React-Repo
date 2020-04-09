import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchCampsites } from '../redux/ActionCreators';

// child of App, all else are children of Main
const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) =>
    addComment(campsiteId, rating, author, text),
  // ^ addComment is passed in from the action creator with the same properties as are created there, look at the bottom
  fetchCampsites: () => fetchCampsites(),
};
// ^

class Main extends Component {
  componentDidMount() {
    this.props.fetchCampsites();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.featured
            )[0]
          }
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
          partner={this.props.partners.filter((partner) => partner.featured)[0]}
        />
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={
            this.props.campsites.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
          addComment={this.props.addComment}
          // ^addComment can now be passed in to CampsiteInfo BECAUSE it was made available in the mapDTProps
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/directory"
            render={() => <Directory campsites={this.props.campsites} />}
          />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route
            exact
            path="/aboutus"
            render={() => <About partners={this.props.partners} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//this is the connect function connecting this component to the store so it can recieve data that it needs from the store
// matchDispatchToProps makes the addComment action creator function (above) available in the maincomponent as a prop
