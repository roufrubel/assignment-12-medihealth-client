
import useAuth from '../../hooks/useAuth';

const UserHome = () => {
   
    const {user} = useAuth();
    return (
        <div className="pt-10">
            <h1 className="text-2xl text-info font-bold mb-10">User Home</h1>
            <h2 className="text-xl text-info">Hi, Welcome {user? user?.displayName : 'to MEDIHEALTH !'}</h2>
        </div>
    );
};

export default UserHome;