import styled from 'styled-components';
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;

  .before {
    position: absolute;
    top: -300px;
    width: 100%;
    height: 410px;
    background: ${style["theme-color"]};
    z-index: 1;
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;

    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 160px;
    }

    .swiper-pagination {
      width: 100%;
      top: 140px;
    }

    .swiper-pagination-bullet {
        margin: 0 2px;
    }

    .swiper-pagination-bullet-active {
        background: ${style["theme-color"]};
    }
  }
`
