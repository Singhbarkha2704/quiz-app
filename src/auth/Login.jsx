import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate,Link} from 'react-router-dom';

//using JWT Token
const Login = () => {
    const navigate = useNavigate();
    const [uemail, setUemail] = useState('');
    const [upassword, setUpassword] = useState('');
  const [status, setStatus] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault()
        console.log('uemail:', uemail);
        console.log('upassword', upassword);
        axios.post('http://localhost:3001/login', {
            email: uemail,
            password: upassword
        })
          .then(res => {
            console.log(res);
            localStorage.setItem('role', res.data.role)
            localStorage.setItem('username', res.data.username)
            localStorage.setItem('email',res.data.email)
            setStatus(res.data.status)
            
            // if (res.data.role === 'admin') {
            //   navigate('/settings')
            // }
            // else if(res.data.role==='user') {
            //   navigate('/user-dashboard')
            // }
            // localStorage.setItem('accesstoken',res.data.accesstoken)
              navigate('/settings');
                
            })    
        .catch(err=>console.log(err))
    };

  return (
    <div>
      {status ?
         navigate('settings') 
        :
        //login form
        <section className="vh-100 gradient-custom">
  <div className="container py-1 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-1 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-1 mt-md-1 pb-1">

              <h2 className="fw-bold mb-1 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-1">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={(e)=>{setUemail(e.target.value)}}/>
                <label className="form-label" htmlFor="typeEmailX" >Email</label>
              </div>

              <div className="form-outline form-white mb-1">
                <input type="password" id="typePasswordX" className="form-control form-control-lg"  onChange={(e)=>{setUpassword(e.target.value)}}/>
                <label className="form-label" htmlFor="typePasswordX" >Password</label>
              </div>

              <p className="small mb-1 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

              <button className="btn btn-outline-light btn-lg " onClick={(e)=>loginHandler(e)}>Login</button>     <hr/>        

            </div>

            <div>
              <p className="mb-0">Don't have an account?
              {/* <a href="#!" className="text-white-50 fw-bold">Sign Up</a> */}
              <Link to='/signup' className='btn btn-warning mt-1'>Create an Account</Link>

              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        }
        
    </div>
  )
}

export default Login
