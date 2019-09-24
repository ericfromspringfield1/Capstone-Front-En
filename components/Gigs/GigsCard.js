 import React, { Component } from 'react';
import './Gigs.css'

class GigsCard extends Component {
  render() {
    return (
      <div className="card">
          <h3><span className="gigName" style={{ color: 'darkslategrey' }}> {this.props.gig.name}</span></h3>
          <h5 className="gigDate">{this.props.gig.date}</h5>
          <h5 className="venueName">{this.props.gig.venue.name}</h5>
          <h5 className="venueCity">{this.props.gig.venue.city}</h5>
          <h5 className="venueState">{this.props.gig.venue.state}</h5>
          <h5 className="venueCapacity">The Venue will seat {this.props.gig.venue.capacity} people</h5>
          <h5 className="audienceName">The Audience Was {this.props.gig.audience.name}</h5> 
          <h5 className="spotName">Spot Order: {this.props.gig.spot.name}</h5>
          <picture>
            <img src={require('./charlieChaplin.png')} alt="Chaplin" />
          </picture>
          <button type="button" onClick={() => {this.props.history.push(`/gigs/${this.props.gig.id}/edit`)}}>Edit</button>
          <button type="button" onClick={() => this.props.deleteGig(this.props.gig.id)}>Delete Gig</button>
          </div>
    );
  } 
}
export default GigsCard; 
