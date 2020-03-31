import React, {useEffect, useRef, useState, useCallback} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Container, ImgWrapper, BgLayer, SongListWrapper, CollectorButton} from './style';
import {connect} from 'dva';
import Header from '@/components/header';
import Scroll from '@/components/scroll';
import SongList from '@/components/songList';
import IconFont from '@/assets/IconFont';
import {HEADER_HEIGHT} from '@/config/index';

// 歌手页面
function Singer(props) {

    const {dispatch, singerInfo} = props;
    const {artist, hotSongs} = singerInfo.singerInfo;

    if (artist) {
        setTimeout(() => {
            let h = imageWrapper.current.offsetHeight;
            songScrollWrapper.current.style.top = `${h - OFFSET} px`;
            initialHeight.current = h;
            // 把遮罩先放在下面，以裹住歌曲列表
            layer.current.style.top = `${h - OFFSET} px`;
            // 如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常。
            songScroll.current.refresh();
        }, 0);

    }

    useEffect(() => {
        // fetch歌手信息
        dispatch({
            type: 'singerInfo/fetchSingerInfo',
            payload: props.match.params.id
        })
    }, []);

    const collectButton = useRef();
    const imageWrapper = useRef();
    const header = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const layer = useRef();
    const initialHeight = useRef();
    const OFFSET = 5;

    const [showStatus, setShowStatus] = useState(true);

    const setStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);

    const handleScroll = pos => {
        let height = initialHeight.current;
        const newY = pos.y;
        const imageDOM = imageWrapper.current;
        const buttonDOM = collectButton.current;
        const headerDOM = header.current;
        const layerDOM = layer.current;
        const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

        const percent = Math.abs(newY / height);
        //说明: 在歌手页的布局中，歌单列表其实是没有自己的背景的，layerDOM其实是起一个遮罩的作用，给歌单内容提供白色背景
        //因此在处理的过程中，随着内容的滚动，遮罩也跟着移动
        if (newY > 0) {
            //处理往下拉的情况,效果：图片放大，按钮跟着偏移
            imageDOM.style["transform"] = `scale(${1 + percent})`;
            buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            layerDOM.style.top = `${height - OFFSET + newY}px`;
        } else if (newY >= minScrollY) {
            //往上滑动，但是还没超过Header部分
            layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
            layerDOM.style.zIndex = 1;
            imageDOM.style.paddingTop = "75%";
            imageDOM.style.height = 0;
            imageDOM.style.zIndex = -1;
            buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            buttonDOM.style["opacity"] = `${1 - percent * 2}`;
        } else if (newY < minScrollY) {
            //往上滑动，但是超过Header部分
            layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
            layerDOM.style.zIndex = 1;
            //防止溢出的歌单内容遮住Header
            headerDOM.style.zIndex = 100;
            //此时图片高度与Header一致
            imageDOM.style.height = `${HEADER_HEIGHT}px`;
            imageDOM.style.paddingTop = 0;
            imageDOM.style.zIndex = 99;
        }
    };

    return (
        artist ?
            <CSSTransition
                in={showStatus}
                timeout={300}
                classNames="fly"
                appear={true}
                unmountOnExit
                onExited={props.history.goBack}>

                <Container>
                    <Header handleClick={setStatusFalse} title={artist.name} ref={header}></Header>
                    <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
                    </ImgWrapper>
                    <div className="filter"></div>

                    <CollectorButton ref={collectButton}>
                        <IconFont type="iconip-back" />
                        <span className="text">收藏</span>
                    </CollectorButton>

                    <BgLayer ref={layer}></BgLayer>

                    <SongListWrapper ref={songScrollWrapper}>
                        <Scroll onScroll={handleScroll} ref={songScroll}>
                            <SongList songs={hotSongs} showCollect={false}>
                            </SongList>
                        </Scroll>
                    </SongListWrapper>
                </Container>
            </CSSTransition>
            : ''
    )
}
export default connect(({singerInfo}) => ({
    singerInfo
}))(React.memo(Singer))
