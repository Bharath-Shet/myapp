import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Header extends Component{

    constructor(){
        super()

    }
    handleLogout=() => {
        sessionStorage.removeItem('ltk');
    }

    conditionalRender = () =>{
        if(sessionStorage.getItem('ltk') == null || sessionStorage.getItem('ltk') == undefined){
            return(
                <>
                    <li><Link to="/">Home</Link></li>
                </>
            )
        }else{

        }
    }

    conditonalButtons = () =>{
        if(sessionStorage.getItem('ltk') == null || sessionStorage.getItem('ltk') == undefined){
            return(
                <>
                    <li>
                        <Link to="/">
                            <span class="glyphicon glyphicon-user"></span>Register
                        </Link>
                    </li>
        
                    <li>
                        <Link to="/login">
                            <span class="glyphicon glyphicon-log-in"></span> Login</Link>
                    </li>
                </>
            )
        }else{
            return(
                <>
                    <li>
                        <Link to='/'>
                            <button className="btn btn-danger" onClick={this.handleLogout}>
                                Logout
                            </button>
                        </Link>
                    </li>
                </>
            )
        }
    }
    render(){
    return(
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#"></a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                         {this.conditonalButtons()}
                    </ul>
                    </div>
                </div>
            </nav> 
        </div>
        )
    }
}

export default Header;