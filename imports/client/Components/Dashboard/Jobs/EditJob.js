import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton  from 'material-ui/RaisedButton';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';

import SelectField from 'material-ui/SelectField';
const jobtitles = [
    'Painter','Demolititoner','Glazer','Masonry/Stone Worker',
    'Concrete Finisher','Plumber','Electrician','Heat/Air conditioning Worker'
];

export default class EditJob extends React.Component{
    constructor(props) {
        super(props);
        let des =  this.props.jobs.description.text;
        let addition = this.props.jobs.additionText.text;
        let pay = this.props.jobs.pay
        this.state = {
            address: 'NONE',
            titles: [],
            startT: '',
            startD: '',
            endT: '',
            endD: '',
            des: des,
            addition: addition,
            pay:pay,
            lat: -100,
            lng: -100
        };
    }

    getCoords(lat, lng){
        console.log(lat);
        this.setState({
            address: this.refs.GoogleAuto.state.searchText,
            lat:lat,
            lng:lng
        });
    }

    handleChangeJob = (event, index, titles) => this.setState({titles});

    handleUpdate(e){
        let jobs = JobSchema.clean({});
        let job = this.props.jobs;
        jobs.description.text = this.refs.jobDescription.getValue().trim();
        jobs.pay = this.refs.pay.getValue().trim();
        jobs.additionText.text = this.refs.additional.getValue().trim();
        jobs.jobTypes.texts = this.state.titles;
        jobs.location.locationName = this.state.address;
        jobs.location.latitude = this.state.lat;
        jobs.location.longitude = this.state.lng;
        let startDate = this.state.startD;
        let startTime = this.state.startT;
        let endDate = this.state.endD;
        let endTime = this.state.endT;
        // console.log(startDate);
        location.locationName = this.state.address;
        location.latitude = this.state.lat;
        location.longitude = this.state.lng;

        // console.log('h');
        const idx = startTime.indexOf('T');
        const idx1 = startTime.indexOf('.');
        const idx2 = startTime.indexOf('Z');
        const toremove = startTime.substr(idx1,idx2);

        startDate = startDate.substr(0,idx);
        startDate = startDate.split('"').join('');
        startTime = startTime.substr(idx,startTime.length);
        startTime = startTime.replace(toremove,"Z");
        const startAT = startDate+startTime;
        const toremove2 = endTime.substr(idx1,idx2);
        endDate = endDate.substr(0,idx);
        endDate = endDate.split('"').join('');
        endTime = endTime.substr(idx,endTime.length);
        endTime = endTime.replace(toremove2,"Z");
        endTime = endTime.substr(idx,endTime.length);
        const endAT = endDate+endTime;

        Meteor.call('updateJob',job._id,jobs,(err)=>{
            if(err){
              console.log(err);
            }
        });

        this.props.onSelect();

    }
    handleClose(e){
      this.props.onSelect();
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
    menuItems2(values) {
    return jobtitles.map((name) => (
        <MenuItem
            key={name}
            insetChildren={true}
            checked={values && values.indexOf(name) > -1}
            value={name}
            primaryText={name}
        />
      ));
    }
    render(){
        const {titles} = this.state;
        return(
            <MuiThemeProvider>
                <div>
                    <TextField
                        floatingLabelText="Enter a brief description on the professionals responsibilites"
                        defaultValue={this.state.des}
                        multiLine={true}
                        fullWidth={true}
                        ref="jobDescription"
                    />
                    <div className='row' style={{justifyContent:'space-around'}}>
                        <DatePicker
                            hintText="Start Date "
                            mode="landscape"
                            onChange={(x, event) => this.setStartD(x,event)}
                        />
                        <TimePicker
                            onChange={(x, event) => this.setStartT(x,event)}
                            hintText="Start Time"
                        />
                    </div>
                    <div className='row' style={{justifyContent:'space-around'}}>
                        <DatePicker
                            hintText="End Date "
                            mode="landscape"
                            onChange={(x, event) => this.setEndD(x,event)}
                        />
                        <TimePicker
                            hintText="End Time"
                            onChange={(x, event) => this.setEndT(x,event)}
                        />
                    </div>
                      <TextField
                          floatingLabelText="$0.00"
                          defaultValue={this.state.pay}
                          ref="pay"
                          style={{width:'50px'}}
                      />
                      <GooglePlaceAutocomplete
                          ref = 'GoogleAuto'
                          hintText="Please Enter Address"
                          results={this.getCoords.bind(this)}
                       />
                       <TextField
                           floatingLabelText="Additional Information:"
                           defaultValue={this.state.addition}
                           multiLine={true}
                           fullWidth={true}
                           ref="additional"
                        />
                        <div>
                            <SelectField
                                multiple={true}
                                hintText="Select all types of Employees needed"
                                value={titles}
                                onChange={this.handleChangeJob}
                                style={{width:'500px'}}>
                                {this.menuItems2(titles)}
                            </SelectField>
                        </div>
                        <RaisedButton
                            backgroundColor="#10a96d"
                            label="Update Job"
                            onTouchTap={this.handleUpdate.bind(this)}
                            fullWidth={true}
                        /><br />

                </div>
            </MuiThemeProvider>
        )
    }
}
