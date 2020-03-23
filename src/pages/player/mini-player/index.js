import React, {useState, useRef, useEffect, memo} from 'react';
import {getName} from '@/utils/utils';
import {MiniPlayerContainer} from './style';
import IconFont from '@/assets/IconFont';
import {CSSTransition} from 'react-transition-group';

function MiniPlayer(props) {
    console.log('mini player', props);
    const {song} = props;
    const miniPlayerRef = useRef();

    return (
        <CSSTransition
            classNames="mini"
            in={props.fullScreen}
            timeout={400}
            onEnter={() => {miniPlayerRef.current.style.display = "flex"}}
            onExited={() => {miniPlayerRef.current.style.display = "none";}}>
            <MiniPlayerContainer ref={miniPlayerRef}
            // onClick={() => setFullScreen(true)}
            >
                <div className="icon">
                    <div className="imgWrapper">
                        <img src={song.al.picUrl} width="40" height="40" alt="" />
                    </div>
                </div>
                <div className="text">
                    <h2 className="name"> {song.name}</h2>
                    <p className="desc"> {getName(song.ar)} </p>
                </div>

                <div className="control">
                    <IconFont type="iconplayer" />

                </div>
                <div className="control">
                    <IconFont type="iconbofangmoshi" />
                </div>
            </MiniPlayerContainer>

        </CSSTransition>

    )
}

export default React.memo(MiniPlayer);
