import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';

import ConProfile from './ConProfile/ConProfile';
import ProProfile from './ProProfile/ProProfile';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    console.log(user)
    this.state = {user: user}
    if (user.roles[0] === "PRO") {
      this.state = {isPro: true}
    } else if (user.roles[0] === "CON"){
      this.state = {isPro: false}
    }
  }

render() {
  return (
    this.state.isPro ? <ProProfile/> : <ConProfile/>
  )
 }
}

export default Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, ProfilePage);
