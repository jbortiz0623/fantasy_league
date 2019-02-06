import React, { Component } from 'react'
import axios from 'axios'
import { Input } from 'react-materialize'


class Players extends Component{
    state = {
        playersl: {data:[{Name:'Test'}]},
        players: '',
        selectedPlyaer : null,
        playersfiltered: null
    }

componentDidMount() {
    var ths = this;
    axios.get(`http://localhost:3001/players`)
    .then((res) => {
        ths.setState({
            playersl:res
        })
 
        console.log(this.state.playersl)
    }) 
}
    

onChangeplayers = (e) => {
    this.setState({
      players: e.target.value
      
    })  

    let filtered = this.state.playersl.data.filter((player)=>{
        if(player.Name){
            // console.log(player.Name)
            console.log(this.state.players)
        return player.Name.includes(this.state.players)
        } 
    })
    this.setState({
        playersfiltered: {data:filtered}
    })
  }
    render() {
        let players
        if(this.state.playersfiltered !== null){
            players = this.state.playersfiltered.data.map(player => {
                return <p>{player.Name}{player.Number}{player.Position}{player.Height}{player.Weight}{player.College}{player.Salary}</p>
        })

        } else if (this.state.playersl!=null){
            players = this.state.playersl.data.map(player => {
                return <p>{player.Name}{player.Number}{player.Position}{player.Height}{player.Weight}{player.College}{player.Salary}</p>
        })
        }
        return(
            <div className="players-page-main">
            <section>
        
            </section>
            <section className="dividing-line" />
            <section className="user-players-container">
                <div>
                    <input onChange={this.onChangeplayers}></input>
              </div>
              <hr /> 
                {players}
            </section>
          </div>
        )

    }
}

export default Players;