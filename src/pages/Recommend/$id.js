import React, {useState, useRef, useEffect, Suspense, useCallback} from 'react';
import {Container, TopDesc, Menu, SongList, SongItem} from './style';
import {connect} from 'dva';
import {CSSTransition} from 'react-transition-group';
import Header from '@/components/header';
import Scroll from '@/components/Scroll';
// import IconFont from '@/assets/IconFont';
import {getCount, getName, isEmptyObj} from '@/utils/utils';
import style from '../../assets/global-style';
import router from 'umi/router';
import {Icon} from 'antd';
import Loading from '@/components/loading';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1576120_om96hq5d3m.js'
});

// todo: 歌单数据层

// function Album({dispatch, album}) {
function Album(props) {
    const {dispatch, album} = props;

    const [showStatus, setShowStatus] = useState(true);
    const [isMarquee, setIsMarquee] = useState(false);
    const [title, setTitle] = useState('歌单');
    const headerEl = useRef();

    const handleBack = () => {
        setShowStatus(false);
    };

    useEffect(() => {
        dispatch({
            type: 'album/fetchAlbumDetail',
            payload: props.match.params.id
        });
    }, []);

    const HEADER_HEIGHT = 45;

    const handleScroll = (pos) => {
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y / minScrollY);
        let headerDom = headerEl.current;
        // 滑过顶部的高度开始变化
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style["theme-color"];
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
            setTitle(currentAlbum.name);
            setIsMarquee(true);
        } else {
            headerDom.style.backgroundColor = "";
            headerDom.style.opacity = 1;
            setTitle("歌单");
            setIsMarquee(false);
        }
    };
    const currentAlbum = album.currentAlbum ? album.currentAlbum : {}
    return (
        !isEmptyObj(currentAlbum) ?
            <CSSTransition
                in={showStatus}
                timeout={300}
                classNames="fly"
                appear={true}
                unmountOnExit
            // onExited={props.history.goBack}
            >
                <Container>
                    <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee} ></Header>
                    <Suspense fallback={<Loading />}>
                        <Scroll bounceTop={false} onScroll={handleScroll}>
                            <div>
                                <TopDesc background={currentAlbum.coverImgUrl}>
                                    <div className="background">
                                        <div className="filter"></div>
                                    </div>
                                    <div className="img_wrapper">
                                        <div className="decorate"></div>
                                        <img src={currentAlbum.coverImgUrl} alt="" />
                                        <div className="play_count">
                                            <IconFont type="iconerji2" />
                                            <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万 </span>
                                        </div>
                                    </div>
                                    <div className="desc_wrapper">
                                        <div className="title">{currentAlbum.name}</div>
                                        <div className="person">
                                            <div className="avatar">
                                                <img src={currentAlbum.creator.avatarUrl} alt="" />
                                            </div>
                                            <div className="name">{currentAlbum.creator.nickname}</div>
                                        </div>
                                    </div>
                                </TopDesc>
                                <Menu>
                                    <div>
                                        <IconFont type="iconpinglun" />
                                        评论
                            </div>
                                    <div>
                                        <IconFont type="iconxin" />
                                        点赞
                            </div>
                                    <div>
                                        <IconFont type="iconfavor-active" />
                                        收藏
                            </div>
                                    <div>
                                        <IconFont type="iconmsnui-more" />
                                        更多
                            </div>
                                </Menu>
                                <SongList>
                                    <div className="first_line">
                                        <div className="play_all">
                                            <IconFont type="iconbofang" />
                                            <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
                                        </div>
                                        <div className="add_list">
                                            <IconFont type="iconip-back" />
                                            <span > 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
                                        </div>
                                    </div>
                                    <SongItem>
                                        {
                                            currentAlbum.tracks.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span className="index">{index + 1}</span>
                                                        <div className="info">
                                                            <span>{item.name}</span>
                                                            <span>
                                                                {getName(item.ar)} - {item.al.name}
                                                            </span>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </SongItem>
                                </SongList>
                            </div>

                        </Scroll>
                    </Suspense>
                </Container>
            </CSSTransition>
            : ''
    )
}


export default connect(({album}) => ({
    album,
}))(React.memo(Album));
