import { Helmet } from "react-helmet-async";
import Slider from "./Slider";
import CategoryCardSection from "./CategoryCardSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>mediHealth | Home</title>
      </Helmet>
      <Slider></Slider>
      <CategoryCardSection></CategoryCardSection>
    </div>
  );
};

export default Home;
