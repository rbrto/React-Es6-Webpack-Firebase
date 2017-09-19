import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyCR242-jaqPA55r6x93frmg5Gvd1GSDfTg',
  authDomain: 'curso-react-74db3.firebaseapp.com',
  databaseURL: 'https://curso-react-74db3.firebaseio.com',
  storageBucket: 'curso-react-74db3.appspot.com',
  messagingSenderId: '738478301236'
})

import App from './components/App'

render(<App />, document.getElementById('root'))
