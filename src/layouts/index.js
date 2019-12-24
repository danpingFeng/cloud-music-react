import React from 'react';
import {GlobalStyle} from '../style.js';
import NabLink from 'umi/navlink';
import IconFont from '@/assets/IconFont';
import {Top, Tab, TabItem} from './style';

// 全局路由
function BasicLayout(props) {
    return (
        <div>
            <GlobalStyle></GlobalStyle>
            <Top>
                <span>
                    <IconFont type="iconmenu" />
                </span>
                <span>网易云音乐</span>
                <span>
                    <IconFont type="icon-search1"></IconFont>
                </span>
            </Top>
            <Tab>
                <NabLink to="/Recommend" activeClassName="selected">推荐
            </NabLink>
                <NabLink to="/Singers" activeClassName="selected">歌手</NabLink>
                <NabLink to="/Rank" activeClassName="selected">排行</NabLink>
            </Tab>
            {props.children}
        </div>
    );
}

export default React.memo(BasicLayout);
