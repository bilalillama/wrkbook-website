import MSpinner from '../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import EditJob from './Jobs/EditJob';
class EditJOB extends Component{

    render(){
      return(
          <div>

      let thingss =this.props.jobPost._id;
      Meteor.call('validateJob', job, (err)=>{
        if(err){
          this.setState(err.reason);
        }else{
          Meteor.call('updateJob', thingss, job, (err)=>{
            if(err){
              console.log(err);
              console.log(err.reason);
              console.log('above two are update errors');
            }
            else{
              console.log('no error');
            }
          });
        }
      });
    }
  }
  handleTitles(){
    this.setState({
      titles: $(this.refs.titles).val()
    })
  }
  handleSelect(){
    if($('#osha').val()==2){
      this.setState({
        osha10: true
      })
    }
    else if($('#osha').val()==3){
      this.setState({
        osha30: true
      })
    }
  }
  handletoolYesClick(){
    $("#toolDisplay").css("display","block"); //displays tool input on yes click
  }
  handletoolNoClick(){
    $("#toolDisplay").css("display","none");  //hides tool input on no click
  }
  handlesscYesClick(){
    $("#taxDisplay").css("display","none"); //keeps tax display hidden on yes click for ssc
    $("#taxYes").prop('checked',true);  //checks appropriate tax field for ssc yes click
  }
  handlesscNoClick(){
    $("#taxDisplay").css("display","block");  //shows tax display on no click for ssc
  }
  setStartD(x,event){
    let date = JSON.stringify(event);
    this.setState({startD: date});
  }
  setEndD(x,event){
    let date = JSON.stringify(event);
    this.setState({endD: date});
  }
  setStartT(x,event){
    let time = JSON.stringify(event);
    this.setState({startT: time});
  }
  setEndT(x,event){
    let time = JSON.stringify(event);
    this.setState({endT: time});
  }
  render(){
    if(!this.props.jobPost)return(<h1></h1>);
    else {
    let empty = 'This cannot be empty';
    let phErr = 'Not a valid phone number';
    return(
      <div>
      <div className="container" style={{textAlign:'center'}}>
        <span style={{color:'red'}}><i>By editing this job, all professionals matched and hired to this job will be dropped. However, professionals can apply again if the job criteria matches their description</i></span>
      </div>
      <div className="container">
      <div className="card">
      <div className="card-content">
        <form>
          <div className="input-field col s12">
            <MTextField ref="jt" id="jobTitle" value={this.props.jobPost.jobTitle.text} error={this.state.jobTitle ? empty : ''} label="Job Title *"/>
          </div>
          <div className="row">
            <div className="input-field col m6 s12">
              <MTextField ref="sName" id="supervisorName" value={this.props.jobPost.supervisor.name} error={this.state.visorName ? empty : ''} label="Supervisor Name *"/>
            </div>
            <div className="input-field col m6 s12">
              <MTextField ref="sNumber" id="supervisorNumber" value={this.props.jobPost.supervisor.phone} error={this.state.visorNumb ? empty : ''} label="Supervisor Number *"/>
            </div>
          </div>
          <div className="input-field col s12">
            <Location ref="loc"
              prevAddress={this.props.jobPost.location.locationName}
            />
          </div>
          <div className="input-field col s12">
            <MTextField ref="jd" id="jobDescription" value={this.props.jobPost.description.text} label="Job Description *"/>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col m2 s4">
              <label>Are tools required?</label>
              <div>
                <input name="group1" type="radio" id="toolYes" onClick={this.handletoolYesClick.bind(this)} />
                <label htmlFor="toolYes">Yes</label>
              </div>
              <div>
                <input name="group1" type="radio" id="toolNo" onClick={this.handletoolNoClick.bind(this)} />
                <label htmlFor="toolNo">No</label>
              </div>
            </div>
            <div id="toolDisplay" style={{display:'none'}} className="input-field col m10 s8">
              <input id="tools" ref="tools" type="text"/>
              <label htmlFor="tools">Required tools:</label>
            </div>
          </div>
        </form>

        <form>
          <div className="input-field col m6 s12">
            <select id="osha" ref="osha" onChange={this.handleSelect.bind(this)}>
              <option value="" disabled selected>OSHA preference</option>
              <option value="1">No preference</option>
              <option value="2">OSHA 10</option>
              <option value="3">OSHA 30</option>
            </select>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col m4 s6">
              <label>Is Social Security required?</label>
              <div>
                <input name="group1" type="radio" id="sscYes" onClick={this.handlesscYesClick.bind(this)}/>
                <label htmlFor="sscYes">Yes</label>
              </div>
              <div>
                <input name="group1" type="radio" id="sscNo" onClick={this.handlesscNoClick.bind(this)}/>
                <label htmlFor="sscNo">No</label>
              </div>
            </div>
            <div id="taxDisplay" style={{display:'none'}} className="col m4 s6">
              <label>Is Tax Id required?</label>
              <div>
                <input name="group2" type="radio" id="taxYes"/>
                <label htmlFor="taxYes">Yes</label>
              </div>
              <div>
                <input name="group2" type="radio" id="taxNo"/>
                <label htmlFor="taxNo">No</label>
              </div>
            </div>
          </div>
        </form>
        {this.state.titles.map((title, index)=>{
          return(
            <JobCreateComponent ref={title} title={title}key={title}/>
          )
        })}
        <form>
          <div className="input-field col s12">
            <MTextField ref="at" id="additionalText" value={this.props.jobPost.additionText} label="Additional Information"/>
          </div>

          <div style={{display:'flex', justifyContent:'center'}}>
            <a className="waves-effect waves-teal btn-flat" onClick={this.handleUpdate.bind(this)}>Update job</a>
          </div>
          <div id="updateModal" className="modal">
            <div className="modal-content">
              <h4>Your job has been updated.</h4>
            </div>
            <div className="modal-footer">
              <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>
        </form>
      </div>
      </div>
      </div>
      </div>
    )
  }
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
