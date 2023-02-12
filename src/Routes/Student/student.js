import Navbar_Student from '../../Layouts/Components/NavbarStudent';
import { useEffect, useState } from 'react';
import { Spinner,Table,Button } from 'react-bootstrap';
import { MasterGetAllUnCalculatedValues } from '../../Layouts/Functions/MasterFunction';
import { CalculateTheValues,SubmitTheAnswers } from '../../Layouts/Functions/StudentFunctions';
import { useNavigate } from 'react-router-dom';

function StudentPage(){
  const navigate=useNavigate();

  const [tableData, settableData] = useState("");
  const [ShowLoader,SetShowLoader]=useState(true);

  const fetchData = async () => {
    await MasterGetAllUnCalculatedValues().then(async data => {
        const responseData = await data.json();
        console.log(responseData);
        if(data.status === 200) {
            console.log(responseData);
            settableData(responseData.message);
            SetShowLoader(false);
        } else if (data.status === 401) {
            navigate('/401_page');
        } else if (data.status === 404) {
            navigate('/404_page');
        }
    });
};


useEffect(()=>{

    setTimeout(()=>{
        fetchData();
    },1000)
},[])

const CalculateTheCurrentValue =async (id,input,master)=>{
  const finalValue=CalculateTheValues(id,input,master);
  const responseData = await SubmitTheAnswers(id,input,master,window.localStorage.getItem("Student_Email"),finalValue);
  console.log(responseData)
  if(responseData.status === 200) {
    fetchData();
}else{
    alert("Unable Evaluate Right Now !")
}
}


    return(
        <>
          <Navbar_Student>
          </Navbar_Student>
          <br></br>
            <h2 style={{ textAlign:'center' }}> Questions Posted by the Master </h2>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {
                ShowLoader ?(<Spinner></Spinner>) : ( <>
                   
             
                    <Table striped bordered style={{ margin:'20px 20px 20px 20px' }}>
    <thead>
        <tr>
            <th>Id</th>
            <th>Input</th>
            <th>Master</th>
            <th>Calculate</th>
       
        </tr>
    </thead>
    <tbody>
    {
        tableData.map((data, index)=>{
            return(
                <tr key={index}>
                     <td>{data.id}</td>
                    <td>{data.input}</td>
                    <td>{data.master}</td>
                    <td> <Button variant='primary' onClick={()=>CalculateTheCurrentValue(data.id,data.input,data.master)}> Evaluate </Button></td>  
                </tr>
            )
        })
    }
    </tbody>
</Table>

                </>
                   
                )
              }
            </div>

        </>
    );
}

export default StudentPage;