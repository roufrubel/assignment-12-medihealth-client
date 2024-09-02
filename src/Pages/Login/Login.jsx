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
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
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
              <div className="form-control mt-6">
                <button disabled={disabled} className="btn btn-neutral"><input className="uppercase font-semibold" type="submit"  value="Login" /></button>
              </div>
            </form>
            <div className='px-4'>
              <p className='pl-6'>New here? <span className="font-bold text-primary"><Link to="/signup">Create Account</Link></span></p>
              <div className='p-6'>
              <div className="divider"></div>
              <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    );
};

export default Login;








// import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../providers/AuthProvider';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';
// import SocialLogin from '../../components/SocialLogin/SocialLogin';

// const Login = () => {
//   const {signIn} = useContext(AuthContext);
//   const [disabled, setDisabled] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   useEffect( () => {
//     loadCaptchaEnginge(6); 
//   }, [])

//     const handleValidateCaptcha = (e) => {
//       const user_captcha_value = e.target.value;
//       if(validateCaptcha(user_captcha_value)){
//         setDisabled(false)
//       }else{
//         setDisabled(true)
//       }
//     }

//     const handleSubmit = event => {
//         event.preventDefault();
//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;
//         console.log(email, password)
//         signIn(email, password)
//         .then(result => {
//           const user = result.user;
//           console.log(user)
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Your have been logged in successfully",
//             showConfirmButton: false,
//             timer: 1500
//           });

//           navigate(from, { replace: true });
//         })
//       }
//     return (
//         <>
//         <Helmet>
//         <title>mediHealth | Sign In</title>
//       </Helmet>
//         <div className="hero bg-base-200 min-h-screen">
//         <div className="hero-content flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold">Login now!</h1>
//             <p className="py-6">
//               Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
//               quasi. In deleniti eaque aut repudiandae et a id nisi.
//             </p>
//           </div>
//           <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <form onSubmit={handleSubmit} className="card-body">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input type="email" name="email" placeholder="email" className="input input-bordered" required />
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Password</span>
//                 </label>
//                 <input type="password" name="password" placeholder="password" className="input input-bordered" required />
//                 <label className="label">
//                   <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                 </label>
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                 <LoadCanvasTemplate />
//                 </label>
//                 <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type here the captcha above" className="input input-bordered" required />               
//               </div>
//               <div className="form-control mt-6">
//                 <button disabled={disabled} className="btn btn-neutral"><input className="uppercase font-semibold" type="submit"  value="Login" /></button>
//               </div>
//             </form>
//             <div className='px-4'>
//               <p className='pl-6'>New here? <span className="font-bold text-primary"><Link to="/signup">Create Account</Link></span></p>
//               <div className='p-6'>
//               <div className="divider"></div>
//               <SocialLogin></SocialLogin>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//         </>
//     );
// };

// export default Login;


