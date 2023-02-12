import { useEffect, useState } from 'react';
import Navbar_Master from '../../Layouts/Components/NavbarMaster';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FindUserDetails } from '../../Layouts/Functions/StudentFunctions';

import { useNavigate } from 'react-router-dom';



function MasterAbout() {

    const navigate=useNavigate();
    const [data, SetFinalData] = useState("");
    const [ShowLoader,SetShowLoader]=useState(true);

    
    const fetchData = async () => {
        await FindUserDetails(localStorage.getItem("Master_Email")).then(async data => {
            const responseData = await data.json();
            if(data.status === 200) {
                console.log(responseData);
                SetFinalData(responseData.message);
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

    console.log(data.email)

    return (
        <>
            <Navbar_Master>
            </Navbar_Master>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', marginTop: '90px' }}>
              {
                ShowLoader ?(<Spinner></Spinner>) : (  <Card>
                    <Card.Header style={{ textAlign : 'center',fontWeight:'bold',fontSize:'28px'}}>Master Detail     </Card.Header>
                    <Card.Body>

                        <Card.Text>
                          <h5>Name</h5>
                          <h4>{data.name}</h4>
                          <h5>Email</h5>
                          <h4>{data.email}</h4>
                          <h5>password</h5>
                          <h4>{"##############"}</h4>
                          <h5>User Type</h5>
                        <h4>  {data.user_type}</h4>
                        </Card.Text>
                        {/* <Button variant="danger" style={{ width:'100%' }}>Delete</Button> */}
                    </Card.Body>
                </Card>)
              }
            </div>

        </>
    );
}

export default MasterAbout;