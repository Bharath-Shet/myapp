import React,{Component} from 'react';
import validator from 'validator';
import './RegisterComponent.css';
import Header from './Header';

const RegisterUrl = "http://localhost:5000/register";

class Register extends Component{
    constructor(props){
        super(props)

        this.state={
            fname:'',
            email:'',
            password:'',
            cpassword:'',
            phone:'',
            dob:'',
            isNameValid:false,
            isEmailValid:false,
            isPWDValid:false,
            isCPwdValid:false,
            isPhoneValid:false,
            result:''
        }
    }

    validatename = () =>{
        var fname = document.getElementById('fname').value;
        fname = fname.trim()
        if(!validator.isAlpha(fname)){
            document.getElementById('name-error').innerText="Fill the Name Fields !"
            this.setState({isNameValid:false})
        }else{
            document.getElementById('name-error').innerText=""
            this.setState({isNameValid:true})
        }
    }

    validateEmail = () =>{
        var email = document.getElementById('email').value;
        if(!validator.isEmail(email)){
            document.getElementById('email-error').innerText="Please Enter Valid Email"
            this.setState({isEmailValid:false})
        }else{
            this.setState({isEmailValid:true})
            document.getElementById('email-error').innerText=""
        }
    }


    validatePwd = () => {
        var pwd = document.getElementById('password').value;
        if(pwd.length<15){
            if(pwd.length<8){
                document.getElementById('pwd-error').innerText="Minimum Length of password is  8";

                document.getElementById('pwd_str').style.visibility="visible";
                document.getElementById('pwd_str').style.width = '30%';
                document.getElementById('pwd_str').style.background="red";
                this.setState({isPWDValid:false})
            }else if(pwd.length<10){
                document.getElementById('pwd-error').innerText="";
                document.getElementById('pwd_str').style.visibility="visible";
                document.getElementById('pwd_str').style.width = '60%';
                document.getElementById('pwd_str').style.background="orange";
                this.setState({isPWDValid:true})
                
            }
        }else{
            document.getElementById('pwd_str').style.width = '100%';
            document.getElementById('pwd_str').style.background="green"
            this.setState({isPWDValid:true})
        }
    }

    validateCPwd=()=>{
        var pwd = document.getElementById('password').value;
        var cpwd = document.getElementById('cpassword').value;
        if(pwd !== cpwd){
            document.getElementById('cpwd-error').innerText="Password does not match";
            this.setState({isCPwdValid:false})
        }else{
            document.getElementById('cpwd-error').innerText = "";
            this.setState({isCPwdValid:true})
        }
    }


    validatePhone = () =>{
        var phone = document.getElementById('phone').value;
        if(!validator.isMobilePhone(phone,['en-IN'])){
            document.getElementById('phone-error').innerText="Please Enter Valid Mobile Number"
            this.setState({isPhoneValid:false})
        }else{
            document.getElementById('phone-error').innerText=" "
            this.setState({isPhoneValid:true})
        }
    }


    validateDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        yyyy = yyyy - 18;
        today = yyyy + '-' + mm + '-' + dd;
        var my = yyyy - 120
        var min = my + '-' + mm + '-' + dd;
        
        // console.log(min)
        // console.log(today)
        // console.log(typeof(today))

        return [min,today];
    }

   
    handleChange=(event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit =() => {
        console.log(this.state)
        if(this.state.isNameValid == true && this.state.isEmailValid == true  && this.state.isPWDValid == true  && this.state.isCPwdValid == true && this.state.isPhoneValid == true){
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
            .then((data) =>{
                this.setState({result:data.msg})
                if(data.msg == 'Register success'){
                    this.props.history.push('/login')
                }else{
                    this.props.history.push('/')
                }
            })
        }else{
            this.setState({result:'Fill All The Fields'})
            this.props.history.push('/')
        }
    }

    render(){
        return(
            <>
                <Header/>
            <div className="container">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        Register
                    </div>
                    <div className="panel-body">
                        <p id="success-failure">{this.state.result}</p>
                        <div className="form-group col-md-12">
                            <label>First Name</label>
                            <input name="fname" id="fname" value={this.state.fname}
                            className="form-control" onChange={this.handleChange} onBlur={this.validatename}
                            />

                            <p id="name-error" className="display-error"></p>

                        </div>

                       
           
                        <div className="form-group col-md-12">
                            <label>Email</label>
                            <input name="email" id="email" value={this.state.email}
                            className="form-control" onChange={this.handleChange} onInput={this.validateEmail}/>
                             <p id="email-error" className="display-error"></p>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Password</label>
                            <input name="password" id="password" value={this.state.password}
                            className="form-control" onChange={this.handleChange} onInput={this.validatePwd}/>
                            <p id="pwd-error" className="display-error"></p>
                            <div id="pwd_str"></div>
                        </div>

                        <div className="form-group col-md-6">
                            <label>Confirm Password</label>
                            <input type="password"className="form-control" id="cpassword" name="cpassword"  placeholder="Confirm Password" value={this.state.cpassword} onChange={this.handleChange} onInput={this.validateCPwd}/>

                            <p id="cpwd-error" className="display-error"></p>
                        </div>

                        <div className="form-group col-md-12">
                            <label>Phone</label>
                            <input name="phone" id="phone" value={this.state.phone}
                            className="form-control" onChange={this.handleChange} onInput={this.validatePhone} />

                            <p id="phone-error" className="display-error"></p>

                        </div>

                        <div className="form-group col-md-12">
                            <label>DOB</label>
                            <input type="date" name="dob" value={this.state.dob}
                            className="form-control" onChange={this.handleChange}
                            min={this.validateDate()[0]} max={this.validateDate()[1]}/>
                        </div>



                        <button className="btn btn-success"
                        onClick={this.handleSubmit}>
                          Register
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Register