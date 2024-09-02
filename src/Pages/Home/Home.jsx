import { Helmet } from "react-helmet-async";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>mediHealth | Home</title>
      </Helmet>
      <Slider></Slider>
    </div>
  );
};

export default Home;
