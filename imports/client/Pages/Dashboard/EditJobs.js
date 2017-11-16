import MSpinner from '../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import EditJob from './Jobs/EditJob';
class EditJOB extends Component{

    render(){
      return(
          <div>


              {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :
                      !!this.props.job ?
                      <EditJob key={this.props.job._id} jobPost={this.props.job}/>
                      :
                      <h1>NANI </h1>
              }
          </div>
      )
    }
}


export default EditJobs = createContainer((params) =>{
  let handle = Meteor.subscribe('job-post-employer-edit',params.match.params.value);
  let ready = handle.ready();
  console.log(ready);
  return {
      ready: ready,
    job: Job.find({}).fetch()[0]

  };
},EditJOB);
