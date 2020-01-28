import React, {useEffect, useState} from 'react';
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

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}>

            <Container>
                q123
                <Header title={'头部'}></Header>
                <ImgWrapper bgUrl={artist.picUrl}></ImgWrapper>
                <div className="filter"></div>

                <CollectorButton>
                    <IconFont type="iconip-back" />
                    <span className="text">收藏</span>
                </CollectorButton>

                {/* <BgLayer></BgLayer> */}

                <SongListWrapper>
                    <Scroll>
                        <SongList songs={artist.hotSongs} showCollect={false}>
                        </SongList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}

export default React.memo(Singer);
