import React, {Component} from 'react';

const ConHowTo = () => {
  return (
    <div style={{backgroundColor: '#8DC1FD'}}>
      <h4 className="valign how-to-heading montserrat-med" style={{color: 'white', padding: '30px' }}>Are you a general or sub contractor? Do you own a small skilled trade company?</h4>
      <div className='row'>
        <div className="col m4 l4">
          <img style={{maxWidth: '100%',maxHeight: '100%'}} src='/images/Contractor-tag.png'/>
        </div>
      </div>
      <div className="row" style={{marginBottom: '0px'}}>
        <div className="col m6 l6 offset-l1 offset-m1">
          <img style={{paddingTop: '20px'}} className='responsive-img' src='/images/con-how-to/con-mockup.png'/>
        </div>
        <div className="col m4 l4">
          <img style={{paddingTop: '20px'}} className='responsive-img' src='/images/con-how-to/one-c.png'/>
          <span style={styles.ConHeading} className="montserrat-med ">Make a job post and list down: </span>
            <div className="container">
             <ul style={{color: 'white',fontSize:'20px'}}>
                <li>{`\u2022`} Certifications</li>
                <li>{`\u2022`} Specific Skills and Responsibilities</li>
                <li>{`\u2022`} Profession or Skilled Trade</li>
             </ul>
            </div>
          <div className="row">
            <div className="col s12">
              <img style={{paddingTop: '20px'}} className=' montserrat-med responsive-img' src='/images/con-how-to/two-c.png'/>
              <span style={styles.ConHeading}>Get matched to qualified professionals who applied to your job post  </span>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <img style={{paddingTop: '20px'}} className=' montserrat-med responsive-img' src='/images/con-how-to/three-c.png'/>
              <span style={styles.ConHeading}>Look through their profile and decide who you want to hire</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

let styles = {
  ConHeading: {
    fontSize: '25px',
    paddingLeft: '10px',
    color: 'white'
  }
}

export default ConHowTo;
