import React, {useRef, useState, useffect, useCallback} from 'react';
import {CSSTransition} from 'react-transition-group';
import {prefixStyle, formatPlayTime, getName} from '@/utils/utils';
import IconFont from '@/assets/IconFont';
import Scroll from '@/components/Scroll';
import animations from "create-keyframe-animation";
import {playMode, list} from "@/api/config";

import {
    NormalPlayerContainer,
    Top,
    Middle,
    Bottom,
    ProgressWrapper,
    Operators,
    CDWrapper,
    LyricContainer,
    LyricWrapper,
    List,
    ListItem
} from './style';


function NormalPlayer(props) {
    const {
        full,
        song,
        mode,
        playing,
        percent,
        currentTime,
        duration,
        currentLineNum,
        currentPlayingLyric,
        currentLyric,
        speed
    } = props;

    const {
        changeMode,
        handlePrev,
        handleNext,
        onProgressChange,
        clickPlaying,
        toggleFullScreenDispatch,
        togglePlayListDispatch,
        clickSpeed
    } = props;
    //处理transform的浏览器兼容问题
    const transform = prefixStyle("transform");

    const normalPlayerRef = useRef();
    const lyricScrollRef = useRef();

    const lyricLineRefs = useRef([]);
    const cdWrapperRef = useRef();
    const currentState = useRef(0);

    useEffect(() => {
        if (!lyricScrollRef.current) return;
        let bScroll = lyricScrollRef.current.getBScroll();
        if (currentLineNum > 5) {
            let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
            bScroll.scrollToElement(lineEl, 1000);
        } else {
            bScroll.scrollTo(0, 0, 1000);
        }
    }, [currentLineNum]);

    const getPlayMode = () => {
        let content;
        if (mode === playMode.sequence) {
            content = "&#xe625;";
        } else if (mode === playMode.loop) {
            content = "&#xe653;";
        } else {
            content = "&#xe61b;";
        }
        return content;
    };


    // 启动帧动画
    const enter = () => {
        normalPlayerRef.current.style.display = "block";
        const {x, y, scale} = _getPosAndScale();// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
        let animation = {
            0: {
                transform: `translate3d (${x} px,${y} px,0) scale (${scale})`
            },
            60: {
                transform: `translate3d (0, 0, 0) scale (1.1)`
            },
            100: {
                transform: `translate3d (0, 0, 0) scale (1)`
            }
        };
        animations.registerAnimation({
            name: "move",
            animation,
            presets: {
                duration: 400,
                easing: "linear"
            }
        });
        animations.runAnimation(cdWrapperRef.current, "move");
    };
    // 计算偏移的辅助函数
    const _getPosAndScale = () => {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth / width;
        // 两个圆心的横坐标距离和纵坐标距离
        const x = -(window.innerWidth / 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        return {
            x,
            y,
            scale
        };
    };

    const afterEnter = () => {
        // 进入后解绑帧动画
        const cdWrapperDom = cdWrapperRef.current;
        animations.unregisterAnimation("move");
        cdWrapperDom.style.animation = "";
    };

    const leave = () => {
        if (!cdWrapperRef.current) return;
        const cdWrapperDom = cdWrapperRef.current;
        cdWrapperDom.style.transition = "all 0.4s";
        const {x, y, scale} = _getPosAndScale();
        // cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    };

    const afterLeave = () => {
        if (!cdWrapperRef.current) return;
        const cdWrapperDom = cdWrapperRef.current;
        cdWrapperDom.style.transition = "";
        // cdWrapperDom.style[transform] = "";
        cdWrapperDom.style.transform = "";
        normalPlayerRef.current.style.display = "none";
        // currentState.current = "";
    };


    const toggleCurrentState = () => {
        if (currentState.current !== "lyric") {
            currentState.current = "lyric";
        } else {
            currentState.current = "";
        }
    };

    const clickPlayingCB = useCallback((e) => {
        clickPlaying(e, !playing);
    }, [clickPlaying, playing]);


    return (
        <CSSTransition
            classNames="normal"
            in={full}
            timeout={400}
            mountOnEnter
            onEnter={enter}
            onEntered={afterEnter}
            onExit={leave}
            onExited={afterLeave}
        >
            <NormalPlayerContainer ref={normalPlayerRef}>
                <div className="background">
                    <img src={song.al.picUrl + "?param=300*300"} width="100%" height="100%" alt="歌曲图片" />
                </div>

                <div className="background layer"></div>

                <Top className="top">
                    <div className="back" onClick={() => toggleFullScreenDispatch(false)}>
                        <i className="iconfont icon-back">&#xe662;</i>
                    </div>
                    <div className="text">
                        <h1 className="title">{song.name}</h1>
                        <h1 className="subtitle">{getName(song.ar)}</h1>
                    </div>
                </Top>

                {/* <Top className="top">
                    <div className="back">
                        <IconFont type="icon-search1"></IconFont>
                    </div>
                    <h1 className="title">{song.name}</h1>
                    <h1 className="subtitle">{getName(song.ar)}</h1>
                </Top> */}

                <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>

                    <CSSTransition timeout={400}
                        classNames="fade"
                        in={currentState.current !== "lyric"}
                    >
                        <CDWrapper>
                            <div className="cd">
                                <img
                                    className="image play"
                                    src={song.al.picUrl + "?param=400x400"}
                                    alt=""
                                />
                            </div>
                        </CDWrapper>
                    </CSSTransition>

                </Middle>

                <Bottom className="bottom">
                    <Operators>
                        <div className="icon i-left">
                            <IconFont type="icon-search1"></IconFont>
                        </div>
                        <div className="icon i-left">
                            <IconFont type="icon-search1"></IconFont>
                        </div>
                        <div className="icon i-center">
                            <IconFont type="icon-search1"></IconFont>
                        </div>

                        <div className="icon i-right">
                            <IconFont type="icon-search1"></IconFont>
                        </div>

                        <div className="icon i-right">
                            <IconFont type="icon-search1"></IconFont>
                        </div>
                    </Operators>
                </Bottom>
            </NormalPlayerContainer>
        </CSSTransition>

    )
}
export default React.memo(NormalPlayer)

