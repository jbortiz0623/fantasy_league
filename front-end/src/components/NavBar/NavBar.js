import React, { Component } from 'react'
import { Navbar, NavItem, Modal } from 'react-materialize'
import LogInForm from '../LogInForm/LogInForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import LogOut from '../LogOut/LogOut'
import './NavBar.css'

class NavBar extends Component {
  render () {
    let navBarItems = [<NavItem key={1} href='/'></NavItem>]
    if (this.props.isLoggedIn) {
      navBarItems.push(
        <NavItem key={2} href='/FantasyBattle'>Fantasy Battle</NavItem>)
        navBarItems.push(
          <NavItem key={3} href='/ProfilePage'>Profile</NavItem>)
      navBarItems.push(
        <Modal header='Loging out?' key={4} trigger={<a href="/"className="formButtons">Log Out</a>}>
          <LogOut handleLogOut={this.props.handleLogOut}/>
        </Modal>)
    } else {
      navBarItems.push(
        <Modal header='Sign Up' key={5} trigger={<a href="/"className="formButtons">Sign Up</a>}>
          <SignUpForm handleInput={this.props.handleInput} handleSignUp={this.props.handleSignUp}/>
        </Modal>)
      navBarItems.push(
        <Modal header='Login' key={6} trigger={<a href="/"className="formButtons">Login</a>}>
          <LogInForm handleInput={this.props.handleInput} handleLogIn={this.props.handleLogIn} />
        </Modal>)
    }
    return (
      <Navbar brand='FANTASY LEAGUE' className='nav' right>
        <div className="navButtons">
          {navBarItems}
        </div>
      </Navbar>
    )
  }
}

export default NavBar