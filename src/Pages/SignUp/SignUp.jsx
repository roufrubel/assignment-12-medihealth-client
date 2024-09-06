import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // console.log('user added to db')
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User have been created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              // navigate("/");
              navigate(from, { replace: true });
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>mediHealth | Sign Up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-info">Sign Up!</h1>
            <p className="py-2">
              Please enter your details
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              {errors.name && (
                <span className="text-red-400">This name is required</span>
              )}

              <div className="form-control">
                <label className="label">
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="phot URL"
                  className="input input-bordered"
                />
              </div>
              {errors.photoURL && (
                <span className="text-red-400">This photoURL is required</span>
              )}

              <div className="form-control">
                <label className="label">
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-400">This email is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {/*  password validation message set up */}
                {errors.password?.type === "required" && (
                  <span className="text-red-400">
                    This password is required
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-400">
                    This password is must be minimum 6 characters
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-400">
                    This password is must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-400">
                    This password must have one uppercase, one lowercase, one
                    number and one special character.
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-2">
                <input
                  className="btn btn-warning btn-sm"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <div className="px-4">
              <p className='pl-6'>
                Already have an account?
                <span className="font-bold text-info ml-2">
                  <Link to="/login">Login here</Link>
                </span>
              </p>
            </div>
            <div className='px-2 pb-6'>
              <div className="divider"></div>
              <SocialLogin></SocialLogin>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
