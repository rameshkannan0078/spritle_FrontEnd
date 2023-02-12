
import { useState } from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { SignupUser } from '../../Layouts/Functions/userFunctions';
import { useNavigate } from 'react-router-dom';
import  passwordIncorrect from '../../Layouts/Assets/passIncorrect.png';
import  userAlreadyExisted from '../../Layouts/Assets/userAlreadyExisted.png';
import  accountNotCreated from '../../Layouts/Assets/accountNotCreated.png';
import ModelMessage from '../../Layouts/Components/ModelMessage';
import { passwordValidation,checkUserExist } from '../../Layouts/Functions/Validation/Validator';


function SignupPage() {

  const [inputs,setInputs]=useState({
    name:'',
    password:'',
    email:'',
    confirm_password:'',
    user_type:'',
  });

  const [HeadingValue,setHeadingValue]=useState("");
  const [DescriptionValue,setDescriptionValue]=useState("");
  const [ImgValue,setImgValue]=useState("");

  const[showModel,setShowModel]=useState(false);
  
    const navigate=useNavigate();

    const closeModelchange = () => {
      setShowModel(false);
    };

  const ChangeHandle = (e) =>{
    setInputs({
      ...inputs,
      [e.target.name] : [ e.target.value]
    })
  }

  const CreateNewUser = async ( e) =>{
    e.preventDefault();
   
    if(!passwordValidation(inputs.password,inputs.confirm_password)){
      console.log("I am password checker")
      setHeadingValue("Password Not Matching");
      setDescriptionValue("Check the password once Again");
      setImgValue(passwordIncorrect)
      setShowModel(true);
    }
   else{

    await checkUserExist(inputs.email)
    .then(data => {
  
      const flag=(data===0);
      console.log("This will be users email present status " + (flag));
      if(flag === true){
        createNewUser();
      }
      else{
        console.log("I am user Checker")
        setHeadingValue("Existing User");
        setDescriptionValue("These user details are already existed !");
        setImgValue(userAlreadyExisted)
        setShowModel(true);
      }
      })
      .catch(error => {
        console.error(error);
      });
    
    }
  
    
}
  

const createNewUser = () =>{
  SignupUser(inputs.email,inputs.name,inputs.password,inputs.user_type).then(result => {
      if(result.message===0){
        setHeadingValue("Account Not Created");
        setDescriptionValue("Unable to create a new account at this moment!");
        setImgValue(accountNotCreated)
        setShowModel(true);
      }
  
       console.log(result)
        console.log('this is signup page ' +(inputs.user_type[0]==='2'))
        const tokenValues=result.access_Token;
        window.localStorage.setItem('access_token',tokenValues)
        if(inputs.user_type[0]==='1'){
        
          window.localStorage.setItem('Master_Email',inputs.email);
          navigate('/masterpage')
        }
        if(inputs.user_type[0]==='2'){
          console.log("This is token " + window.localStorage.getItem("access_token"))
          window.localStorage.setItem('Student_Email',inputs.email);
          navigate('/studentpage')
        }
      
      
    
   })
 .catch(err => console.log(err));
}



    return (
        <>
        {
          showModel ? (  <ModelMessage   closeModel={closeModelchange}  heading={HeadingValue} description={DescriptionValue} imgSrc={ImgValue}></ModelMessage>) :(<></>)
        }
        <div style={{ marginTop:'30px' }}>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Container style={{ backgroundColor:'#F5F5F5',border:'2px solid #F5F5F5',borderRadius:'15px',width: '80%', maxWidth: '400px',marginBottom:'50px'  }}>
        <h3 style={{ textAlign:'center',padding:'5px',marginTop:'5px'  }}>SIGNUP</h3>
        <Form  style={{ padding:'20px' }} onSubmit={CreateNewUser}>
            <Form.Group controlId="formEmail" >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={inputs.email}  onChange={ChangeHandle}  placeholder="Enter email" required />
            </Form.Group>
            <br></br>
       
            <Form.Group controlId="formPassword" >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={inputs.name}  onChange={ChangeHandle}  placeholder="Enter Username" required />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPassword" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  name="password" value={inputs.password}  onChange={ChangeHandle}  placeholder="Enter Password" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formConfirmPassword" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm_password" value={inputs.confirm_password}  onChange={ChangeHandle}  placeholder="Enter ConfirmPassword" required/>
            </Form.Group>
            <br></br>
            <Form.Group controlId="formUsertype" >
              <Form.Label>User Type</Form.Label>
              <Form.Select  name="user_type" value={inputs.user_type}  onChange={ChangeHandle} required>
              <option value="">select value</option>
                <option value="1">Master</option>
                <option value="2">Student</option>
              </Form.Select>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit" style={{ width:'100%' }} >
              Submit
            </Button>
         
           
          </Form>
         

          <p style={{ textAlign:'center' }}>Already have an account? <a href='/'>  Log in</a></p>   
         
    </Container>       
    </div>
        </div>
        </>
    );

}

export default SignupPage;