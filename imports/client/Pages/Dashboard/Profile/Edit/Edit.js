import React from 'react';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ContractorEdit from './ContractorEdit';
import ProfessionalEdit from './ProfessionalEdit';

class EditPage extends React.Component{
  render(){
    if(this.props.user){
      if (this.props.user.roles[0] === "PRO") {
        return <ProfessionalEdit user={this.props.user}/>
      } else if (this.props.user.roles[0] === "CON"){
        return <ContractorEdit user={this.props.user}/>
      }
    }
  }
}
export default Edit = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, EditPage);