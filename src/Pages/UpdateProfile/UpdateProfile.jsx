
import { ToastContainer, toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const UpdateProfile = () => {
    const {user} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleUpdateProfile = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photo, email, password);
        if (user) {
            updateProfile(user, {
              displayName: name, 
              photoURL: photo, 
              email: email, 
              password: password,
            }).then(() => {
                toast('You have registered successfully!');
                // navigate after update profile
                    navigate(location?.state ? location.state : '/');
            }).catch((error) => {
                toast('Ops!', error);
            });
          }
            }

    return (
        <div className="px-10">
          <Helmet>
                <title>Update Profile |  mediHealth</title>
            </Helmet>
          <div className="w-full md:w-3/5 lg:w-3/5 mx-auto pt-32 mb-14">
            <div className="bg-info p-10 rounded-md">
             <h4 className="text-center mb-6 text-xl text-white font-bold">Please Update Your Profile</h4>
        <form onSubmit={handleUpdateProfile}>
          <input className="w-full p-2 rounded-md" type="text" name="name" defaultValue={user.displayName} placeholder="your name" id="" /><br /><br/>
          <input className="w-full p-2 rounded-md" type="text" name="photo" defaultValue={user.photoURL} placeholder="your photo" id="" /><br /><br/>
          <input className="w-full p-2 rounded-md"  type="email" name="email" defaultValue={user.email} placeholder="your email" id="" /><br /><br/>
          <input className="w-full p-2 rounded-md" type="password" defaultValue={user.password} name="password" placeholder="your password" id="" /> <br /><br/>
          <div className="flex justify-center">
          <input  className="p-1 bg-white px-6 rounded-md font-bold cursor-pointer " type="submit" value="Update profile" />
          </div>
          <ToastContainer />
        </form>
      </div>
            
        </div>
        </div>
    );
};

export default UpdateProfile;