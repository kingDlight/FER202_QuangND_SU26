// hiển thị danh sách banners
//  import MyCarousel vào App.js
import React from 'react';
import { bannerData } from '../data/bannerData';    
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {
    return (
        <div>
            <Carousel>
                {bannerData.map(banner => (
                    <Carousel.Item key={banner.id}>
                        <img className="d-block w-100" src={banner.imageSrc} alt={banner.title} style={{ height: '400px', objectFit: 'cover' }} />
                        <Carousel.Caption className="rounded p-3 mb-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                            <h3 className="fw-bold text-white mb-2">{banner.title}</h3>
                            <p className="fw-bold fs-5 text-white mb-0">{banner.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default MyCarousel;  