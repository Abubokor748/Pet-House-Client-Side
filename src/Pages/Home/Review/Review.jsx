import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Review = () => {
  const axiosPublic = useAxiosPublic();

  const { 
    isLoading, 
    error, 
    data: reviews 
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews'); 
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">Error loading testimonials: {error.message}</p>
    </div>;
  }

  return (
    <section className='my-12'>
        <div>
            <h2 className='text-center font-bold underline text-3xl'>Reviews</h2>
        </div>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className='flex flex-col items-center m-24 my-16'>
                <Rating 
                  style={{ maxWidth: 180 }}
                  value={review.rating} 
                  readOnly 
                />
                <h3 className='text-2xl text-orange-500'>{review.name}</h3>
                <p className='py-8'>{review.story}</p>
                <p className='py-8 text-2xl'>From: {review.location}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;