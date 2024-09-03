import './CategoryCardSection.css';
import img from '../../assets/pain-relief.jpg'
import img1 from '../../assets/antibiotics.jpg'
import img2 from '../../assets/allergy-relief.jpg'
import img3 from '../../assets/digestive-health.jpg'
import img4 from '../../assets/cold-flu.jpg'
import img5 from '../../assets/vitamins-supplements.jpg'
import useMedicine from '../../hooks/useMedicine';
import { Link } from 'react-router-dom';

const CategoryCardSection = () => {
    const [medicine, loading] = useMedicine();
    if(loading){
        <progress className="progress w-56"></progress>
    }
    const painRelief = medicine.filter(md => md.category === "Pain Relief")
    const antibiotics = medicine.filter(md => md.category === "Antibiotics")
    const allergyRelief = medicine.filter(md => md.category === "Allergy Relief")
    const digestiveHealth = medicine.filter(md => md.category === "Digestive Health")
    const coldFlu = medicine.filter(md => md.category === "Cold & Flu")
    const vitaminsSupplements = medicine.filter(md => md.category === "Vitamins & Supplements")
    if(loading){
        <progress className="progress w-56"></progress>
    }
    return (
        <section id="features" className="features-section mt-16 ">
            <h2 className='uppercase md:text-base lg:text-base mb-2 font-medium text-center'>- Medicine & Wellbeing -</h2>
            <h2 className='uppercase md:text-lg lg:text-2xl mb-8 font-bold text-info text-center'>All categories</h2>

  <div className="features-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">

    <Link to='/painRelief'>
    <div className="feature-card">
        <img src={img} alt="" />
      <h3 className='font-bold text-info text-lg py-2'>Category: Pain Relief</h3>
      <p>Number of medicines: {painRelief.length}</p>
    </div>
    </Link>

    <Link to='/antibiotics'>
    <div className="feature-card">
    <img src={img1} alt="" />
      <h3 className='font-bold text-info text-lg py-2'>Category: Antibiotics</h3>
      <p>Number of medicines: {antibiotics.length}</p>
    </div>
    </Link>

    <Link to='/allergyRelief'>
    <div className="feature-card">
    <img src={img2} alt="" />
      <h3 className='font-bold text-info text-lg py-2'>Category: Allergy Relief</h3>
      <p>Number of medicines: {allergyRelief.length}</p>
    </div>
    </Link>

    <Link to='/digestiveHealth'>
    <div className="feature-card">
    <img src={img3} alt="" />
      <h3 className='font-bold text-info text-lg py-2'>Category: Digestive Health</h3>
      <p>Number of medicines: {digestiveHealth.length}</p>
    </div>
    </Link>

    <Link to='/coldFlu'>
    <div className="feature-card">
    <img src={img4} alt="" />
      <h3 className='font-bold text-info text-lg py-2'>Category: Cold & Flu</h3>
      <p>Number of medicines: {coldFlu.length}</p>
    </div>
    </Link>

    <Link to='/vitaminsSupplements'>
    <div className="feature-card">
    <img src={img5} alt="" />
      <h3 className='font-bold text-info text-lg py-2'>Category: Vitamins & Supplements</h3>
      <p>Number of medicines: {vitaminsSupplements.length}</p>
    </div>
    </Link>

  </div>
</section>
    );
};

export default CategoryCardSection;

  

