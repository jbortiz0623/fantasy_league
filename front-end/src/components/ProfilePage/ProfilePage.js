import React, { Component } from 'react'
import { Modal } from 'react-materialize'
import EditProfile from '../EditProfile/EditProfile'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import CreateTeam from '../CreateTeam/CreateTeam'
import './ProfilePage.css'
import axios from 'axios';


class ProfilePage extends Component {
 constructor(props) {
    super(props);

    this.state = {
      username:'',
      email:'',
      name:'',
      teams: []

    }     
};

  fetchTeams = () => {
    
    let userid = localStorage.userId
    console.log(userid);
    console.log('fetching')
    axios.get(`http://localhost:3001/users/${userid}/teams`)
    .then((res)=>{
      this.setState({
        teams: res.data,
      })
    })
}

  componentDidMount() {
    console.log('in componentdidmount')
      this.fetchTeams();
      // axios.get(`http://localhost:3001/users/create/teams`)
      // .then((res)=> {
      //   console.log(res.data)
      //   // this.setState({
      //   //   teams: res.data
      //   // })
      // })
    }
  // deleteTeam = (e) => {
  //   e.preventDefault();
  //   let team_id = e.target.team_id
  //   axios.delete(`http://localhost:3001/teams/${team_id}`)
  //   .then((res) => { console.log("Team deleted");
  //     this.setState({ deleteTeam: res.data.team_id })
  //   })
  // }
  

    render () {
      let editButton = []
      if (this.props.isLoggedIn) {
        editButton.push(
          <Modal header='Edit Profile' trigger={<button href="/"className="formButtons">Edit Info</button>}>
            <EditProfile />
          </Modal>)
      }
        console.log(this.state.teams);
        let teams = this.state.teams.map((team) => {
        let players = team.players.map((player) => {
          return(<p>{player.Name}</p>)
        })
        return(
          <div>
            <p>team</p>
            <h1>{team.TName}</h1>
            {players}
            <button onClick={this.deleteTeam} value={team._id} >Destroy </button>
          </div>
        )
      })
      return (
          <div className="profile-page-main">
            <section className="user-info-tab">
              <div>
                <ProfileDetails Name={this.state.name} Username={this.state.username} Email={this.state.email} />
              </div>
            </section>
            <section className="dividing-line" />
            <section className="user-team-container">
                <div>
                <Modal header='Create Team' trigger={<button href="/"className="formButtons">Create A Dream Team</button>}>
            <CreateTeam fetchTeams={this.fetchTeams}/>
                </Modal>
              </div>
              <hr />
              {teams} 

            </section>
          </div>
      )
    }
  }
  
  export default ProfilePage