import React, { Component } from 'react'
import { Modal } from 'react-materialize'
import EditProfile from '../EditProfile/EditProfile'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import CreateTeam from '../CreateTeam/CreateTeam'
import './ProfilePage.css'


class ProfilePage extends Component {
//  constructor(props) {
//     super(props);

//     this.state = {
//       teams: JSON.parse(localStorage.getItem('teams'))
// };
//   // this.onAdd = this.onAdd.bind(this);
// }
//   componentWillMount() {
//     const teams = this.getTeams();
  
//     this.setState({ teams }); 
// }
// getTeams() {
//   return this.state.teams;
// }
// onAdd(selectedPlyaer, TName) {
//   const teams = this.getTeams();
//   teams.push({
//     selectedPlyaer,
//     TName
//   })
//   this.setState({ teams })
// }
    render () {
      let editButton = []
      if (this.props.isLoggedIn) {
        editButton.push(
          <Modal header='Edit Profile' trigger={<a href="/"className="formButtons">Edit Info</a>}>
            <EditProfile />
          </Modal>)
      }
      return (
          <div className="profile-page-main">
            <section className="user-info-tab">
              <div>
                <ProfileDetails Name={this.props.Name} Username={this.props.Username} Email={this.props.Email} />
              </div>
            </section>
            <section className="dividing-line" />
            <section className="user-team-container">
                <div>
                <Modal header='Create Team' trigger={<button href="/"className="formButtons">Create A Dream Team</button>}>
            <CreateTeam />
                </Modal>
                {/* onAdd={this.onAdd} */}
              </div>
              <hr />

            </section>
          </div>
      )
    }
  }
  
  export default ProfilePage