import React from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import PropTypes from "prop-types";
import IconFont from '@/assets/IconFont';

const HeaderContainer = styled.div`
    position: fixed;
    padding: 5px 10px;
    padding-top: 0;
    height: 40px;
    line-height: 40px;
    width: 100%;
    z-index: 110;
    display: flex;
    color: ${style["font-color-light"]};

    .back {
        width: 20px;
        margin-top: 4px;
        margin-right: 5px;
        font-size: 20px;
    }
    >h1 {
        font-size: ${style["font-size-l"]};
        font-weight: 700;
    }
`
const Header = React.forwardRef((props, ref) => {
    const {handleClick, title, isMarquee} = props;
    return (
        <HeaderContainer ref={ref}>
            <IconFont className="back" type="iconip-back" onClick={handleClick} />
            {
                // marquee 跑马灯滚动效果html 属性
                isMarquee ? <marquee><h1>{title}</h1></marquee> : <h1>{title}</h1>
            }

        </HeaderContainer>
    )
})

Header.defaultProps = {
    handleClick: () => {},
    title: '',
    isMarquee: false
}

Header.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string,
    isMarquee: PropTypes.bool
}

export default React.memo(Header)
