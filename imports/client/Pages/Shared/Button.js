import React ,{Component} from 'react';
import { Link } from 'react-router-dom';


export default Button = (props)=> {
    return(
        
            <Link onClick={props.onClick} to={props.to} >
                <h5 className="heading hBut">{props.children}</h5>
            </Link>


    )
}