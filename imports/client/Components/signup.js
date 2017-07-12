import React from 'react';
import TextField from 'material-ui/TextField';
import {browserHistory} from 'react-router';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

injectTapEventPlugin();

export default class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    var what_person = props['data-pageName'];
    let checked1 = what_person === "Contractor" ? true : false;
    this.state = {
      checked1: checked1,
      checked2: !checked1,
      showBar : false,
      validations: {
        fEmpty : false,
        lEmpty : false,
        eEmpty : false,
        p1Empty: false,
        pValid : true,
        p2Empty: false,
        nEqual : false,
        isEmail: true,
        phoneE : false,
        gPhone : true,
      }
    };

  }
  handleCheck(e) {
    let checked1 = e.target.id === "C" ? true : false;
    this.setState({
      checked1: checked1,
      checked2: !checked1
    });
  }

  handleSubmit(e){
    const firstName = this.refs.first_name.getValue().trim();
    const lastName  = this.refs.last_name.getValue().trim();
    const email     = this.refs.email.getValue().trim();
    const password1 = this.refs.password1.getValue().trim();
    const password2 = this.refs.password2.getValue().trim();
    const isPro     = this.state.checked1;
    const phone     = this.refs.phone.getValue().trim();

    const User = {
      email: email,
      password: password1,
      password2: password2,
      profile: {
        firstName : firstName,
        lastName  : lastName,
        isPro     : isPro,
        dateJoined: new Date(),
        phone     : phone,
      }
    };
    Meteor.call('register', User, (err)=>{
      if(err) {
        console.log(err);
        this.setState({
          validations: err.reason
        });
      }
      else{
        let path = isPro ? '/pro_singup_3' : '/con_signup_1';
        Meteor.loginWithPassword(User.email, User.password);
        this.props.history.push('/steptwo');
      }
    });
  }
  render(){
    let fnameE = this.state.validations.fEmpty  ? 'First Name is required' : '';
    let lnameE = this.state.validations.lEmpty  ? 'Last Name is required'  : '';
    let p1Err  = this.state.validations.p1Empty
              || !this.state.validations.pValid ? 'Password is weak' : '';
    let p2E    = this.state.validations.p2Empty
              || this.state.validations.nEqual  ? 'Passwords don\'t match' : '';
    let emailE = this.state.validations.eEmpty
              || !this.state.validations.isEmail ? 'Not a valid Email' : '';
    let phoneEmpty = this.state.validations.phoneE
              || !this.state.validations.gPhone ? 'Not a valid phone number' : '';

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
        <Card>
          <CardHeader
            title="Sign Up"
          />
          <CardText>
            <div>
              <TextField
                floatingLabelText="First Name"
                errorText={fnameE}
                ref="first_name"
                fullWidth={true}
              /><br />

              <TextField
                floatingLabelText="Last Name"
                errorText={lnameE}
                ref="last_name"
                fullWidth={true}
              /><br />

              <TextField
                floatingLabelText="Email Address"
                errorText={emailE}
                ref="email"
                fullWidth={true}
              /><br />
              <TextField
                floatingLabelText="Phone Number"
                errorText={phoneEmpty}
                ref="phone"
                type="tel"
                fullWidth={true}
              /><br />
              <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                errorText={p1Err}
                ref="password1"
                type="password"
              /><br />

              <TextField
                hintText="Enter Password Again"
                floatingLabelText="Confirm Password"
                errorText={p2E}
                ref="password2"
                type="password"
              /><br /><br/>
              <Checkbox
                label="Contractor"
                id='C'
                checked={this.state.checked1}
                onCheck={this.handleCheck.bind(this)}
              />
              <br/>
              <Checkbox
                label="Professional"
                id='P'
                checked={!this.state.checked1}
                onCheck={this.handleCheck.bind(this)}
              />
              <br/>
            </div>
          </CardText>
          <CardActions>
            <RaisedButton  onTouchTap={this.handleSubmit.bind(this)} label="Submit" />
          </CardActions>
          <br/>
          <br/>
          { this.state.showBar && <LinearProgress mode="indeterminate" /> }
        </Card>

        </div>
      </MuiThemeProvider>
    )
  }
}
