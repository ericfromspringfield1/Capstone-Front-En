import React, { Component } from "react";
import GigsManager from "../../modules/GigsManager";
import "./GigsForm.css";
import VenuesManager from "../../modules/VenuesManager";
import AudiencesManager from "../../modules/AudiencesManager";


class GigsForm extends Component {
  state = {
    gig: "",
    date: "",
    venues: [],
    audience: [],
    spot: [],
    loadingStatus: false
  };
  
  componentDidMount() {
    GigsManager.get(this.props.match.params.id).then(gig => {
      this.setState({
        gig: gig.name,
        date: gig.date,
        audience: this.state.audience.id,
        spot: this.state.spot.id
      });
      const loggedInUser = parseInt(sessionStorage.getItem("credentials"));
      VenuesManager.getAll(loggedInUser).then(venues =>
        this.setState({ venues: venues })
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
    if (this.state.gig === "" || this.state.date === "") {
      window.alert("Please input a gig and date");
    } else {
      this.setState({ loadingStatus: true });
      const gig = {
        gig: this.state.name,
        date: this.state.date,
        venue: this.state.venue,
        audience: this.state.audience,
        spot: this.state.spot,
        userId: parseInt(sessionStorage.getItem("credentials"))
      }
      
      
      GigsManager.post(gig).then(() => this.props.history.push("/gigs"));
      
    }
  };

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
                id="gig"
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

