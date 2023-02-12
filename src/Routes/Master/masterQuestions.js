import { useEffect, useState } from 'react';
import Navbar_Master from '../../Layouts/Components/NavbarMaster';
import { Spinner,Table } from 'react-bootstrap';
import { MasterGetAllUnCalculatedValues } from '../../Layouts/Functions/MasterFunction';
import { useNavigate } from 'react-router-dom';


function MasteredQuestions() {


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
    



    // const fetchData = async () => {
    //     await MasterGetAllUnCalculatedValues().then(data => {
            
    //         if(data.status===200){
    //             console.log(data);
    //             settableData(data);
    //             SetShowLoader(false);
    
          
    //         }
    //         else if(data.status===401){
    //           navigate('/401_page')
    //         }
    //         else if(data.status===404){
    //           navigate('/404_page')
    //         }
    //     })
    // };

    useEffect(() => {
        fetchData();
    }, [])

 

    return (
        <>
            <Navbar_Master>
            </Navbar_Master>
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
            <th>Student</th>
            <th>Input</th>
            <th>Master</th>
            <th>Evaluated</th>
        </tr>
    </thead>
    <tbody>
    {
        tableData.map((data, index)=>{
            return(
                <tr key={index}>
                 
                    <td>{data.id}</td>
                    <td>{data.student}</td>
                    <td>{data.input}</td>
                    <td>{data.master}</td>
                    <td>{data.Evaluated===0 ? "Not Evaluated" : "Evaluated"}</td>
                    
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

export default MasteredQuestions;