import React from 'react'
var imageWidth = {
    width: "12%",
  };

class EditUser extends React.Component{
        constructor()
        {
            super();
            this.state={
                image:''
            }
            this.updateUser = this.updateUser.bind(this);
        }


        updateUser(id){
            var formData = new FormData()
            formData.append("productImage",this.state.image);

            if(this.state.image){
                console.log("hiuihi")
                fetch('http://localhost:8000/upload',{
                method:'POST',
                body:formData
                }).then((response)=>response.json())
                .then((response)=>{
                    console.log(response.path)
                    fetch('http://localhost:8000/edituser/'+id,{
                    method:'put',
                    headers:{
                        'Accept':'application/json',
                       'Content-Type': 'application/json',
                    },
                     body:JSON.stringify({
                        firstname:this.firstname.value,
                        lastname:this.lastname.value,
                        email:this.email.value,
                        password:this.password.value,
                        productImage:response.path
                      }),
                  }).then((response)=>response.json())
                  .then((response)=>{
                    console.log(response)
                    //res.push(response)
                  },
                   this.props.history.push({pathname:'/userlist'}))})
            }
            else{
            fetch('http://localhost:8000/edituser/'+id,{
                 method:'put',
                 headers:{
                     'Accept':'application/json',
                     'Content-Type': 'application/json',
                 },
                body:JSON.stringify({
                    firstname:this.firstname.value,
                    lastname:this.lastname.value,
                    email:this.email.value,
                    password:this.password.value,
                    //productImage:this.state.image
                }),
                }).then((response)=>response.json())
                .then((response)=>{
                    console.log(response)

                    //res.push(response)
                })
                this.props.history.push({pathname:'/userlist'});
            }
        }


    render()
    {
        
        let view;
        var data=this.props.location.data
        // console.log(data.productImage)
        // // var productImage1=data.productImage
        // // var productImage= productImage1.replace(/^.*[\\\/]/, '');

        if(data){
            view=(
                <div>
                    FirstName:<input type="text"  defaultValue={data.firstname}  ref={(ref)=>this.firstname=ref}/><br/>
                    LastName:<input type="text"  defaultValue={data.lastname} ref={(ref)=>this.lastname=ref}/><br/>
                    Email<input type="email"  defaultValue={data.email}  ref={(ref)=>this.email=ref}/><br/>
                    Password<input type="password"  defaultValue={data.password} ref={(ref)=>this.password=ref}/><br/>
                    {/* Image:<input type=""  defaultValue={'http://localhost:8000/'+data.productImage || ''} ref={(ref)=>this.productImage=ref}  /><br/> */}
                    Image:<img  style={imageWidth} src={'http://localhost:8000/'+data.productImage || ''} /><br/>
                    Image:<input type="file"   onChange={e=>this.setState({image:e.target.files[0]})}/>
                    <input type="button" className="btn btn-primary" value="update" onClick={()=>this.updateUser(data._id)} /><br/>
                 </div>

            ) 
            
        }
       
        return(
            <div>
                    {view}
                   
                </div>
        )
    }
}

export default EditUser;