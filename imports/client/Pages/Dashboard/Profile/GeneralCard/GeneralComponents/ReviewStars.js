import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rating from 'react-rating';

class ReviewS extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      if(!this.props.ready){
        return(
          <h1>Loading</h1>
        );
      }
      else if (this.props.reviewAverage>0) {
        return(
        <div className="row">
          <div className="column s1">
          <Rating
           initialRate={this.props.reviewAverage}
           readonly={true}
           empty={<i className="material-icons" style={{fontSize: "25px", color: "#26a69a"}}>star_border</i>}
           full={<i className="material-icons" style={{fontSize: "25px", color: "#26a69a"}}>star</i>}
           fractions={2}
         />
         </div>
         <div className="column s1">
          {this.props.avg}
         </div>
        </div>
        )
      }else{
        return(
          <h6>No Reviews</h6>
        );
      }


  }
}
export default ReviewStars =  withTracker(props=>{
  let handle = Meteor.subscribe('reviews-for-you');
  let ready = handle.ready();
  let dataArray = [];
  let avg = 0;
  let reviews = Review.find({revieweeId:props.userId}).fetch();
  for(let index in reviews) {
      dataArray.push(reviews[index].rating);
  }
  let sum =  dataArray.length > 0 ?  dataArray.reduce(function(a, b) { return a + b; }) : 0;
  avg = dataArray.length > 0 ? (sum / dataArray.length): 0;


    return {
      reviewAverage:avg,
      ready:ready,
    };
})(ReviewS);
