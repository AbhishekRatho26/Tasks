import { Box } from "@mui/material"
import Navigation from "./Components/Navigation"
import {Routes,Route} from "react-router-dom"
import HeroSection from "./Components/HeroSection"
import Job from "./Pages/Seeker/Job"
import Applications from "./Pages/Seeker/Applications"
import Login from "./Pages/Authentication/Login"
import Dashboard from "./Pages/Employee/Dashboard"
import AddJobPost from "./Pages/Employee/AddJobPost"
import AddCompany from "./Pages/Employee/AddCompany"
import JobList from "./Pages/Employee/JobList"
import ProtectedRoute from "./ProtectedRoute"
import JobDetails from "./Pages/Employee/JobDetails"
import ApplicantsList from "./Pages/Employee/Applicants"
import ApplicantByJob from "./Pages/Employee/JobApplicants"
import ResumeChat from "./Pages/Seeker/ResumeChat"
import JobDetailsPage from "./Pages/Seeker/JobDetailsPage"
import Profile from "./Pages/Seeker/Profile"
import Register from "./Pages/Authentication/Register"

const App = () => {
  return (
    <Box>
      <Navigation/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/" element={<HeroSection/>}></Route>
          <Route path="/seeker/jobs" element={<Job/>}></Route>
          <Route path="/seeker/applications" element={<Applications/>}></Route>
          <Route path="/seeker/resume" element={<ResumeChat/>}></Route>
          <Route path="/seeker/profile" element={<Profile/>}></Route>
          <Route path="/seeker/job/:id" element={<JobDetailsPage/>}></Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
          <Route path="/employee/dashboard" element={<Dashboard/>}></Route>
          <Route path="/employee/job/post" element={<AddJobPost/>}></Route>
          <Route path="/employee/company/post" element={<AddCompany/>}></Route>
          <Route path="/employee/jobs" element={<JobList/>}></Route>
          <Route path="/employee/job/details/:id" element={<JobDetails/>}></Route>
          {/* <Route path="/employee/job/appplicants" element={<ApplicantsList jobId={undefined}/>}></Route> */}
          <Route path="/employee/job/applicant/:id" element={<ApplicantByJob/>}></Route>
        </Route>
      </Routes>
    </Box>
  )
}

export default App

