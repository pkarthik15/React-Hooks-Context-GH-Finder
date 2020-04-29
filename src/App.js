import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

import axios from 'axios'
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},  
    repos: [], 
    loading: false,
    alert : null
  }

  // async componentDidMount(){
  //   try{
  //     this.setState({
  //       loading:true
  //     })
  //     const response = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);      
  //     this.setState({
  //       users : response.data,
  //       loading: false
  //     })
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // }

  searchUsers = async (text) => {
    try{
      this.setState({
        loading:true
      })
      const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);
      this.setState({
        users : response.data.items,
        loading: false
      })
    }
    catch(error){
      console.log(error)
    }    
  }


  getUser = async (login) => {
    try{
      this.setState({
        loading:true
      })
      const response = await axios.get(`https://api.github.com/users/${login}?client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);      
      this.setState({
        user : response.data,
        loading: false
      })
    }
    catch(error){
      console.log(error)
    }    
  }

  getUserRepos = async (login) => {
    try{
      this.setState({
        loading:true
      })
      const response = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_FINDER_GH_CLIENT_ID}&client_secret=${process.env.GITHUB_FINDER_GH_CLIENT_SECRET}`);      
      this.setState({
        repos : response.data,
        loading: false
      })
    }
    catch(error){
      console.log(error)
    }    
  }


  clearUsers = () => {
    this.setState({
      users : [],
      oading: false    
    })
  }

  setAlert = (message, type) => {
   
    this.setState({
      alert: {
        msg:message,
        type:type
      }
    })

    setTimeout(()=>{
      this.setState({
        alert: null
      })
    }, 5000);

  }

  render(){
    return (
      <Router>
      <div className="App">
        <Navbar />        
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
             <Route exact path="/" render={
               props => (
                <React.Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={ this.state.users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users}/>
                </React.Fragment>
               )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={
                props => (
                  <User { ...props } getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.loading} />
                )
              } />             
          </Switch>          
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
