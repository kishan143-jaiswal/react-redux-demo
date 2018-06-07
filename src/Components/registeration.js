import React from 'react'
import {connect} from 'react-redux'
import {register}  from '../Actions/action';
//import { withRouter } from "react-router-dom";

class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.saveUser = this.saveUser.bind(this);
    }
    // handlechange(event){
    //      console.log("event.target",event.target.files[0])
    //     //this.setState({image:event.target.files[0]})
    // }
    render(){
       
        let {firstname,lastname,email,password,image}=this.state
        return(
          
            <form name=" registerform" className="login-wrap" onSubmit={this.saveUser} style={{textAlign:"center"}}>
             <h1>Registration Form</h1>
           <div className="form">
                FirstName:<input type="text"  value={firstname} name="firstname" onChange={e => this.setState({firstname: e.target.value})}/><br/>
                LastName:<input type="text"  value={lastname} name="lastname" onChange={e=>this.setState({lastname:e.target.value})}/><br/>
                Email:<input type="email"  value={email} name="email" onChange={e=>this.setState({email:e.target.value})}/><br/>
                Password:<input type="password"  value={password} name="password" onChange={e=>this.setState({password:e.target.value})}/><br/>
                Image:<input type="file"  onChange={e=>this.setState({image:e.target.files[0]})}/>
                <input type="submit"  value="save"/>
           </div>
            </form>
           
        )
    }

    saveUser(event){
     
        event.preventDefault();
        let {firstname,lastname,email,password,image}=this.state
        //var imagename = image.replace(/^.*[\\\/]/, '');
        var imagename = image
        this.props.register(firstname,lastname,email,password,imagename)
        this.setState({
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            image:''
        })
        this.props.history.push({pathname:'/userlist'});
        
    }
}

const mapStateToProps = (state) => {
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        register: (firstname,lastname,email,password,imagename) => dispatch(register(firstname,lastname,email,password,imagename))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Registration);