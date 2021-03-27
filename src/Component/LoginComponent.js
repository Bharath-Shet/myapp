import React,{Component} from 'react';
import Header from './Header';
import './LoginComponent.css'
const RegisterUrl = "http://localhost:5000/login";

class Login extends Component{
    constructor(props){
        super(props)

        this.state={
            email:'',
            password:'',
            result:''
        }
    }

    handleChange=(event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit =() => {
        console.log(this.state)
        fetch(RegisterUrl,
            {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.state)
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({result:data.msg})
                if(data.msg == 'Wrong password'){
                    this.props.history.push('/login')
                }else if(data.msg == 'No User Found Register first'){
                    this.props.history.push('/login')
                }else{
                    sessionStorage.setItem('ltk', data.token)
                    this.props.history.push('/profile')
                }
            })
    }

    render(){
        return(
            <>
            <Header/>
            <div className="container">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        Login
                    </div>
                    <div className="panel-body">
                        <p id="success-failure">{this.state.result}</p>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={this.state.email}
                            className="form-control" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" value={this.state.password}
                            className="form-control" onChange={this.handleChange}/>
                        </div>

                        <button className="btn btn-success"
                        onClick={this.handleSubmit}>
                          Login
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Login