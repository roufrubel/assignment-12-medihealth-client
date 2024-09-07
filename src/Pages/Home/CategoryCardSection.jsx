import { Link } from "react-router-dom";
import useMedicine from "../../hooks/useMedicine";
// import img from "../../assets/pain-relief.jpg";
import "./CategoryCardSection.css";

const CategoryCardSection = () => {
  const [medicine, loading] = useMedicine();

  if (loading) {
    <progress className="progress w-56"></progress>;
  }

  // Get unique categories
  const categories = [...new Set(medicine.map((med) => med.category))];

  // Group medicines by category
  const categoriesGroup = medicine.reduce((acc, med) => {
    if (!acc[med.category]) {
      acc[med.category] = [];
    }
    acc[med.category].push(med);
    return acc;
  }, {});


   

  return (
    <div id="features" className="features-section mt-16 ">
      <h2 className="uppercase md:text-base lg:text-base mb-2 font-medium text-center">
        - Medicine & Wellbeing -
      </h2>
      <h2 className="uppercase md:text-lg lg:text-2xl mb-8 font-bold text-info text-center">
        All Categories
      </h2>
      <div className="features-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {categories?.map((category, index) => (
            <Link key={index} className="category-card" to={`/category/${category}`}>
              <div className="feature-card">
                <img className="h-[250px]" src={categoriesGroup[category][0].image} alt="" />
                <h3 className="font-bold text-info text-lg py-2">
                  Category: {category}
                </h3>
                <p>Number of medicines: {categoriesGroup[category].length}</p>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCardSection;
