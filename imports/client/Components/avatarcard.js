import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactStars from 'react-stars';

export default class ProfileCardComponent extends React.Component{
  constructor(props){
    super(props);
    var full_name = props['full_name'];
    var job_positon_name =props['positon_name'];
    var avatar_pic_1 = props['avatar_pic_1'];
    var  number_jobs= props['number_jobs'];
    var profile_location = props['profile_location'];
    this.state ={
      isEdit: true,
      ratingValue:3,
    }
  }
  ratingChanges(newRating){
    this.setState({isEdit: !this.state.isEdit});
    this.setState({ratingValue: newRating});
    console.log(newRating);
  }

  render(){
    return(
      <MuiThemeProvider>
        <Card>
          <CardHeader/>
          <CardMedia>
            <div style={{display: 'flex', flexDirection: 'row',width:'100vw', textAlign: 'center',}}>
              <div id= "left_side_image" style={{width:'50%'}}>
                <Avatar
                  src={this.props.avatar_pic_1}
                  size={180}/>
              </div>
              <div id = "right_side_image" style ={{padding:'7px'}}>
                <h1 style= {{fontWeight:'bolder',fontSize:'2em'}}>{this.props.full_name}</h1>
                <ReactStars
                  count ={5}
                  size={45}
                  color2={'#4169E1'}
                  value ={this.state.ratingValue}
                  onChange ={this.ratingChanges.bind(this)}/>
                <h2 style ={{
                  fontFamily:'sans-serif',
                  fontWeight:'lighter',
                  marginTop:'2px',
                  marginBottom:'8px'}}>
                  {this.props.job_positon_name}
                </h2>
                <i>
                  <h3 style ={{
                    fontFamily:'sans-serif',
                    fontWeight:'lighter',
                    margin:'0'}}>
                    {this.props.number_jobs +" Jobs Completed"}
                  </h3>
                </i>
                <i>
                  <h4 style ={{
                    fontFamily:'sans-serif',
                    fontWeight:'lighter',
                    margin: '5px'}}>
                    {this.props.profile_location}
                  </h4>
                </i>
              </div>
            </div>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    )
  }
}
