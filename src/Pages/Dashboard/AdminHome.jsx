import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePayment from "../../hooks/usePayment";


const AdminHome = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [payments, , refetch] = usePayment();

      // Calculate the total paid amount
  const paidTotal = parseInt(payments
    ?.filter(payment => payment.status === 'paid')
    ?.reduce((sum, payment) => sum + payment.price, 0)?.toFixed(2));

    // Calculate the total paid amount
    const pendingTotal = parseInt(payments
      .filter(payment => payment.status === 'pending')
      .reduce((sum, payment) => sum + payment.price, 0)?.toFixed(2));
    
  
  const { data: stats={} } = useQuery({
  // const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  const totalRevenue = stats.revenue?.toFixed(2);

  if (loading) {
    <p>Loading...</p>;
  }

//   const {data: chartData=[]} = useQuery({
//     queryKey: ['order-stats'],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/order-stats");
//       return res.data;
//     }
//   });

    return (
        <div className="pt-10">
            <h1 className="text-2xl text-info font-bold mb-6">Admin Home</h1>
            <h2 className="text-lg">Hi, welcome {user? user?.displayName : 'to MEDIHEALTH !'}</h2>

            <div className="stats stats-vertical lg:stats-horizontal shadow mt-8 border border-info p-2">
  <div className="stat">
    <div className="stat-title  text-info font-bold">Sales Revenue</div>
    <div className="stat-value text-slate-500">${totalRevenue}</div>
  </div>

  <div className="stat">
    <div className="stat-title  text-info font-bold">Paid Total</div>
    <div className="stat-value text-slate-500">${paidTotal}</div>
  </div>

  <div className="stat">
    <div className="stat-title  text-info font-bold">Pending Total</div>
    <div className="stat-value text-slate-500">${pendingTotal}</div>
  </div>
</div>
        </div>
    );
};

export default AdminHome;