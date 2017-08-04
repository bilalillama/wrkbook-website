import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';
export default About = ()=> {
    return (
        <div id="our-story">
            <div className="container">
                <div>
                    <h4 style={{fontStyle:'bold',fontSize:'40px'}} className="genText">Our Story</h4>
                    <p  className="flow-text genText">William De Andrade, the son of a contractor, was always seeing the problems and stress that his father faced when looking for employees, especially during deadlines. Currently, contractors can only find employees by word of mouth, references, phone calls, and as a last resort, finding workers at the corner. These methods are time consuming, stressful, and risky. The construction industry has been left behind by the technology industry. WrkBook is here to help it out, with the help of co-founders Yuk Kee Chang and Eric Wiener. </p>
                    <p  className="flow-text genText">WrkBook was started in December 2016 while participating in the Zahn Innovation Center's Annual Venture Competition. After winning first place and the grand prize, the company was accepted in to the Zahn Center's Accelerator Program. The company is currently working with mentors at BNY Mellon and Willkie Farr & Gallagher to help bring the solution to your fingertips. </p>
                </div>
            </div>
        </div>
    )
}
