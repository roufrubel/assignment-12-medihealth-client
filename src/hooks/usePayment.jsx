import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePayment = () => {
   // tan stack query
   const axiosSecure = useAxiosSecure();
   const {
    data: payments = [],
    isPending: loading,
    refetch, 
} = useQuery({
    queryKey: ['payments', ],
    queryFn: async () => {
        const res = await axiosSecure.get('/payments');
        return res.data;
    }
   })
   return [payments, loading, refetch]
};

export default usePayment;