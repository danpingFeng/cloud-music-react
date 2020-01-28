import React, {useEffect, useRef, useState, useCallback} from 'react';
import {CSSTransition} from 'react-transition-group';
import {Container, ImgWrapper, BgLayer, SongListWrapper, CollectorButton} from './style';
import Header from '../../components/header';
import Scroll from '../../components/Scroll';
import SongList from '../../components/SongList';
import IconFont from '@/assets/IconFont';

function Singer(props) {
    useEffect(() => {
        console.log('id', props.match.params.id)
    }, []);

    const CollectButton = useRef();
    const imgWrapper = useRef();
    const header = useRef();
    const songScrollWrapper = useRef();
    const songScroll = useRef();
    const layer = useRef();
    const initialHeight = useRef();
    const OFFSET = 5;

    useEffect(() => {
        let h = imgWrapper.current.offsetHeight;
        songScrollWrapper.current.style.top = `${h - OFFSET} px`;
        initialHeight.current = h;
        // 把遮罩先放在下面，以裹住歌曲列表
        layer.current.style.top = `${h - OFFSET} px`;
        songScroll.current.refresh();
    }, []);


    const [showStatus, setShowStatus] = useState(true);

    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{name: "薛之谦"}],
                al: {
                    name: "薛之谦专辑"
                }
            },
            // 省略 20 条
        ]
    }

    const setStatusFalse = useCallback(() => {
        setShowStatus(false);
    }, []);

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}>

            <Container>
                <Header handleClick={setStatusFalse} title={artist.name} ref={header}></Header>
                <ImgWrapper ref={imgWrapper} bgUrl={artist.picUrl}></ImgWrapper>
                <div className="filter"></div>

                <CollectorButton ref={CollectButton}>
                    <IconFont type="iconip-back" />
                    <span className="text">收藏</span>
                </CollectorButton>

                <BgLayer ref={layer}></BgLayer>

                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll}>
                        <SongList songs={artist.hotSongs} showCollect={false}>
                        </SongList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(Singer);
