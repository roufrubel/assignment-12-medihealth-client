import './CategoryCardSection.css';
import img from '../../assets/pain-relief.jpg'
import img1 from '../../assets/antibiotics.jpg'
import img2 from '../../assets/allergy-relief.jpg'
import img3 from '../../assets/digestive-health.jpg'
import img4 from '../../assets/cold-flu.jpg'
import img5 from '../../assets/vitamins-supplements.jpg'
import useMedicine from '../../hooks/useMedicine';

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
            <h2 className='uppercase md:text-base lg:text-base mb-2 font-medium text-blue-600 text-center'>- Medicine & Wellbeing -</h2>
            <h2 className='uppercase md:text-lg lg:text-2xl mb-8 font-bold text-blue-600 text-center'>All categories</h2>

  <div className="features-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <div className="feature-card">
        <img src={img} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Pain Relief</h3>
      <p>Number of medicines: {painRelief.length}</p>
    </div>
    <div className="feature-card">
    <img src={img1} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Antibiotics</h3>
      <p>Number of medicines: {antibiotics.length}</p>
    </div>
    <div className="feature-card">
    <img src={img2} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Allergy Relief</h3>
      <p>Number of medicines: {allergyRelief.length}</p>
    </div>
    <div className="feature-card">
    <img src={img3} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Digestive Health</h3>
      <p>Number of medicines: {digestiveHealth.length}</p>
    </div>
    <div className="feature-card">
    <img src={img4} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Cold & Flu</h3>
      <p>Number of medicines: {coldFlu.length}</p>
    </div>
    <div className="feature-card">
    <img src={img5} alt="" />
      <h3 className='font-bold text-blue-600 text-lg py-2'>Category: Vitamins & Supplements</h3>
      <p>Number of medicines: {vitaminsSupplements.length}</p>
    </div>
  </div>
</section>
    );
};

export default CategoryCardSection;




