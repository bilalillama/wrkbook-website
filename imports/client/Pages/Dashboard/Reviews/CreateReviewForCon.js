import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import EmployerTitle from './ContractorReviewComponents/EmployeerTitle';
import EmployerCheckBoxs from './ContractorReviewComponents/EmployeerCheckBox';
import ReviewSchema from '../../../../api/Schemas/reviewSchema';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';

export default class CreateReview extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          hasRated: false
      }
  }

  // Callback after rating the employer. rate is the star value out of 5 stars
  handleRate(rate) {
    this.setState({
      hasRated: true,
      rating: rate,
    });
  }

  componentDidMount(){
      Materialize.updateTextFields();
  }
  returnReview(e) {


    let review=ReviewSchema.clean({});
    review.revieweeId = this.props.conId;
    review.jobId = this.props.jobId;
    review.proReview = this.refs.checkbox.value();
    review.rating = this.state.rating;
    review.review.text = this.refs.reviewText.value();
    console.log(review);
    return{
      review: review,
      valid: this.state.hasRated,
    }

  }

  render() {
      return (
        <div className="card">
            <div className="card-content">
                <EmployerTitle conId={this.props.conId}/>
                <EmployerCheckBoxs ref="checkbox"/>

                  <div className="row">
                      <div className="col s12 m6 offset-m3">
                      <p>Please rate </p>
                      <Rating
                        initialRate={this.state.rating}
                        empty={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star_border</i>}
                        full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
                        fractions={2}
                        onChange={this.handleRate.bind(this)}
                      />
                      </div>
                  </div>
                  <div className="row">
                      <div className="col s12 m6 offset-m3">
                          <MTextField ref="reviewText" id="reviewText"  label="Anything else we should know?" />
                      </div>
                  </div>


            </div>
        </div>
    )
  }
}
