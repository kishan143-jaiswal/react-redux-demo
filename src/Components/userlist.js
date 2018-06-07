import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

var imageWidth = {
  width: "12%",
};

class UserList extends Component {
  constructor(){
    super();
    this.state={
        person:[],
        //users:JSON.parse(localStorage.getItem('session')),
    }
    this.DeleteUser = this.DeleteUser.bind(this);
  }

 
    DeleteUser(email){
      fetch('http://localhost:8000/delete',{
          method:'delete',
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
          },
            body:JSON.stringify({
            email:email
       }),
    })
    }


    changeState(){
      fetch(`http://localhost:8000/registered_user`)
    .then(response => {
        return response.json();
      })
    .then(json =>{
      const person = json.map(obj => obj);
          this.setState({person});
      })
      .catch((error) => {
            console.log(error)
        });

    }

    edituser(data){
      console.log(data)
      this.props.history.push({pathname:'/edituser',data:data});
    }

  render() {

    this.changeState();

    return (
      <div>
       {/* <ul>
         {this.state.users && this.state.users.length ? this.state.users.map((data,index)=>(
         <span key={index}>
             {data && data.firstname ?  <li>{data.firstname}</li> : ''}
          </span> 
         )):''}
         </ul> */}
         {/* <h1 style={{textAlign:"center"}}>Details of users</h1> */}
      <table className="table">
            <thead>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Images</th>
                    <th>Buttons</th>
                </tr>
            </thead>
            {this.state.person && this.state.person.length ? this.state.person.map((data,index)=>
            (
              <tbody key={index}>
                      {data && data.lastname ?<tr><td>{data.firstname}</td>
                      <td>{data.lastname}</td>
                      <td>{data.email}  </td>
                     <td><img src={data.productImage} style={imageWidth} alt="image"/></td>
                      <td><button className="btn btn-danger" onClick={()=>this.DeleteUser(data.email)}>Delete</button>
                      <button className="btn btn-warning" onClick={()=>this.edituser(data)}>Edit</button></td>
                      </tr>:''}
              </tbody>)):''}
      </table>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
      users:state.registerReducer.user
  };
};

export default withRouter(connect(mapStateToProps)(UserList));