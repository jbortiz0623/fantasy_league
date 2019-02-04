import React, { Component } from 'react'
import './ProfileDetails.css'

class ProfileDetails extends Component {
  render () {
    return (
      <div className="profile-page-left">
        <img className="profile-pic" src="../images/default-image.jpg" alt="profile-pic" />
        <button className="edit-profile-button">Edit Profile</button>
        <div className="user-info">
          <h3>Name: {this.props.Name}</h3>
          <h3>Username: {this.props.username}</h3>
          <h6>Email: {this.props.email}
          {this.props.edit}
            <br/>
            </h6>
        </div>
      </div>
    )
  }
}

export default ProfileDetails;