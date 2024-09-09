import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
   // tan stack query
   const axiosSecure = useAxiosSecure();
   const {user} = useAuth();
   const {refetch, data: cart =[], isPending: loading } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/carts?buyerEmail=${user.email}`);
        return res.data;
    }
   })
   return [cart, loading, refetch]
};

export default useCart;