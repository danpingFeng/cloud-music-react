import React, {useEffect, Suspense, useRef} from 'react';
import Horizen from '@/components/horizen-item';
import {categoryTypes, alphaTypes} from '@/config/index';
import {NavContainer, ListContainer, List, ListItem} from './style';
import {connect} from 'dva';
import Loading from '@/components/loading-v3';
import LazyLoad, {forceCheck} from 'react-lazyload';
import router from 'umi/router';

const Scroll = React.lazy(() => import('@/components/scroll'));

function Singers({dispatch, singers}) {
    const scrollRef = useRef(null);
    useEffect(() => {
        // 避免重复请求
        if (!singers.singersList.length) {
            // 默认请求热门歌手列表
            dispatch({
                type: 'singers/fetchHotSingersList',
                payload: 0
            })
        }
    }, []);

    // 上拉加载
    const handlePullUp = () => {
        dispatch({
            type: 'singers/setPullUpLoading',
            payload: true
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
            type: 'singers/setPullDownLoading',
            payload: true
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
                type: 'singers/fetchSingersList',
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

        // dispatch({
        //     type: 'singers/setEnterLoading',
        //     payload: true
        // })

        const {category, alpha, listOffset} = singers;

        // 请求全部歌手列表
        dispatch({
            type: 'singers/fetchSingersList',
            payload: {category, alpha, listOffset: 0}
        })

        // 请求列表之后强制刷新
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

        <div>
            {/* NavContainer，scroll外部容器的宽度要设定, 设置为100% */}
            <NavContainer>
                <Horizen list={categoryTypes} title={"分类(默认热门):"} handleClick={val => handleUpdateCategory(val)} oldVal={singers.category} ></Horizen>
                <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={singers.alpha} ></Horizen>
            </NavContainer >

            {/* ListContainer fixed定位 top+bottom 限定Srcoll外部容器的高度 */}
            <ListContainer>
                <Suspense fallback={<Loading />}>
                    <Scroll
                        onScroll={forceCheck}
                        pullUp={handlePullUp}
                        pullDown={handlePullDown}
                        ref={scrollRef}
                        pullUpLoading={singers.pullUpLoading}
                        pullDownLoading={singers.pullDownLoading}
                    >
                        {
                            renderSingerList()
                        }
                    </Scroll>
                </Suspense>
            </ListContainer>

            {/* 入场加载动画 */}
            {/* {singers.enterLoading ? <EnterLoading><Loading></Loading></EnterLoading> : null} */}
        </div>
    );
}

export default connect(({singers}) => ({
    singers
}))(React.memo(Singers))
