import React from 'react'
import {getCount} from '@/utils/utils'
import LazyLoad from 'react-lazyload';
import IconFont from '@/assets/IconFont';
import {ListWrapper, List, ListItem} from './style'

// import {Icon} from 'antd';
// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1576120_rxiajctro5j.js'
// });

function recommendList(props) {
    const {recommendList} = props;

    return (
        <ListWrapper>
            <h1 className="title">推荐歌单</h1>
            <List>
                {
                    recommendList.map((item, index) => {
                        return (
                            <ListItem key={item.id + index}>
                                <div className="img-wrapper">
                                    {/* decorate: 用来给给图片上的图标和文字提供一个遮罩，因为在字体颜色是白色，在面对白色图片背景的时候，文字会看不清或者看不到，因此提供一个阴影来衬托出文字 */}
                                    <div className="decorate"></div>

                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                                        <img src={item.picUrl + "?param=300*300"} width="100%" height="10%" alt="" />
                                    </LazyLoad>

                                </div>

                                <div className="playCount">
                                    <IconFont type="iconerji2"></IconFont>
                                    <span className="count">{getCount(item.playCount)}</span>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </ListWrapper>
    )
}

export default React.memo(recommendList)