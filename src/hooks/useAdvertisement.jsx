import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdvertisement = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: advertisement = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["advertisement"],
    queryFn: async () => {
      const res = await axiosPublic.get("/advertisement");
      return res.data;
    },
  });

  return [advertisement, loading, refetch];
};

export default useAdvertisement;
