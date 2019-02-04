import React, { Component } from 'react';
import axios from 'axios'
import { Input } from 'react-materialize'

class CreateTeam extends Component {
 constructor(props) {
    super(props);
    this.state = {

        TName: '',
        playersl:null,
        players: '',
        selectedPlyaer : []

    }
    this.onChangeTName = this.onChangeTName.bind(this);
    this.onChangeplayers = this.onChangeplayers.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAdd = this.onAdd.bind(this)
    }
componentDidMount() {
    var ths = this;
    axios.get(`http://localhost:3001/players`)
    .then(function (res) {
        ths.setState({
            playersl:res
        })
        
        console.log(res)
    }) 
}
onChangeTName(e) {
    this.setState({
        TName: e.target.value
    });
}



onChangeplayers(e) {
    this.setState({
      players: e.target.value
      
    })  
    var j = false;
    document.getElementById('playerlists').childNodes.forEach(function(el){
        if(j===false){
           
            if(el.lastChild.textContent.startsWith(e.target.value)){
                // var rx new RegExp('')
                // console.log(el.lastChild.textContent.scrollTop)
                console.log(el.lastChild.offsetTop);
                document.getElementById('playerlists').scrollTop = el.lastChild.offsetTop
                j=true;
            }
            
        }
        
    });
  }

onSubmit(e) {
    
    e.preventDefault();
    this.props.onAdd(this.selectedPlyaer.value , this.TName.value); 
    console.log(this.state.TName)
    const obj = {
      TName: this.state.TName,
      players: this.state.selectedPlyaer,
      Coach: localStorage.userId
    };
    axios.post(`http://localhost:3001/team/create`, obj)
        .then(res => console.log(res.data));
    
    this.setState({
      TName: '',
    //   players: ''
    })
  }
  slelectTeam=(e)=>{
    if(e.target.checked){
        this.state.selectedPlyaer.push(e.target.value)
    }
  }
    render() {
        var ele ='';
        if(this.state.playersl!=null){
            var data = this.state.playersl.data
            var ths = this;
            ele = data.map(function(el){
                if(ths.state.selectedPlyaer.includes(el._id)){
                    return (<Input name='players[]' key={el._id} onChange={ths.slelectTeam} checked type='checkbox' value={el._id} label={el.Name} />);
                }else{
                    return (<Input name='players[]' key={el._id} onChange={ths.slelectTeam} type='checkbox' value={el._id} label={el.Name} />);
                }
               
            })
            
            // for(var i = 0; i<data.length; i++) {
            //     ele.push()
            //     // ele+=`<option data-value="${data[i]._id}" value="${data[i].Name}" />`
            // }
        
        }
        return (
            <div>
            <h3></h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Team Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.TName}
                      onChange={this.onChangeTName}
                    ref={TName => this.TName = TName}
                    />
                </div>
                <div className="form-group">
                    <label>Players: </label>
                    <input id="ply" list="taco" type="text" 
                      className="form-control"
                      value={this.state.players}
                      onChange={this.onChangeplayers}
                    ref={selectedPlyaer => this.selectedPlyaer = selectedPlyaer}
                    /> <button type="button" onClick={this.addPlayers}>ADD</button>
                      <div id="playerlists" style={{height:'150px',overflow:"auto"}}>
                      {ele}
                      </div>
                   
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Team" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}

export default CreateTeam

 