import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
  const {signIn} = useAuth();
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect( () => {
    loadCaptchaEnginge(6); 
  }, [])

    const handleValidateCaptcha = (e) => {
      const user_captcha_value = e.target.value;
      if(validateCaptcha(user_captcha_value)){
        setDisabled(false)
      }else{
        setDisabled(true)
      }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signIn(email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your have been logged in successfully",
            showConfirmButton: false,
            timer: 1500
          });

          navigate(from, { replace: true });
        })
      }
    return (
        <>
        <Helmet>
        <title>mediHealth | Sign In</title>
      </Helmet>
        <div className="hero bg-info min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login!</h1>
            <p className="py-6">
              Please enter your details
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow">

          <div className='px-4  pt-6'>
              <div className='px-2'>
              <SocialLogin></SocialLogin>
              <div className="divider">Or</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="card-body">
            <h2 className="font-bold text-info text-center text-lg">Login</h2>
              <div className="form-control">
                <label className="label">
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type here the captcha above" className="input input-bordered" required />               
              </div>
              <div className="form-control mt-2">
                {/* <button disabled={disabled} className="btn btn-warning btn-sm"><input className="uppercase font-semibold" type="submit"  value="Login" /></button> */}
                <button className="btn btn-warning btn-sm"><input className="uppercase font-semibold" type="submit"  value="Login" /></button>
              </div>
            </form>
            <p className='pl-6 pb-4'>New here? <span className="font-bold text-info ml-2"><Link to="/signup">Create Account</Link></span></p>
            {/* <div className='px-4'>
              <p className='pl-6'>New here? <span className="font-bold text-info ml-2"><Link to="/signup">Create Account</Link></span></p>
              <div className='px-2 pb-4'>
              <div className="divider"></div>
              <SocialLogin></SocialLogin>
              </div>
            </div> */}
          </div>
        </div>
      </div>
        </>
    );
};

export default Login;




