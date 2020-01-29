import React, {useEffect, Suspense} from 'react';
import {connect} from 'dva';
import {Container, SongList, List, ListItem} from './style';
import Scroll from '@/components/Scroll';
import Loading from '@/components/loading';
import router from 'umi/router';

import Player from '@/components/player';

function Rank({dispatch, rank}) {
    useEffect(() => {
        dispatch({
            type: 'rank/fetchRankList'
        })
    }, [])

    const enterDetail = item => {
        router.push(`/rank/${item.id}`);
    }

    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map(item => {
                        return (
                            <ListItem key={item.coverImgUrl} tracks={item.tracks} onClick={() => {enterDetail(item)}}>
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="decorate"></div>
                                    <span className="update_frequency">{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }

            </List>
        )
    }

    const renderSongList = list => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}  </li>
                    })
                }
            </SongList>
        )
            : null
    }

    return (
        <Container>
            <Suspense fallback={<Loading />}>
                <Scroll>
                    <div>
                        <Player></Player>

                        <h1 classNam="offical"> 官方榜 </h1>
                        {renderRankList(rank.officalList)}

                        <h1 classNam="global"> 全球榜 </h1>
                        {renderRankList(rank.globalList, true)}
                    </div>
                </Scroll>
            </Suspense>
        </Container>
    );
}

export default connect(({rank}) => ({rank}))(React.memo(Rank))

