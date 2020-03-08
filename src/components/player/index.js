import React, {useRef, useState, useffect} from 'react';

import {connect} from 'dva';
// import MiniPlayer from './miniPlayer';
// import NormalPlayer from "./normalPlayer";
// import {isEmptyObj, shuffle, findIndex, getSongUrl} from '@/utils/utils';

function Player(props) {
    const {dispatch, player} = props;
    console.log('player', player);
    const currentSong = {
        al: {picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg"},
        name: "木偶人",
        ar: [{name: "薛之谦"}]
    }

    return (
        <div>
            {/* <MiniPlayer song={currentSong} fullScreen={fullScreen} />
            <NormalPlayer song={currentSong} fullScreen={fullScreen} ></NormalPlayer> */}
        </div >
    )
}

export default connect(({player}) => ({player}))(React.memo(Player))
