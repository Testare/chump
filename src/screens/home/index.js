import React, {Component} from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import {MessageActions, UserActions} from '../../store'
import moment from 'moment'

const {sendMessage, listen} = MessageActions
const {getUser} = UserActions

class HomeScreen extends Component {
  componentDidMount() {
    const {user} = this.props
    if (user)
      listen()
    else
      getUser()
  }
  render() {

    const {user, messages} = this.props
    if (!user) {
      requestAnimationFrame(()=>hashHistory.push('/login'))
      return null
    }

    let textInput = null

    const submit = (e)=>{
      e.preventDefault()
      sendMessage({value: textInput.value})
      textInput.value = ''
    }

    return (
      <form className = "w3-container w3-display-topmiddle w3-pale-blue" onSubmit={submit}>
      <h1 className = "w3-container">Chump</h1>
        {messages.map((msg)=>{
          if (msg.type === 'text') {
            return {
            "div":<li className='msg_msg ' key={msg.id}>
              {msg.data.value} <span>
              ({moment(msg.createdAt).calendar()/*That is SO much sexier!*/})
              </span>
            </li>,
            "msg":msg
          }}
        }).reduce((accm,msg)=>{
          if(0 == accm.length || accm[accm.length - 1]["user"] !== msg["msg"].user.username) {
            accm.push({
              "user":msg["msg"].user.username,
              "id":"**" + msg["msg"].id,
              "gp_header":<div className="msg_usr w3-container w3-black" key={"*" + msg["msg"].id}>{msg["msg"].user.username}</div>,
              "gp_list":[]
            })
          }
          accm[accm.length - 1]["gp_list"].push(msg["div"])
          return accm;
        },[]).map((gp_json)=>{
          return <div className = "msg w3-card-4 w3-animate-left w3-blue w3-margin" key = {gp_json["id"]}>{gp_json["gp_header"]}
          <ul className = "w3-ul">{gp_json["gp_list"]}
          </ul></div>
        })}
        <div className = "w3-margin">
          <div className = "w3-container w3-black user_tag">{user.username}:</div>
          <input required className = "w3-input" type="text" ref={el=>textInput = el}/>
          <button className = "w3-btn w3-block w3-blue">Send</button>
        </div>
      </form>
    )
  }
}

export default connect(
  state=>({
    user: state.user,
    messages: state.messages
  })
)(HomeScreen)
