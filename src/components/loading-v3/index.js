import React from 'react';
import styled, {keyframes} from 'styled-components';
import style from '../../assets/global-style';

const loading = keyframes`
    0%,100% {
        transform: scale(0.0);
    }

    50% {
        transform: scale(1.0);
    }
`

const LoadingWrapper = styled.div`
    >div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        opacity: 0.6;
        border-radius: 50%;
        background-color: ${style["theme-color"]};
        animation: ${loading} 1.4s infinite ease-in;
        z-index: 10;
    }
    >div:nth-child(2) {
        animation-delay: -0.7s;
    }
`
// loading 动画: 利用 CSS3 的 animation-delay 特性，让两个圆交错变化，产生涟漪的效果
function Loading() {
    return (
        <LoadingWrapper>
            <div></div>
            <div></div>
        </LoadingWrapper>
    )
}

export default React.memo(Loading);

