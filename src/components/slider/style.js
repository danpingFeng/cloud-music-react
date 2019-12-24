import styled from 'styled-components';
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;

  .before {
    position: absolute;
    top: -300px;
    height: 460px;
    width: 100%;
    z-index: 1;
    background: ${style["theme-color"]};
  }

  .slider-wrapper {
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;

    .swiper-container {
        height: 160px;
    }
  }
  .slider-nav {
    position: absolute;
    display: block;
    width: 100%;
    height: 160px;
  }

  .swiper-pagination {
    width: 100%;
    top: 140px;

    .swiper-pagination-bullet {
        margin: 0 2px;
    }

    .swiper-pagination-bullet-active {
        background: ${style["theme-color"]};
    }
  }
`
