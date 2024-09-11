import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css'; // Alternate
import 'swiper/css';               // Alternate
// import 'swiper/swiper.min.css';
import './DiscountedProducts';
import useMedicine from '../../hooks/useMedicine';



const DiscountedProducts = () => {
    const [medicine] = useMedicine();
    const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    // Filter products with discounts
    const filteredMedicine = medicine.filter(medi => medi.discount > 0);
    setDiscountedProducts(filteredMedicine);
  }, [medicine]);

    return (
        <div className="discount-products-container my-40">
          <h2 className="text-center text-warning font-bold text-3xl p-2 border-2 border-info md:w-2/4 lg:w-2/4 mb-12 rounded-xl mx-auto">Discounted Products</h2>
          <Swiper
          
            spaceBetween={20}
            slidesPerView={4}
            draggable={true}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {discountedProducts.map((medi) => (
              <SwiperSlide key={medi._id}>
                <div className="product-card space-y-2">
                  <img src={medi.image} alt={medi.name} className="product-image" />
                  <h3 className="text-2xl text-info">{medi.name}</h3>
                  <p className="product-price space-y-2">
                    <span className="text-xl font-bold text-green-600">Discounted Price: ${(parseInt((medi.price * (1 - medi.discount / 100))).toFixed(2))}</span> <br></br>{' '}
                    <span className="text-lg">Original Price: ${parseInt(medi.price).toFixed(2)}</span>{' '}
                  </p>
                  <p className="text-warning font-bold text-5xl">{medi.discount}% OFF</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
};

export default DiscountedProducts;