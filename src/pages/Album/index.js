import React, {useState, useRef, useEffect, Suspense, useCallback} from 'react';
import {Container, TopDesc, Menu, SongList, SongItem, BgLayer} from './style';
import {connect} from 'dva';
import {CSSTransition} from 'react-transition-group';
import Header from '@/components/header';
import Scroll from '@/components/scroll';
// import IconFont from '@/assets/IconFont';
import {getCount, getName, isEmptyObj} from '@/utils/utils';
import style from '../../assets/global-style';
import router from 'umi/router';
import {Icon} from 'antd';
import Loading from '@/components/loading';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1576120_bblu5hxv90h.js'
});

// 歌单数据层
function Album(props) {
    const {dispatch, album} = props;

    // todo
    //   const {currentAlbum, enterLoading, pullUpLoading, songsCount} = props;
    //   const {getAlbumDataDispatch, changePullUpLoadingStateDispatch} = props;

    const [showStatus, setShowStatus] = useState(true);
    const [isMarquee, setIsMarquee] = useState(false);
    const [title, setTitle] = useState('歌单');

    const musicNoteRef = useRef();
    const headerEl = useRef();

    const id = props.match.params.id;
    useEffect(() => {
        dispatch({
            type: 'album/fetchAlbumDetail',
            payload: id
        });
    }, [id]);

    const currentAlbum = album.currentAlbum ? album.currentAlbum : {}
    const HEADER_HEIGHT = 45;

    // 如果不用 useCallback 包裹，父组件每次执行时会生成不一样的 handleBack 和 handleScroll 函数引用，那么子组件每一次 memo 的结果都会不一样，导致不必要的重新渲染，也就浪费了 memo 的价值。
    // 因此 useCallback 能够帮我们在依赖不变的情况保持一样的函数引用，最大程度地节约浏览器渲染性能。

    // 设置滚动时候的函数，这里要设置滚动时候 上方的效果
    const handleScroll = useCallback((pos) => {
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y / minScrollY);

        // headerEl 通过forwardRef传入子组件，获取子组件dom
        let headerDom = headerEl.current;

        // 滑过顶部的高度开始变化,当向上移动超过header头部的时候，滚动
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style["theme-color"];

            // 随着顶部滚动的高度的变化，透明度慢慢变为1
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2);

            // 切换标题
            setTitle(currentAlbum.name);

            // 跑马灯滚动效果
            setIsMarquee(true);
        } else {
            headerDom.style.backgroundColor = "";
            headerDom.style.opacity = 1;
            setTitle("歌单");
            setIsMarquee(false);
        }
    }, [currentAlbum]);

    // 依赖不变的时候 保持一样的函数引用
    const handleBack = useCallback(() => {
        setShowStatus(false);
    }, []);

    // 新增
    const musicAnimation = (x, y) => {
        musicNoteRef.current.startAnimation({x, y});
    }

    const renderTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    {/* filter的作用：加了个蒙层,对图片的色调进行修饰 */}
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

        )
    }
    const renderMenu = () => {
        return (
            <Menu>
                <div><IconFont type="iconpinglun" />评论</div>
                <div><IconFont type="iconxin" />点赞</div>
                <div><IconFont type="iconfavor-active" />收藏</div>
                <div><IconFont type="iconmsnui-more" />更多</div>
            </Menu>
        )
    };
    const renderSongList = () => {
        return (
            <SongList showBackground={true}>
                <div className="first_line">
                    <div className="play_all">
                        <IconFont type="iconbofang" />
                        <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
                    </div>

                    <div className="add_list">
                        <IconFont type="iconxin" />
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
        )
    }

    return (
        <CSSTransition
            in={showStatus} // 如果this.state.show从false变为true，则动画入场，反之out出场
            timeout={300}  // 动画执行300ms
            classNames="fly" ////自定义的class名
            appear={true}
            unmountOnExit //可选，当动画出场后在页面上移除包裹的dom节点
            onExited={props.history.goBack} //动画出场之后的回调
        >
            <Container>
                <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee} ></Header>
                <Suspense fallback={<Loading />}>
                    {
                        !isEmptyObj(currentAlbum) ?
                            <Scroll bounceTop={false} onScroll={handleScroll}>
                                <div>
                                    {renderTopDesc()}
                                    {renderMenu()}
                                    {renderSongList()}
                                </div>
                            </Scroll>
                            : null
                    }
                </Suspense>
            </Container>
        </CSSTransition>

    )
}


export default connect(({album}) => ({
    album,
}))(React.memo(Album));
