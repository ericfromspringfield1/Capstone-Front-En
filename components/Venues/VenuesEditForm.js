import React, { Component } from "react"
import VenuesManager from "../../modules/VenuesManager"
import "./VenuesForm.css"

class VenuesEditForm extends Component {
    //set the initial state
    state = {
      name: "",
      city: "",
      state: "",
      capacity: "",
      userId: "",
      loadingStatus: false,
    };

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    updateExistingVenue = evt => {
      evt.preventDefault()
      this.setState({ loadingStatus: true });
      const editedVenue = {
        name: this.state.name,
        city: this.state.city,
        state: this.state.state,
        capacity: this.state.capacity,
        id: parseInt(this.props.match.params.venueId),
        userId: parseInt(sessionStorage.getItem("credentials"))
      };

      VenuesManager.update(editedVenue)
      .then(() => this.props.history.push("/venues"))
    }

    componentDidMount() {
      VenuesManager.get(this.props.match.params.venueId)
      .then(venue => {
          this.setState({
            name: venue.name,
            city: venue.city,
            state: venue.state,
            capacity: venue.capacity,
            id: parseInt(venue.venueId),
          });
      });
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
                className="form-control"
                onChange={this.handleFieldChange}
                id="name"
                value={this.state.name}
              />
              <label htmlFor="venue">Venue</label>

              <input
                type="city"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="city"
                value={this.state.city}
              />
              <label htmlFor="city">City</label>

              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="state"
                value={this.state.state}
                />
              <label htmlFor="state">State</label>
              
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="capacity"
                value={this.state.capacity}
                />
              <label htmlFor="capacity">Capacity</label>
            </div> 

            <div className="alignRight">
              <button
                type="button" disabled={this.state.loadingStatus}
                onClick={this.updateExistingVenue}
                className="btn btn-primary"
                >Submit</button>
            </div>
          </fieldset>
        </form>
        </>
      ); 
    }
}

export default VenuesEditForm
