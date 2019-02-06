import React, { Component } from 'react'
import './ProfileDetails.css'
import axios from 'axios'
import EditProfile from '../EditProfile/EditProfile';
import { Modal } from 'react-materialize'

class ProfileDetails extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:'',
      email:'',
      name:''
    }    
  }
  componentWillMount () {
    var token = localStorage.token;
    axios.post(`http://localhost:3001/users/profile`, {"token":token})
      .then((res)=>{
      this.setState({
      username: res.data.username,
      name:res.data.Name,
      email:res.data.email
    })
    console.log(res.data)
  })
    .catch((err)=>{
      console.log(err)
    })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  editProfile = () => {
    var token = localStorage.token;
    axios.patch(`http://localhost:3001/users/profile/${localStorage.userId}`, 
    {"name":this.state.name,
    "username":this.state.username, 
    "email":this.state.email})
      .then((res)=>{
      this.setState({
      username: res.data.username,
      name:res.data.Name,
      email:res.data.email
    })
    console.log(res.data)
  })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  render () {
    return (
      <div className="profile-page-left">
        <img className="profile-pic" src="../images/default-image.jpg" alt="profile-pic" />
        <Modal header='Edit Profile' trigger={<button href="/"className="formButtons">Edit Profile</button>}>
            <EditProfile  name={this.state.name} email={this.state.email} username ={this.state.username} 
            handleInput={this.handleInput} editProfile={this.editProfile}/>
          </Modal>
        <div className="user-info">
          <h3>Name: {this.state.name}</h3>
          <h3>Username: {this.state.username}</h3>
          <h6>Email: {this.state.email}
          {/* {this.props.edit} */}
            <br/>
            </h6>
        </div>
      </div>
    )
  }
}

export default ProfileDetails;