import React from 'react'
import {connect} from 'react-redux'
import {Link, hashHistory} from 'react-router'
import {UserActions} from '../../store'
const {register} = UserActions

function RegisterScreen({user}){
  if (user) {
    requestAnimationFrame(()=>hashHistory.push('/'))
    return null
  }

  let usernameInput = null
  let passwordInput = null
  let emailInput = null

  const submit = (e)=>{
    e.preventDefault()
    register(usernameInput.value, passwordInput.value, emailInput.value, ()=>{
      hashHistory.push('/')
    })
  }

  return (
    <form className = "w3-container w3-blue w3-display-topmiddle" onSubmit={submit}>
      <h1 className = "w3-container w3-black">Chump</h1>
      <fieldset>
        <legend>Register</legend>
        <div>
          <label>Username: <input required className = "w3-input" type="text" ref={el=>usernameInput = el}/></label>
        </div>
        <div>
          <label>Password: <input className = "w3-input" required type="password" ref={el=>passwordInput = el}/></label>
        </div>
        <div>
          <label>Email: <input className = "w3-input" required type="email" ref={el=>emailInput = el}/></label>
        </div>
        <div>
          <button className = "w3-btn w3-black w3-margin" >Register</button>
          <Link className = "w3-btn w3-white w3-margin" to="/login">(Have an account? Login here)</Link>
        </div>
      </fieldset>
    </form>
  )
}

export default connect(
  state=>({user: state.user})
)(RegisterScreen)
