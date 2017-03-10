import React from 'react'
import {connect} from 'react-redux'
import {Link, hashHistory} from 'react-router'
import {UserActions} from '../../store'
const {login} = UserActions

function LoginScreen({user}){
  if (user) {
    requestAnimationFrame(()=>hashHistory.push('/'))
    return null
  }

  let usernameInput = null
  let passwordInput = null

  const submit = (e)=>{
    e.preventDefault()
    login(usernameInput.value, passwordInput.value, ()=>{
      hashHistory.push('/')
    })
  }

  return (
    <form className = "w3-container w3-blue w3-display-topmiddle" onSubmit={submit}>
      <h1 className = "w3-container w3-black">Chump</h1>
      <fieldset>
        <legend>Login</legend>
        <div>
          <label>Username: <input className = "w3-input" required type="text" ref={el=>usernameInput = el}/></label>
        </div>
        <div>
          <label>Password: <input className = "w3-input" required type="password" ref={el=>passwordInput = el}/></label>
        </div>
        <div>
          <button className = "w3-btn w3-black w3-margin">Login</button>
          <Link className = "w3-btn w3-white w3-margin" to="/register">(New user? Register here)</Link>
        </div>
      </fieldset>
    </form>
  )
}

export default connect(
  state=>({user: state.user})
)(LoginScreen)
