import React, {Component} from 'react';
import NewRef from './References/NewRef';
import EditRef from './References/EditRef';
import MSpinner from '../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
class Refs extends Component{
    render(){
        return(
            <div>

                <NewRef/>
                {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> : this.props.myRefs.map((reference,index)=>{
                    return(
                        <EditRef key={reference._id} reference={reference}/>
                    )
                })}
            </div>
        )
    }
}
export default References = withTracker(params  => {
    let handle = Meteor.subscribe('your-references');
    let ready = handle.ready();
    return {
        ready: ready,
        myRefs: Reference.find({}).fetch()
    };
})(Refs);