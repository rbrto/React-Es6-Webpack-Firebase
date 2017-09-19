import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import firebase from 'firebase';
import 'normalize-css';

import styles from './app.css';
import Header from '../Header';
import Main from '../Main';
import Profile from '../Profile';
import Login from '../Login';

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount () {
    // setea al user si estoy autenticado con oauth
    // el listener onAuthStateChanged se dispara cada vez que iniciemos sesion o nos desconectemos
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
        console.log(user)
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()

    // una vez autenticado se usando el provider de github se devuelve una promesa con el user de github en result
    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.error(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(() => console.log('Te has desconectado correctamente'))
      .catch(() => console.error('Un Error ocurrió'))
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Route path="/"  render={() => {
            if (this.state.user) {
              return (
                <Main
                  user={this.state.user}
                  onLogout={this.handleLogout}
                />
              )
            } else {
              return (
                <Login onAuth={this.handleOnAuth} />
              )
            }
          }} />

        <Route path="/profile" render={() => {
            return (
              <Profile
                picture={this.state.user.photoURL}
                username={this.state.user.email.split('@')[0]}
                displayName={this.state.user.displayName}
                location={this.state.user.location}
                emailAddress={this.state.user.email}
              />
            )
          }} />

        <Route path='/user/:username' render={({ match }) => {
            return (
              <Profile
                displayName={match.params.username}
                username={match.params.username}
              />
            )
          }} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App
