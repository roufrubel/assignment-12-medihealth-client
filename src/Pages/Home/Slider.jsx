import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAdvertisement from '../../hooks/useAdvertisement';


const Slider = () => {
    const [advertisement, loading, ] = useAdvertisement();
    const usedAdvertisement = advertisement.filter(advert => advert.status === 'used');

    if(loading){
      return <p>Loading...</p>
    }

    return (
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            usedAdvertisement.map(advert =><SwiperSlide key={advert._id}><img src={advert.image} alt="slide image" /></SwiperSlide>)
          }
        </Swiper>
      </>
    );
};

export default Slider;
