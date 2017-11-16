import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import EmployeeComponent from './EmployeeComponent';
import MSpinner from '../../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
//detailed job view with professionals that applied and admitted professionals

export default class ProComponent extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();

    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.tooltipped').tooltip({delay: 25});
    });
    $(this.refs.titles).on('change',(e)=>{
      this.handleProChange(e);
    })


    this.getEventData();
  }
  constructor(props){
    super(props);
    let job = this.props.jobinfo;

    this.state={
      job: job,
      startAt: '',
      endAt: '',
      //osha10: this.props.jobinfo.requirements.osha.osha10,
      //osha30: this.props.jobinfo.requirements.osha.osha30,
      //license: this.props.jobinfo.requirements.driverLicense,
      nothing1: true,
      nothing2: true,
      value: "0"
    };
  }
  handleProChange(e){
    this.setState({
      value: e.target.value,
    });

    this.getEventData();

  }
  getEventData(){
        Meteor.call('getEventInfo',this.props.events[this.state.value],(err,res)=>{
          if(err){
            console.log(err);
          }else{

            let startAt = res.startAt.toLocaleString();
            let endAt = res.endAt.toLocaleString();
            this.setState({
              endAt: endAt,
              startAt: startAt
            });
          }
        });
  }
  handleMember(){
    $('#memebers').tooltip('remove');
    console.log(this.state.value);
  }

  toolTipFix(){
    $('#tool').tooltip('remove');
  }
  render(){
    return(
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="col s8">
              <span className="card-title">{this.props.jobinfo.jobTitle.text}</span>
              <p>{this.props.description}</p>
              <p>Supervisor: {this.props.jobinfo.supervisor.name}</p>
              <p>Phone: {this.props.jobinfo.supervisor.phone}</p>
            </div>
            <div className="col s2 offset-l2 offset-m2 offset-s2">
            </div>
          </div>
          <div className="row">
            <div className="col m8 s12">
              <div className="input-field col s12">
                <div className="row">
                  <span></span>
                  <select  id="jobTitles" ref="titles" value={this.state.value} onChange={this.handleProChange.bind(this)}>
                    {this.props.jobinfo.jobTypes.texts.map((title,i)=>{
                      return(
                        <option value={i} key={i}>{title}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col l6 m6 s12">
              <div className="row">
                <div className="col l6 m6 s12">
                  <p><b>Start time: </b>{this.state.startAt}</p>
                  <p><b>End time: </b>{this.state.endAt}</p>
                  <p><b>Pay: </b>{this.props.jobinfo.professionals[this.state.value].pay}</p>
                  <p><b>Location: </b>{this.props.jobinfo.location.locationName}</p>
                </div>
                <div className="col l6 m6 s12">
                  {!this.state.osha10 && !this.state.osha30 && <p><b>OSHA: </b>No preference</p>}
                  {this.state.osha10 && <p><b>OSHA: </b>OSHA 10</p>}
                  {this.state.osha30 && <p><b>OSHA: </b>OSHA 30</p>}
                  {this.state.license && <p><b>Driver license: </b>Yes</p>}
                  {!this.state.license && <p><b>Driver license: </b>None</p>}
                </div>
              </div>
            </div>
            <div className="col l5 m5 s12 offset-l1 offset-m1">
              <p><b>Professionals needed: </b>{this.props.jobinfo.professionals[this.state.value].numWorkers}</p>
              <p><b>Responsibilities: </b>{this.props.jobinfo.professionals[this.state.value].responsibilities}</p>
            </div>
            </div>
        </div>
      </div>
    );
  }
}


//Filter is here because 2 types of objects (professionals) are being called from the same collection
