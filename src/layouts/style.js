import styled from 'styled-components';
import style from '../assets/global-style.js'

export const Top = styled.div`
    padding: 0 10px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${style["theme-color"]};
    color: #ffffff;

    &>span {
        cursor: pointer;
        &.iconfont {
            font-size: 25px;
        }
    }
`

export const Tab = styled.div`
    height: 36px;
    display: flex;
    background: #d44439;
    justify-content: space-around;
    align-items: center;

    &>a {
        letter-spacing: 1px;
        display: inline-block;
        // background: black;
        padding: 2px 0;
        color: #e4e4e4;
    }

    &>.selected {
        padding: 3px 0;
        border-bottom: 1px solid white;
        font-weight: 500;
    }
`
