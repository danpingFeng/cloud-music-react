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
                <span>我的云音乐</span>
                <span>
                    <IconFont type="icon-search1"></IconFont>
                </span>
            </Top>
            <Tab>
                <NabLink to="/Recommend" activeClassName="selected">
                    <TabItem>
                        <span>推荐</span>
                    </TabItem>

                </NabLink>
                <NabLink to="/Singers" activeClassName="selected">
                    <TabItem>
                        <span>歌手</span>
                    </TabItem>
                </NabLink>
                <NabLink to="/Rank" activeClassName="selected"> <TabItem>
                    <span>排行</span>
                </TabItem>
                </NabLink>
            </Tab>
            {props.children}
        </div>
    );
}

export default React.memo(BasicLayout);
