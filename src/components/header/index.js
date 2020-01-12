import React, {useEffect} from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import PropTypes from "prop-types";
// import IconFont from '@/assets/IconFont';
import {Icon} from 'antd';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1576120_c46wywawcku.js'
});

const HeaderContainer = styled.div`
    position: fixed;
    padding: 5px 10px;
    padding-top: 0;
    height: 40px;
    line-height: 40px;
    width: 100%;
    z-index: 100;
    display: flex;
    color: ${style["font-color-light"]};

    .back {
        margin-right: 5px;
        font-size: 20px;
        width: 20px;
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
