import React, { Component } from "react";

class EditProfile extends Component {


  render() {
    return (
          <div>
            <h3></h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>New Name:  </label>
                    <input type="text" name="name" value={this.props.name}
                    className="form-control" 
                    onChange= {this.props.handleInput}
                    />
                </div>
                <div className="form-group">
                    <label>New Username: </label>
                    <input type="text" name="username" value={this.props.username}
                    className="form-control" 
                    onChange= {this.props.handleInput}
                    />
                </div>
                <div className="form-group">
                    <label>New Email:  </label>
                    <input type="text" name="email" value={this.props.email}
                    className="form-control" 
                    onChange= {this.props.handleInput}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Profile" className="btn btn-primary" onClick={this.props.editProfile}/>
                </div>
              </form>
            </div>
    );
  }
}

export default EditProfile;