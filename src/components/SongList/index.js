import React from 'react';
import {SongList, SongItem} from './style';
import {getName} from '@/utils/utils';
import IconFont from '@/assets/IconFont';

const SongsList = React.forwardRef((props, refs) => {
    const {collectCount, showCollect, songs} = props;
    const totalCount = songs.length;
    const selectItem = (e, index) => {
        console.log(index);
    }

    let songList = list => {
        let res = [];
        for (let i = 0; i < songs.length; i++) {
            let item = songs[i];
            res.push(
                <li key={item.id} onClick={(e, index) => {selectItem(e, index)}}>
                    <span className="index">{i + 1}</span>
                    <div className="info">
                        <span>{item.name}</span>
                        <span>
                            {
                                item.ar ? getName(item.ar) : getName(item.artists)
                            }
                            -
                            {
                                item.al ? getName(item.al) : getName(item.album.name)

                            }
                        </span>
                    </div>
                </li>
            )
            return res;
        }
    }

    const collect = count => {
        return (
            <div className="add_list">
                <IconFont type="iconip-back" />
                <span > 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
            </div>
        )
    }

    return (
        <SongList ref={refs} showBackground={props.showBackground}>
            <div className="first_line">
                <div className="play_all">
                    <IconFont type="iconbofang" />
                    <span > 播放全部
                        <span className="sum">(共 {totalCount} 首)</span>
                    </span>
                </div>
                {showCollect ? collect(collectCount) : null}
            </div>
            <SongItem>
                {songList(songs)}
            </SongItem>
        </SongList >
    )
})

export default React.memo(SongsList);
