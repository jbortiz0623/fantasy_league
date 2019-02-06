import React, { Component } from 'react';
import {  Route,  Switch, withRouter  } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
// import Slider from "../Carousel/Carousel";
import ProfilePage from '../ProfilePage/ProfilePage';
import axios from 'axios';
import './App.css';
import Players from '../Players/Players'
class App extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      name: '',
      username: '',
      userid: null,
      isLoggedIn: false
    }

    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }
  
  componentDidMount () {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }

  handleLogOut = () => {
    this.setState({
      email: '',
      password: '',
      name: '',
      username: '',
      isLoggedIn: false
    })
    localStorage.clear()
    window.location.href = '/';
  }

  handleInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users/signup',
			{ email: this.state.email,
        password: this.state.password,
        name:  this.state.name,
        username: this.state.username}
      )
      .then( response => {
        console.log(response)
        localStorage.token = response.data.token;
        localStorage.userId = response.data.user._id;
          this.setState({
            isLoggedIn: true
          })
      })
      .catch(err => {console.log(err)});
  }

  handleLogIn = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then( response => {
      localStorage.token = response.data.token;
      localStorage.userId = response.data.user._id;
      console.log(response.data)
      this.setState({
            name: response.data.name,
            username: response.data.username,
            password: '',
            isLoggedIn: true,
            redirect: true
          }, this.props.history.push("/profilepage"))
    })
    .catch(err => console.log(err))
  }
  render () {
    return (
      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} handleSignUp={this.handleSignUp} handleLogOut={this.handleLogOut}/>
        <div className='body'>
          <Switch>
            <Route path='/players'
              render={() => {
                return (
                  <>
                  <Players isLoggedIn={this.state.isLoggedIn} />
                  </>
                )
              }}
            />
            <Route path='/profilepage'
              render={(props) => {
                return (
                  <>
                  <ProfilePage isLoggedIn={this.state.isLoggedIn} name={this.state.name} username={this.state.username} />
                  </>
                )
              }}
            />
            <Route path='/team'
              render={() => {
                return (
                  <>
                  </>
                )
              }}
            />
            <Route path='/' 
              render={() => {
                return (
                  <div>
                    {/* <Slider /> */}
                    {/* <Teams isLoggedIn={this.state.isLoggedIn} /> */}
                  </div>
                )
              }}
            />
          </Switch>
        </div>
      </div>
    )
  }
}
export default withRouter(App);