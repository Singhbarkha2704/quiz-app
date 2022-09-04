import React, { useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const SignupRBA = () => {
  const navigate=useNavigate()  
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
 /*------------------Submit Handler--------*/
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true)

    if (Object.keys(formErrors).length === 0 && isSubmit) {
        //fetching endpoint of server
        axios.post('http://localhost:3001/signup', {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password
        })
        .then(res => {
          console.log(res);
          localStorage.setItem('role', res.data.role)
          localStorage.setItem('auth', true)                  
          navigate('/')
                  // setStatus(res.data.status)
        })
        .catch(err => console.log(err))
    }
  };

  /*----useEffect Hook-----*/
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
    
  /*----------Validation Conditions---------*/
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; //password validate
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div>      
      <section className="vh-100 mt-3 gradient-custom">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-1 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body  text-center">

                  <form className=" pb-1" onSubmit={handleSubmit}>

                    <h2 className="fw-bold text-uppercase">SignUp</h2>
                    <p className="text-white-50 mb-1">Please enter to register!</p>
                    
                      <div className="form-outline form-white mb-1">
                        <label className="form-label fa fa-user" htmlFor="typenameX" > Username</label>
                        <input    
                          type="text"
                          className='form-control form-control-lg'
                          name="username"
                          placeholder="Username"
                          value={formValues.username}
                          onChange={handleChange}
                        />
                        <p  style={{color:'red'}}>{formErrors.username}</p>                        
                      </div>

                      <div className="form-outline form-white mb-1">
                        <label className="form-label fa fa-envelope" htmlFor="typeEmailX" > Email</label>
                        <input
                          type="text"
                          className='form-control form-control-lg'
                          name="email"
                          placeholder="Email"
                          value={formValues.email}
                          onChange={handleChange}
                        />
                        <p style={{color:'red'}}>{formErrors.email}</p>    
                        
                      </div>

                      <div className="form-outline form-white mb-1">
                        <label className="form-label fa fa-key" htmlFor="typePasswordX"> Password</label>
                        <input
                          type="password"
                          className='form-control form-control-lg'
                          name="password"
                          placeholder="Password"
                          value={formValues.password}
                          onChange={handleChange}
                        />
                        <p style={{color:'red'}}>{formErrors.password}</p>
                        
                      </div>
                      <button className="btn btn-outline-light btn-lg ">Signup</button>     <hr/>        
                  </form>

                  <div>
                    <p className="mb-0">Already have an account?</p>
                    {/* <a href="#!" className="text-white-50 fw-bold">Sign Up</a> */}
                    <Link to='/' className='btn btn-warning mt-1'>Login</Link>              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignupRBA
