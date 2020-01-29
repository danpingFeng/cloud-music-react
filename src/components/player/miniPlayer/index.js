import React from 'react'
import {getName} from '@/utils/utils';
import {MiniPlayerContainer} from './style';
import IconFont from '@/assets/IconFont';

function MiniPlayer(props) {
    const {song} = props;
    return (
        <MiniPlayerContainer>
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
    )
}

export default React.memo(MiniPlayer);
