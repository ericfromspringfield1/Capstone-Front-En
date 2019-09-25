import React, { Component } from "react";
import GigsManager from "../../modules/GigsManager";
import VenuesManager from "../../modules/VenuesManager";
import AudiencesManager from "../../modules/AudiencesManager";
import SpotsManager from "../../modules/SpotsManager";
import "./GigsForm.css";

class GigsEditForm extends Component {
  //set the initial state
  state = {
    name: "",
    date: "",
    venues: [],
    venueId: "",
    audiences: [],
    audienceId: "",
    spots: [],
    spotId: "",
    userId: "",
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  
  updateExistingGig = evt => {
    evt.preventDefault();
    const editedGig = {
      name: this.state.name,
      date: this.state.date,
      venueId: parseInt(this.state.venueId),
      audienceId: parseInt(this.state.audienceId),
      id: parseInt(this.props.match.params.gigId,),
      spotId: parseInt(this.state.spotId),
      userId: parseInt(sessionStorage.getItem("credentials"))
    };
    console.log(editedGig)
    GigsManager.update(editedGig).then(() => this.props.history.push("/gigs"));
    
  };
  
  //NOPE NOPE NOPE NOPE NOT YETComponentDidMount populates the Form with options and text boxes areas so the user can add a Gig
  //GigsEditForm will set state in ComponentDidMount function for gigs because we need it to populate the Edit Form. We don't get all
  //because we only need this one gig to populate the form


  componentDidMount() {
    GigsManager.get(this.props.match.params.gigId).then(gig => {
      this.setState({
        name: gig.name,
        date: gig.date,
        venueId: parseInt(gig.venueId),
        audienceId: parseInt(gig.audienceId),
        spotId: parseInt(gig.spotId),
      });
    });

    const loggedInUserVenue = parseInt(sessionStorage.getItem("credentials"));
    VenuesManager.getAll(loggedInUserVenue).then(venues =>
      this.setState({ venues: venues })
    );
    
    AudiencesManager.getAll().then(audiences =>
      this.setState({ audiences: audiences })
    );
    
    SpotsManager.getAll().then(spots => this.setState({ spots: spots }));
  }

  render() {
    return (
      <>
        <form>
          <fieldset>
            <div className="formgrid">
              <input
                className="form-control"
                type="text"
                onChange={this.handleFieldChange}
                id="name"
                value={this.state.name}
              />
              <label htmlFor="gig">Gig</label>

              <input
                type="date"
                className="form-control"
                onChange={this.handleFieldChange}
                id="date"
                value={this.state.date}
              />
              <label htmlFor="date">Date</label>
            </div>

            <select
              className="form-control"
              id="venueId"
              value={this.state.venueId}
              onChange={this.handleFieldChange}
            >
              {this.state.venues.map(venue => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
            <label htmlFor="venue">Venue</label>

            <select
              className="form-control"
              id="audienceId"
              value={this.state.audienceId}
              onChange={this.handleFieldChange}
            >
              {this.state.audiences.map(audience => (
                <option key={audience.id} value={audience.id}>
                  {audience.name}
                </option>
              ))}
            </select>
            <label htmlFor="audience">Audience Type</label>

            <select
              className="form-control"
              id="spotId"
              value={this.state.spotId}
              onChange={this.handleFieldChange}
            >
              {this.state.spots.map(spot => (
                <option key={spot.id} value={spot.id}>
                  {spot.name}
                </option>
              ))}
            </select>
            <label htmlFor="spot">Spot Order</label>

            <div className="alignRight">
              <button
                type="button"
                onClick={this.updateExistingGig}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </>
    );
  }
}

export default GigsEditForm;
