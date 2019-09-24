import React, { Component } from "react";
import GigsManager from "../../modules/GigsManager";
import "./GigsForm.css";
import VenuesManager from "../../modules/VenuesManager";
import AudiencesManager from "../../modules/AudiencesManager";
import SpotsManager from "../../modules/SpotsManager";
import VenuesCard from "../Venues/VenuesCard";


class GigsForm extends Component {
  state = {
    gigs: "",
    date: "",
    venues: [],
    audiences: [],
    spots: [],
    loadingStatus: false
  };
  
  componentDidMount() {
    GigsManager.get(this.props.match.params.id).then(gig => {
      this.setState({
        gig: gig.name,
        date: gig.date
      });
      const loggedInUserGig = parseInt(sessionStorage.getItem("credentials"));
      GigsManager.getAll(loggedInUserGig).then(gigs =>
        this.setState({ gigs: gigs })
      );
      const loggedInUserVenue = parseInt(sessionStorage.getItem("credentials"));
      VenuesManager.getAll(loggedInUserVenue).then(venues =>
        this.setState({ venues: venues })
        );
        const loggedInUserAudience = parseInt(sessionStorage.getItem("credentials"));
        AudiencesManager.getAll(loggedInUserAudience).then(audiences =>
          this.setState({ audiences: audiences })
          );
          const loggedInUserSpot = parseInt(sessionStorage.getItem("credentials"));
          SpotsManager.getAll(loggedInUserSpot).then(spots =>
            this.setState({ spots: spots })
            );
          });
        }        
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };
  
  /*  Local method for validation, set loadingStatus, create gig object, invoke the GigsManager post method, and redirect to the full gig list
  */
 constructNewGig = evt => {
   evt.preventDefault();
   
      this.setState({ loadingStatus: true });
      const gig = {   
        name: this.state.name,
        date: this.state.date,
        venueId: VenuesManager.get(this.state.venues.id),
        audienceId: parseInt(sessionStorage.getItem("key")),
        spotId: parseInt(sessionStorage.getItem("key")),
        userId: parseInt(sessionStorage.getItem("credentials"))
      }
      GigsManager.post(gig).then(() => this.props.history.push("/gigs"));


    }

  render() {
    return (
      <>
        <form>
          <fieldset>
            <div className="formgrid">
              <input
                type="text"
                required
                onChange={this.handleFieldChange}
                id="name"
                placeholder="Gig"
              />
              <label htmlFor="gig">Gig</label>

              <input
                type="date"
                required
                onChange={this.handleFieldChange}
                id="date"
                placeholder="Date Of Gig"
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
                disabled={this.state.loadingStatus}
                onClick={this.constructNewGig}
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

export default GigsForm;


