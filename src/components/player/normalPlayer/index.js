
import React from 'react';
import {getName} from '@/utils/utils';
import IconFont from '@/assets/IconFont';

import {
    NormalPlayerContainer,
    Top,
    Middle,
    Bottom,
    Operators,
    CDWrapper,
} from './style';


function NormalPlayer(props) {
    const {song} = props;
    return (
        <NormalPlayerContainer>

            <div className="background">
                <img src={song.al.picUrl + "?param=300*300"} width="100%" height="100%" alt="歌曲图片" />
            </div>

            <div className="background layer"></div>

            <Top className="top">
                <div className="back">
                    <IconFont type="icon-search1"></IconFont>
                </div>
                <h1 className="title">{song.name}</h1>
                <h1 className="subtitle">{getName(song.ar)}</h1>
            </Top>

            <Middle>
                <CDWrapper>
                    <div className="cd"> <img
                        className="image play"
                        src={song.al.picUrl + "?param=400x400"}
                        alt=""
                    /></div>
                </CDWrapper>
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
    )
}
export default React.memo(NormalPlayer)

