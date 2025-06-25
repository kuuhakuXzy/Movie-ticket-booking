import poster from '@/assets/poster1.png';
import poster2 from '@/assets/poster2.jpg';
import poster3 from '@/assets/poster3.jpg';
import poster4 from '@/assets/poster4.jpg';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export default function PosterCarousel () {
    return (
        <section className="py-2" aria-label="Image Carousel">
            {/* Carousel Image */}
            <div className="relative w-full">
                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,
                        pagination: true,
                        arrows: true,
                        autoplay: true,
                        interval: 2500,
                    }}
                >
                    <SplideSlide>
                        <img
                            src={poster}
                            alt="Poster"
                            className="w-full h-[450px] object-cover"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            src={poster2}
                            alt="Poster2"
                            className="w-full h-[450px] object-cover"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            src={poster3}
                            alt="Poster3"
                            className="w-full h-[450px] object-cover"
                        />
                    </SplideSlide>
                    <SplideSlide>
                        <img
                            src={poster4}
                            alt="Poster4"
                            className="w-full h-[450px] object-cover"
                        />
                    </SplideSlide>
                </Splide>
            </div>
        </section>
    );
};
