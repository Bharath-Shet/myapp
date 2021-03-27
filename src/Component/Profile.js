import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import './Profile.css'
const url = "http://localhost:5000/userinfo";

class Profile extends Component{
    constructor(){
        super()

        this.state={
            user:''
        }
    }

    handleLogout=() => {
        sessionStorage.removeItem('ltk');
        this.props.history.push('/login');
    }
    conditionRender = () => {
        if(this.state.user.role){
            if(this.state.user.role=="Admin"){
                return(
                    <Link className="btn btn-success" to="/list">All Users</Link>
                )
            }
        }
    }
    render(){
        if(sessionStorage.getItem('ltk') == null){
            this.props.history.push('/login');
        }
        sessionStorage.setItem('rtk',this.state.user.role)
        return(
            <>
               <Header/>
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h4>User Profile</h4>
                    </div>
                    <div className="panel-body">
                        <div className="card">                            
                            <p className="user-profile-details">Hi {this.state.user.fname}</p>
                            <p className="user-profile-details">Your Email id - {this.state.user.email}</p >
                            <p className="user-profile-details">Your Phone Number - {this.state.user.phone}</p>
                            <p className="user-profile-details">Your Date of birth - {this.state.user.dob}</p>
                            <p className="user-profile-details">Your role - {this.state.user.role}</p>
                        </div>
                    </div>
                    {this.conditionRender()}
                </div>
            </>
        )
    }

    componentDidMount(){
        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                user:data
            })
        })
    }


}

export default Profile;