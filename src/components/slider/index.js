import React, {useEffect, useState} from 'react';
import "swiper/css/swiper.css";
import Swiper from 'swiper';
import {SliderContainer} from './style';

// 轮播组件
function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const {bannerList} = props;

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let sliderSwiper = new Swiper(".slider-container", {
                loop: true, // 循环播放
                autoplay: true,  // 自动其切换
                disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
                pagination: {el: '.swiper-pagination'},
            });

            // 初始化slider
            setSliderSwiper(sliderSwiper);
        }
    }, [bannerList.length, sliderSwiper]);

    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className='swiper-wrapper'>
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
                {/* 分页器。如果放置在swiper-container外面，需要自定义样式 */}
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer >
    )
}

export default React.memo(Slider)
