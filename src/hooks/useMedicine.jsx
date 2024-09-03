import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMedicine = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: medicine = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["medicine"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicine");
      return res.data;
    },
  });

  return [medicine, loading, refetch];
};

export default useMedicine;
