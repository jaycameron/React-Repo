import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import CampsiteInfo from './CampsiteInfoComponent';

class Directory extends Component {
  constructor(props) {
    // constructor creates the objects inside Directory
    // props is a "property" that is passed in similar to parameters in a function, to be resued with separate pieces of information accessed with {props.name}(or email or etc.)
    // ^instead of using <h3> Name use {props.name}
    super(props);
    // super calls down functions from Superclass (parent) classes (which is Componenet, Directory is a sub class (child))
    this.state = {
      // state is the container for object {color: red} then is call as this.state.color
      // change a state with this.setState method (changes it inside specific functions)
      // if color is already red then this.setState({color: blue}) changes it only inside that function
      selectedCampsite: null
    };
  }

  onCampsiteSelect(campsite) {
    this.setState({ selectedCampsite: campsite });
  }

  render() {
    const directory = this.props.campsites.map(campsite => {
      // this.props.campsites-campsites is from the campsites.js exported as const "campsites"
      return (
        <div key={campsite.id} className="col-md-5 m-1">
          {/* campsite in here is just a parameter/placeholder/reference to the arrow function and accepts anything passed into it */}
          <Card onClick={() => this.props.onClick(campsite.id)}>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
              <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{directory}</div>
      </div>
    );
  }
}

export default Directory;
