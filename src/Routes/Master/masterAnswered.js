import { useEffect, useState } from 'react';
import Navbar_Master from '../../Layouts/Components/NavbarMaster';
import { Spinner,Table } from 'react-bootstrap';
import { MasterGetAllAnsweredValues } from '../../Layouts/Functions/MasterFunction';
import { useNavigate } from 'react-router-dom';




function MasterAnswered() {
    const navigate=useNavigate();
    const [tableData, settableData] = useState("");
    const [ShowLoader,SetShowLoader]=useState(true);
    const fetchData = async () => {
        await MasterGetAllAnsweredValues().then(async data => {
            const responseData = await data.json();
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
    

    useEffect(() => {
        fetchData();
    }, [])

 

    return (
        <>
            <Navbar_Master>
            </Navbar_Master>
            <br></br>
            <h2 style={{ textAlign:'center' }}> Questions Answered By The Student </h2>
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {
                ShowLoader ?(<Spinner></Spinner>) : ( 
                    <Table striped bordered style={{ margin:'20px 20px 20px 20px' }}>
    <thead>
        <tr>
            <th>Id</th>
            <th>Student</th>
            <th>Name</th>
            <th>Input</th>
            <th>Result</th>
            <th>Master</th>

        </tr>
    </thead>
    <tbody>
    {
        tableData.map((data, index)=>{
            return(
                <tr key={index}>
                 
                    <td>{data.id}</td>
                    <td>{data.student}</td>
                    <td>{data.name}</td>
                    <td>{data.input}</td>
                    <td>{data.result}</td>
                    
                    <td>{data.master}</td>
        
                    
                </tr>
            )
        })
    }
    </tbody>
</Table>
                )
              }
            </div>

        </>
    );
}

export default MasterAnswered;