// {
//     "name": "Ibuprofen 400mg",
//     "category": "Pain Relief",
//     "price": 8.99,
//     "quantity": "20 tablets",
//     "dosage": "400mg",
//     "short_description": "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation."
//   },
//   {
//     "name": "Acetaminophen 500mg",
//     "category": "Pain Relief",
//     "price": 7.49,
//     "quantity": "24 tablets",
//     "dosage": "500mg",
//     "short_description": "Effective pain reliever and fever reducer commonly used for headaches, muscle aches, and arthritis."
//   },
//   {
//     "name": "Naproxen 250mg",
//     "category": "Pain Relief",
//     "price": 9.99,
//     "quantity": "30 tablets",
//     "dosage": "250mg",
//     "short_description": "NSAID used to relieve pain from various conditions such as headaches, muscle aches, and dental pain."
//   },
//   {
//     "name": "Diclofenac Sodium 50mg",
//     "category": "Pain Relief",
//     "price": 10.50,
//     "quantity": "15 tablets",
//     "dosage": "50mg",
//     "short_description": "NSAID used to treat pain and inflammatory disorders like arthritis and migraines."
//   },
//   {
//     "name": "Morphine Sulfate 10mg/ml",
//     "category": "Pain Relief",
//     "price": 15.00,
//     "quantity": "10 injections",
//     "dosage": "10ml",
//     "short_description": "Opioid analgesic used for severe pain management, typically administered via injection."
//   },
// {
//     "name": "Amoxicillin 500mg",
//     "category": "Antibiotics",
//     "price": 12.99,
//     "quantity": "30 capsules",
//     "dosage": "500mg",
//     "short_description": "Broad-spectrum antibiotic used to treat various bacterial infections such as ear, nose, throat, and skin infections."
//   },
//   {
//     "name": "Ciprofloxacin 500mg",
//     "category": "Antibiotics",
//     "price": 15.00,
//     "quantity": "20 tablets",
//     "dosage": "500mg",
//     "short_description": "Fluoroquinolone antibiotic effective against bacterial infections of the urinary tract, respiratory system, and skin."
//   },
//   {
//     "name": "Azithromycin 500mg",
//     "category": "Antibiotics",
//     "price": 18.00,
//     "quantity": "3 tablets",
//     "dosage": "500mg",
//     "short_description": "Macrolide antibiotic used to treat respiratory infections, skin infections, ear infections, and sexually transmitted diseases."
//   },
//   {
//     "name": "Doxycycline 100mg",
//     "category": "Antibiotics",
//     "price": 11.75,
//     "quantity": "10 capsules",
//     "dosage": "100mg",
//     "short_description": "Tetracycline antibiotic used to treat bacterial infections such as acne, urinary tract infections, intestinal infections, and eye infections."
//   },
//   {
//     "name": "Ceftriaxone 1g",
//     "category": "Antibiotics",
//     "price": 25.00,
//     "quantity": "5 injections",
//     "dosage": "1g",
//     "short_description": "Cephalosporin antibiotic used to treat severe bacterial infections, commonly administered via injection."
//   },
//   {
//     "name": "Metronidazole 500mg",
//     "category": "Antibiotics",
//     "price": 13.50,
//     "quantity": "20 tablets",
//     "dosage": "500mg",
//     "short_description": "Antibiotic and antiprotozoal medication used to treat bacterial and parasitic infections, including those of the stomach and respiratory tract."
//   },
//   {
//     "name": "Clindamycin 300mg",
//     "category": "Antibiotics",
//     "price": 16.25,
//     "quantity": "30 capsules",
//     "dosage": "300mg",
//     "short_description": "Lincosamide antibiotic used to treat serious bacterial infections, especially those of the skin, lungs, and internal organs."
//   },
//   {
//     "name": "Cetirizine 10mg",
//     "category": "Allergy Relief",
//     "price": 9.99,
//     "quantity": "30 tablets",
//     "dosage": "10mg",
//     "short_description": "Antihistamine used to relieve allergy symptoms such as runny nose, sneezing, and itchy eyes."
//   },
//   {
//     "name": "Loratadine 10mg",
//     "category": "Allergy Relief",
//     "price": 8.49,
//     "quantity": "20 tablets",
//     "dosage": "10mg",
//     "short_description": "Non-drowsy antihistamine used for the relief of seasonal allergy symptoms like hay fever."
//   },
//   {
//     "name": "Fexofenadine 180mg",
//     "category": "Allergy Relief",
//     "price": 12.00,
//     "quantity": "15 tablets",
//     "dosage": "180mg",
//     "short_description": "Effective antihistamine for treating allergic symptoms such as hives and chronic skin reactions."
//   },
//   {
//     "name": "Diphenhydramine 25mg",
//     "category": "Allergy Relief",
//     "price": 6.50,
//     "quantity": "24 capsules",
//     "dosage": "25mg",
//     "short_description": "First-generation antihistamine used for the relief of allergies, hay fever, and the common cold."
//   },
//   {
//     "name": "Fluticasone Nasal Spray",
//     "category": "Allergy Relief",
//     "price": 14.75,
//     "quantity": "120 sprays",
//     "dosage": "50mcg per spray",
//     "short_description": "Nasal spray corticosteroid used to relieve seasonal and year-round allergic and non-allergic nasal symptoms."
//   },
// {
//     "name": "Probiotics 10 Billion CFU",
//     "category": "Digestive Health",
//     "price": 19.99,
//     "quantity": "60 capsules",
//     "dosage": "10 billion CFU per capsule",
//     "description": "Probiotics 10 Billion CFU supports digestive health and balances gut flora with a high-potency probiotic blend."
// },
// {
//     "name": "Metamucil Fiber Supplement",
//     "category": "Digestive Health",
//     "price": 14.50,
//     "quantity": "180 capsules",
//     "dosage": "500 mg per capsule",
//     "description": "Metamucil Fiber Supplement helps promote digestive health by providing dietary fiber to support regular bowel movements."
// },
// {
//     "name": "Lactaid Fast Act",
//     "category": "Digestive Health",
//     "price": 11.99,
//     "quantity": "60 caplets",
//     "dosage": "9000 FCC units per caplet",
//     "description": "Lactaid Fast Act provides relief from lactose intolerance symptoms, such as gas, bloating, and diarrhea, by aiding in lactose digestion."
// },
// {
//     "name": "Align Probiotic",
//     "category": "Digestive Health",
//     "price": 29.99,
//     "quantity": "28 capsules",
//     "dosage": "1 billion CFU per capsule",
//     "description": "Align Probiotic capsules promote digestive health and help maintain a healthy gut microbiome with a daily probiotic strain."
// },
// {
//     "name": "Colace Stool Softener",
//     "category": "Digestive Health",
//     "price": 7.99,
//     "quantity": "100 tablets",
//     "dosage": "50 mg per tablet",
//     "description": "Colace Stool Softener helps relieve occasional constipation by softening stools, making them easier to pass."
// },
// {
//     "name": "Pepcid Complete",
//     "category": "Digestive Health",
//     "price": 15.75,
//     "quantity": "25 chewable tablets",
//     "dosage": "800 mg calcium carbonate, 165 mg magnesium hydroxide, 10 mg famotidine per tablet",
//     "description": "Pepcid Complete provides fast relief from heartburn, acid indigestion, and sour stomach with a dual-action formula."
// },
//   {
//     "name": "Paracetamol 500mg",
//     "category": "Cold & Flu",
//     "price": 5.99,
//     "quantity": "20 tablets",
//     "dosage": "500mg",
//     "short_description": "Common pain reliever and fever reducer used to alleviate symptoms of cold and flu."
//   },
//   {
//     "name": "Phenylephrine 10mg",
//     "category": "Cold & Flu",
//     "price": 6.49,
//     "quantity": "18 tablets",
//     "dosage": "10mg",
//     "short_description": "Decongestant used to relieve nasal congestion caused by colds, allergies, and hay fever."
//   },
//   {
//     "name": "Oseltamivir 75mg",
//     "category": "Cold & Flu",
//     "price": 35.00,
//     "quantity": "10 capsules",
//     "dosage": "75mg",
//     "short_description": "Antiviral medication used to treat and prevent influenza (flu) in adults and children."
//   },
//   {
//     "name": "Guaifenesin 200mg",
//     "category": "Cold & Flu",
//     "price": 7.25,
//     "quantity": "20 tablets",
//     "dosage": "200mg",
//     "short_description": "Expectorant that helps loosen mucus in the chest, making it easier to cough up and clear the airways."
//   },
//   {
//     "name": "Dextromethorphan 15mg",
//     "category": "Cold & Flu",
//     "price": 4.99,
//     "quantity": "30 capsules",
//     "dosage": "15mg",
//     "short_description": "Cough suppressant used to relieve dry, irritating coughs associated with colds and flu."
//   },
//   {
//     "name": "Vitamin C 1000mg",
//     "category": "Vitamins & Supplements",
//     "price": 9.99,
//     "quantity": "60 tablets",
//     "dosage": "1000mg",
//     "short_description": "Powerful antioxidant that supports the immune system and promotes skin health."
//   },
//   {
//     "name": "Vitamin D3 2000 IU",
//     "category": "Vitamins & Supplements",
//     "price": 7.50,
//     "quantity": "90 softgels",
//     "dosage": "2000 IU",
//     "short_description": "Essential for bone health, aiding in calcium absorption and supporting immune function."
//   },
//   {
//     "name": "Omega-3 Fish Oil 1000mg",
//     "category": "Vitamins & Supplements",
//     "price": 12.99,
//     "quantity": "120 softgels",
//     "dosage": "1000mg",
//     "short_description": "Supports heart health and brain function, rich in EPA and DHA fatty acids."
//   },
//   {
//     "name": "Multivitamin for Adults",
//     "category": "Vitamins & Supplements",
//     "price": 15.00,
//     "quantity": "100 tablets",
//     "dosage": "Varied (includes essential vitamins and minerals)",
//     "short_description": "Daily multivitamin providing essential nutrients to support overall health and wellness."
//   },
//   {
//     "name": "Calcium 600mg with Vitamin D",
//     "category": "Vitamins & Supplements",
//     "price": 11.25,
//     "quantity": "75 tablets",
//     "dosage": "600mg Calcium / 400 IU Vitamin D",
//     "short_description": "Supports bone strength and health by combining calcium with vitamin D for better absorption."
//   }
  

