import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props.notification)
  if (!props.notification || props.notification.text === '') {
    return null
  }
  return (
    <div className = {props.notification.type}>{props.notification.text}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification