import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import  "../../style/AuthStyles.css"

const ForgotPassword = () => {

    
    const [email,setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [answer, setAnswer] = useState('')
    const navigate=useNavigate()


    // form function
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer,
              });
              if (res && res.data.success) {
                toast.success(res.data && res.data.message);
        
                navigate("/login");
              } else {
                toast.error(res.data.message);
              }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }
  return (
    <Layout>

   <div className="form-container">
           
                <form onSubmit={handleSubmit}>
                <h1>Reset Password</h1>
                

                    <div className="mb-3">
                        <input type="email" onChange={(e)=>setEmail(e.target.value)}  value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" onChange={(e)=>setNewPassword(e.target.value)}  value={newPassword} className="form-control" id="exampleInputPassword1"  placeholder=' Enter Your new Password' required/>
                    </div>
                    <div className="mb-3">
                        <input type="answer" onChange={(e)=>setAnswer(e.target.value)}  value={answer} className="form-control" id="exampleInputPassword1"  placeholder=' Enter Your favourite sports' required/>
                    </div>
                    
                    
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>


            </div>


    </Layout>
  )
}

export default ForgotPassword