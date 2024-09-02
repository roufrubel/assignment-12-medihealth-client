import './CategoryCardSection.css';
import img from '../../assets/pain-relief.jpg'
import img1 from '../../assets/antibiotics.jpg'
import img2 from '../../assets/allergy-relief.jpg'
import img3 from '../../assets/digestive-health.jpg'
import img4 from '../../assets/cold-flu.jpg'
import img5 from '../../assets/vitamins-supplements.jpg'

const CategoryCardSection = () => {
    return (
        <section id="features" className="features-section mt-16 ">
            <h2 className='uppercase md:text-base lg:text-base mb-2 font-medium text-blue-600 text-center'>- Medicine & Wellbeing -</h2>
            <h2 className='uppercase md:text-lg lg:text-2xl mb-8 font-bold text-blue-600 text-center'>All categories</h2>

  <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <div className="feature-card">
        <img src={img} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Pain Relief</h3>
      <p>Number of medicines: 10</p>
      <p>Effective solutions for managing pain and discomfort.</p>
    </div>
    <div className="feature-card">
    <img src={img1} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Antibiotics</h3>
      <p>Number of medicines: 10</p>
      <p>Broad-spectrum antibiotics to treat various infections.</p>
    </div>
    <div className="feature-card">
    <img src={img2} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Allergy Relief</h3>
      <p>Number of medicines: 10</p>
      <p>Quick relief from seasonal allergies and allergic reactions.</p>
    </div>
    <div className="feature-card">
    <img src={img3} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Digestive Health</h3>
      <p>Number of medicines: 10</p>
      <p>Support for digestive comfort and overall gut health.</p>
    </div>
    <div className="feature-card">
    <img src={img4} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Cold & Flu</h3>
      <p>Number of medicines: 10</p>
      <p>Essential medications to combat cold and flu symptoms.</p>
    </div>
    <div className="feature-card">
    <img src={img5} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Vitamins & Supplements</h3>
      <p>Number of medicines: 10</p>
      <p>Daily vitamins and supplements for overall well-being.</p>
    </div>
  </div>
</section>
    );
};

export default CategoryCardSection;