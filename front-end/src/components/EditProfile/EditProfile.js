import React, { Component } from 'react'
import './EditProfile.css'

class EditProfile extends Component {
  render () {
    return (
      <form className="update-profile-form">
        <div className="update-profile-name">
          <label htmlFor='name'>Name</label>
          <input type='input' name='title' className="update-name" onChange={this.props.handleInput} />
        </div>
        <div className="update-profile-email">
          <label htmlFor='email'>Email</label>
          <input type='input' name='email' className="update-current-city-field" onChange={this.props.handleInput} />
        </div>
        <input className="update-profile-submit" value='Save Update' type='submit' onClick={this.props.handleInput} />
      </form>
    )
  }
}

export default EditProfile