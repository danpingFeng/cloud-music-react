import React, {useState, useEffect, Suspense, useRef} from 'react';
import Horizen from '@/components/horizenItem';
// import Scroll from '@/components/Scroll';
import {categoryTypes, alphaTypes} from '@/config/index';
import {NavContainer, ListContainer, List, ListItem} from './style';
import {connect} from 'dva';
import Loading from '@/components/loading';
import LazyLoad, {forceCheck} from 'react-lazyload';
import router from 'umi/router';

const Scroll = React.lazy(() => import('@/components/Scroll'));

function Singers({dispatch, singers}) {
    const scrollRef = useRef(null);

    useEffect(() => {
        // 避免重复请求
        if (!singers.singersList.length) {
            // 请求热门歌手列表
            dispatch({
                type: 'singers/fetchHotSingersList',
                payload: 0
            })
        }

        // 请求全部歌手列表
        // dispatch({
        //     type: 'singers/fetchSingersList',
        //     payload: {category: singers.category, alpha: singers.alpha, listOffset: 0}
        // })
    }, []);

    const enterDeatil = id => {
        router.push(`/singers/${id}`);
    }

    // 滑到最底部刷新部分的处理
    const handlePullUp = () => {
        dispatch({
            type: 'singers/setPullUpLoading'
        });
        const {category, alpha, listOffset} = singers;

        // 表示是热门歌手
        if (category === '') {
            dispatch({
                type: 'singers/fetchMoreHotSingersList',
                payload: listOffset
            })
        } else {
            dispatch({
                type: 'singers/fetchMoreSingersList',
                payload: {category, alpha, listOffset}
            })
        }
    }
    // 顶部下拉刷新
    const handlePullDown = () => {
        dispatch({
            type: 'singers/setPullDownLoading'
        });

        dispatch({
            type: 'singers/setListOffset',
            payload: 0
        });

        // 表示是热门歌手
        if (singers.category === '' && singers.alpha === '') {
            dispatch({
                type: 'singers/fetchHotSingersList',
                payload: 0
            })
        } else {
            const {category, alpha, listOffset} = singers;
            dispatch({
                type: 'singers/fetchMoreSingersList',
                payload: {category, alpha, listOffset}
            })
        }
    }

    const handleUpdateCategory = newVal => {
        if (category === newVal) return;
        dispatch({
            type: 'singers/setCategory',
            payload: newVal
        });

        dispatch({
            type: 'singers/setListOffset',
            payload: 0
        });

        dispatch({
            type: 'singers/setEnterLoading',
            payload: true
        })
        const {category, alpha, listOffset} = singers;

        // 请求全部歌手列表
        dispatch({
            type: 'singers/fetchSingersList',
            payload: {category, alpha, listOffset: 0}
        })

        scrollRef.current.refresh();
    }
    const handleUpdateAlpha = newVal => {
        if (alpha === newVal) return;
        dispatch({
            type: 'singers/setAlpha',
            payload: newVal
        });

        dispatch({
            type: 'singers/setListOffset',
            payload: 0
        });

        dispatch({
            type: 'singers/setEnterLoading',
            payload: true
        })

        const {category, alpha, listOffset} = singers;
        // 请求全部歌手列表
        dispatch({
            type: 'singers/fetchSingersList',
            payload: {category, alpha, listOffset: 0}
        })

        scrollRef.current.refresh();
    }

    const enterDetail = id => {
        router.push(`singers/${id}`)
    }

    const renderSingerList = () => {
        return (
            <List>
                {
                    singers.singersList.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + '' + index}
                                onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img src={require('./singer.png')} />} >
                                        <img src={`${item.picUrl}?parm=300*300`} width="100%" alt="" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <NavContainer>
            <Horizen list={categoryTypes} title={"分类(默认热门):"} handleClick={val => handleUpdateCategory(val)} oldVal={singers.category} ></Horizen>
            <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={singers.alpha} ></Horizen>

            <ListContainer>
                <Suspense fallback={<Loading />}>
                    <Scroll
                        onScroll={forceCheck}
                        pullUp={handlePullUp}
                        pullDown={handlePullDown}
                        ref={scrollRef}
                    // pullUpLoading={singers.pullUpLoading}
                    // pullDownLoading={singers.pullDownLoading}
                    >
                        {
                            renderSingerList()
                        }
                    </Scroll>
                </Suspense>
            </ListContainer>
        </NavContainer >
    );
}

export default connect(({singers}) => ({
    singers
}))(React.memo(Singers))
