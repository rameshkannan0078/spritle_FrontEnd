import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./Routes/LoginPage/loginpage";
import MasterPage from "./Routes/Master/master";
import MasterAbout from "./Routes/Master/masterAbout";
import MasterAnswered from "./Routes/Master/masterAnswered";
import MasteredQuestions from "./Routes/Master/masterQuestions";
import SignupPage from "./Routes/SignupPage/signuppage";
import StudentPage from "./Routes/Student/student";
import StudentAbout from "./Routes/Student/studentAbout";
import StudentDashboard from "./Routes/Student/studentDashboard";
import ProtectedRouteMaster from './Routes/ProtectedRoute/ProtectedRouteMaster';
import Page_401 from "./Layouts/Components/401";
import Page_404 from "./Layouts/Components/404";
import ProtectedRouteStudent from "./Routes/ProtectedRoute/ProtectedRouteStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Loginpage></Loginpage>} />
        <Route path='/signup' element={<SignupPage></SignupPage>} />

        <Route path='/masterpage'     element={<ProtectedRouteMaster><MasterPage/></ProtectedRouteMaster>} />
        <Route path='/masterabout' element={<ProtectedRouteMaster><MasterAbout /></ProtectedRouteMaster>} />
        <Route path='/masterQustionAnswer' element={<ProtectedRouteMaster><MasterAnswered></MasterAnswered></ProtectedRouteMaster>} />
        <Route path='/masterQuestionPosted' element={<ProtectedRouteMaster><MasteredQuestions /></ProtectedRouteMaster>} />

        <Route path='/studentpage' element={<ProtectedRouteStudent><StudentPage /></ProtectedRouteStudent>} />
        <Route path='/studentabout' element={<ProtectedRouteStudent><StudentAbout /></ProtectedRouteStudent>} />
        <Route path='/studentdashboard' element={<ProtectedRouteStudent><StudentDashboard /></ProtectedRouteStudent>} />

        <Route path='/401_page' element={<Page_401/>}></Route>
        <Route path='/404_page' element={<Page_404/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
