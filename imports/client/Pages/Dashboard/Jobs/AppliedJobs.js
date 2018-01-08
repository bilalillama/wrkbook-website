import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MSpinner from '../../Shared/MSpinner';
import EmpJobPostComponent from './EmpJobPostComponent';
import EmployeeNoJobs from './Shared/EmployeeNoJobs';
function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}
// Job = new Mongo.Collection('jobs');

class EmployeeJob extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    if(!isEmpty(this.props.jobPost)){
      let jobz = this.props.jobPost;
      return(
        <div>
          <br/>
          {jobz.map(function(job, index){
            return(
              <EmpJobPostComponent
                key={job._id}
                jobinfo = {job}
                events = {job.eventInfo}
                title={job.jobTitle.text}
                startAt={job.startAt}
                endAt={job.endAt}
                description={job.description.text}
                location={job.location}
                pay={job.pay}
              />
            )
          })}
        </div>
      );
    }
    else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
          <EmployeeNoJobs
          message={"applied"}/>
      );
    }
  }
}
export default Applied = withTracker( params  => {
  let user = Meteor.user();
  let jobPost =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-applied');
    loading = handle.ready();
    jobPost = Job.find({}).fetch();

  }
  return{
    user: user,
    loading:loading,
    jobPost:jobPost
  };
})(EmployeeJob);