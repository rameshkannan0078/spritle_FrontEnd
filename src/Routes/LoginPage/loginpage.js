
import { Form, Button,Container } from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {  LoginUser } from '../../Layouts/Functions/userFunctions';
import ModelMessage from '../../Layouts/Components/ModelMessage';
import  notvaliduser from '../../Layouts/Assets/notvaliduser.png';

function LoginPage() {

    const [inputs,SetInputs]=useState({
      email:'',
      password:'',
      user_type:''
    });
  
    const[showModel,setShowModel]=useState(false);
    const navigate=useNavigate();

    const closeModelchange = () => {
      setShowModel(false);
    };

    const ChangeHandle =(e)=>{
      e.preventDefault();
      SetInputs({
        ...inputs,
        [e.target.name]: [e.target.value]
      })
      
    }

    useEffect(()=>{
     
        if (window.localStorage.getItem('Student_Email')) {
          navigate('/studentpage');
        }
        else if(window.localStorage.getItem('Master_Email')){
          navigate('/masterpage');
        }
      
    },[]);

  const LoginUserWithDetails = async (e) =>{
    e.preventDefault();
    await  LoginUser(inputs.email,inputs.password,inputs.user_type).then(result => {
    
      if(result.message===0){
        setShowModel(true);
        console.log(showModel)
      }
      else{
        console.log(result.access_Token);
        window.localStorage.setItem('access_token',result.access_Token)
        if(inputs.user_type[0]==='1'){
          window.localStorage.setItem('Master_Email',inputs.email);
          navigate('/masterpage')
        }
        else{
          window.localStorage.setItem('Student_Email',inputs.email);
          navigate('/studentpage')
        }
      }
     })
   .catch(err => console.log(err));
   
    }


    return (
        <>
        {
          showModel ? (  <ModelMessage   closeModel={closeModelchange} heading="Invalid Credentials" description="Your not an valid user" imgSrc={notvaliduser}></ModelMessage>) :(<></>)
        }
        <h3 style={{ textAlign:'center' }}>You Tell ,I Do  	(&#128513;) </h3>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',marginTop:'5px' }}>
        <Container style={{  border: '4px solid green!important',backgroundColor:'#F5F5F5',borderRadius:'15px',width: '100%', maxWidth: '400px'  }}>
        <h3 style={{ textAlign:'center',padding:'5px',marginTop:'5px'  }}>LOGIN</h3>
        <Form  style={{ padding:'20px' }} onSubmit={LoginUserWithDetails}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email"  value={inputs.email} onChange={ChangeHandle} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={inputs.password}  onChange={ChangeHandle} required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formBasicUsertype">
              <Form.Label>User Type</Form.Label>
              <Form.Select  name="user_type" value={inputs.user_type}  onChange={ChangeHandle} required>
              <option value="">Select the user</option>
                <option value="1">Master</option>
                <option value="2">Student</option>
              </Form.Select>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit" style={{ width:'100%' }} >
              Submit
            </Button>
            <br></br>
        
          </Form>
         

          <p style={{ textAlign:'center' }}>Don't have an account? <a href='/signup'>  Sign up</a></p>   
         
    </Container>       
    </div>
        </>
    );

}

export default LoginPage;