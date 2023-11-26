import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Banner = () => {
    return (
        <Carousel className='text-center' autoPlay={true} infiniteLoop={true} interval={3000}>
            <div>
                <img src="https://i.ibb.co/PYFzCy6/43137.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/Wsj7DLg/2150836112.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/HpZ9GfH/41556.jpg" />
            </div>
            <div>
                <img src="https://i.ibb.co/RpGc9RW/2150909590.jpg" />
            </div>
        </Carousel>
    );
};

export default Banner;