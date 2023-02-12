import Navbar_Master from "../../Layouts/Components/NavbarMaster";
import { Form, Button,Container,Table,Alert } from 'react-bootstrap';
import {useState} from 'react';
import { MasterAddCalculationValues,checkTheGivenInput,checkTheGivenInputOperations } from '../../Layouts/Functions/MasterFunction';
import { useNavigate } from 'react-router-dom';


function MasterPage(){

    const navigate=useNavigate();
    const [showErrorMessage,setshowErrorMessage]=useState(false);
    const [inputs,SetInputs]=useState({
        calculate_value:'',
        user_email:window.localStorage.getItem("Master_Email"),
      });

 

  
      const [alertShow,setalertShow]=useState(false);
    
      const ChangeHandle =(e)=>{
        e.preventDefault();
        SetInputs({
          ...inputs,
          [e.target.name]: [e.target.value]
        })
        
      }

      const closeAlert=()=>{
        setTimeout(()=>{
            setalertShow(false);
        },3000)
      }
      const AddInputValues = async (e) =>{
        e.preventDefault();
        
        let result = checkTheGivenInput(inputs.calculate_value[0]);
        let result2=checkTheGivenInputOperations(inputs.calculate_value[0]);
        console.log(result);
        console.log(result2);
       if(result){
        setshowErrorMessage(true);
        setTimeout(()=>{
          setshowErrorMessage(false)
        },5000)
       }
       else if(result2){
        setshowErrorMessage(true);
        setTimeout(()=>{
setshowErrorMessage(false)
        },5000)
       }
       else{
        await MasterAddCalculationValues(inputs.user_email,inputs.calculate_value[0])
        .then(data=>{
          if(data.status===200){
            console.log(data)
              setalertShow(true)
              closeAlert()
          }
          else if(data.status===401){
            navigate('/401_page')
          }
          else if(data.status===404){
            navigate('/404_page')
          }
        }).catch((err)=>{
          console.log(err)
        })
       }
      }
 
    

    return(
        <>
            <Navbar_Master></Navbar_Master>
            {
                alertShow ? (
                    <Alert key={'success'} variant={'success'}>
                   <p style={{ fontSize:'18px' }}>&#128524;  Input value has been added successfully !</p> 
                    </Alert>
                ) : (<> </>) 
            }
            <Table striped bordered style={{ marginTop:'20px',padding:'30px' }}>
        
      <thead >
      <tr><th style={{ textAlign:'center',padding:'20px' }} colSpan={3}>Following Operations Are Allowed!</th></tr>
        <tr>
        
          <th style={{ padding:'20px' }}>Operations</th>
          <th style={{ padding:'20px' }} colSpan={2}>plus() , minus() , times() , divided_by() </th>
        </tr>
        <tr>
          <th style={{ padding:'20px' }}>Numbers</th>
          <th colSpan={2} style={{ padding:'20px' }}>zero() , one() ,two() ,three() ,four() ,five() ,six() ,seven() ,eight() ,nine() .</th>
        </tr>
        <tr>
        <th colSpan={3}>
        <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'50vh',marginTop:'10px' }}>
        <Container style={{  border: '4px solid green!important',backgroundColor:'#F5F5F5',borderRadius:'15px',width: '100%', maxWidth: '400px'  }}>
        <h3 style={{ textAlign:'center',padding:'5px',marginTop:'5px'  }}>Input Values</h3>
        <Form  style={{ padding:'20px' }} onSubmit={AddInputValues}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Input Calculation</Form.Label>
              <Form.Control type="text" name="calculate_value" placeholder="Enter the functions"  value={inputs.calculate_value} onChange={ChangeHandle} required/>
              <br></br>
              <Button type='submit' variant='primary' style={{ width:'100%' }}>Calculate the Value</Button>
            </Form.Group>
            <br></br> 
            {
             showErrorMessage ? ( <p style={{ color:'red',fontSize:'18px' }}> Your input is not valid. Kindly ! Ensure the input</p>   ) : (<></>)
            } 
            <br></br>   
          </Form>
         

         
    </Container>       
    </div>
        </th>
        </tr>
      </thead>
    </Table>
  
   
  
        </>
    );
}

export default MasterPage;