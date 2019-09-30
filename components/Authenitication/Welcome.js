import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "../Capstone.css"


class Welcome extends Component {
    render() {
        return (
            <>  
                <div className="welcome--btns">
                    <Link to="/Registration"><button className="register--btn">register new account</button></Link>
                    <Link to="/Login"><button className="login--btn">login</button></Link>
                </div>
                <div>
                <picture>
                    <img src={require('./capstoneLogo2.png')} alt="Hee Hee" />
                </picture>
                </div>
            </>
        );
    }
}

export default Welcome;
