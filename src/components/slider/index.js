import React, {useEffect, useState} from 'react';
import "swiper/css/swiper.css";
import Swiper from 'swiper';
import {SliderContainer} from './style';

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const {bannerList} = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper(".swiper-container", {
                loop: true,
                autoplay: true,
                autoplayDisableOnInteraction: false,
                pagination: {el: '.swiper-pagination'},
            });
            setSliderSwiper(sliderSwiper);
        }
    }, [bannerList.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-wrapper">
                <div className='swiper-container'>
                    <div className="swiper-wrapper">
                        {
                            bannerList.map(slider => {
                                return (
                                    <div className="swiper-slide" key={slider.imageUrl}>
                                        <div className="slider-nav">
                                            <img src={slider.imageUrl} width='100%' height='100%' alt="推荐" />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="swiper-pagination"></div>
        </SliderContainer>
    )
}

export default React.memo(Slider)
