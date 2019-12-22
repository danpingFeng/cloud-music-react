import React, {useEffect, useState} from 'react';
import "swiper/css/swiper.css";
import Swiper from 'swiper';
import styles from './index.less';

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
        <div className={styles.sliderWrapper}>
            <div className={styles.before}></div>
            <div className={styles.swiperWrapper}>
                <div className='swiper-container'>
                    <div className="swiper-wrapper">
                        {
                            bannerList.map(slider => {
                                return (
                                    <div className="swiper-slide" key={slider.imgUrl}>
                                        <div className={styles.sliderNav}>
                                            <img src={slider.imgUrl} width='100%' height='100%' alt="推荐" />
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>

        </div >
    )
}

export default React.memo(Slider)
