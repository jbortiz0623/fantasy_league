import React, { Component } from 'react';
import axios from 'axios';

class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.onChangeTName = this.onChangeTName.bind(this);
    this.onChangePlayers = this.onChangePlayers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      TName: '',
      // players: ''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:3000/team/edit/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                TName: response.data.TName, 
                players: response.data.players
            });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeTName(e) {
    this.setState({
      TName: e.target.value
    });
  }
  onChangePlayers(e) {
    this.setState({
      players: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      TName: this.state.TName,
      // players: this.state.players
    };
    axios.post('http://localhost:3000/team/update/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div>
            <h3 align="center">Update Team</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Team Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.TName}
                      onChange={this.onChangeTName}
                      />
                </div>
                <div className="form-group">
                    <label>Players: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.players}
                      onChange={this.onChangePlayers}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Team" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}
export default EditTeam