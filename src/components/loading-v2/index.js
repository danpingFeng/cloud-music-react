import React from 'react';
import styled, {keyframes} from 'styled-components';
import style from '../../assets/global-style'

// transform-origin改变元素基点,该属性只有在设置了transform属性的时候才起作用,
// 在没有使用  transform-origin 属性的情况下 transform 的 rotate , translate , scale , skew , matrix  这些操作都是以自身在中心位置为原点的。
// left,center right  是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
// top center bottom  是垂直方向的取值，其中top=0%;center=50%;bottom=100%;

const dance = keyframes`
    0%, 40%, 100%{
      transform: scaleY(0.4);
      transform-origin: center 100%;
    }
    20%{
      transform: scaleY(1);
    }
`
const Loading = styled.div`
    height: 10px;
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 10px;
    >div{
      display: inline-block;
      background-color: ${style["theme-color"]};
      height: 100%;
      width: 1px;
      margin-right:2px;
      animation: ${dance} 1s infinite;
    }
    >div:nth-child(2) {
      animation-delay: -0.4s;
    }
    >div:nth-child(3) {
      animation-delay: -0.6s;
    }
    >div:nth-child(4) {
      animation-delay: -0.5s;
    }
    >div:nth-child(5) {
      animation-delay: -0.2s;
    }

`

function LoadingV2() {
  return (
    <Loading>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </Loading>
  );
}

export default React.memo(LoadingV2);