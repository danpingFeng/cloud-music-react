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
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    const scrollRef = useRef(null);
    let handleUpdateCategory = id => {
        setCategory(id);
    }

    let handleUpdateAlpha = alpha => {
        setAlpha(alpha);
    }

    useEffect(() => {
        // 请求热门歌手列表
        dispatch({
            type: 'singers/fetchHotSingersList',
            payload: 0
        })

        // 请求全部歌手列表
        dispatch({
            type: 'singers/fetchSingersList',
            payload: {category, alpha, count: 0}
        })
    }, []);

    // const enterDeatil = id => {
    //     router.push(`/singers/${id}`);
    // }

    // const handlePullUp = () => {
    //     pullUpRefresh(category === '', pageCount);
    // }

    // const handlePullDown = () => {
    //     pullDownRefresh(cateory, pageCount);
    // }

    // const handleUpdateCategory = newVal => {
    //     if (category === newVal) return;
    //     // updateCategory(newVal);
    //     dispatch({
    //         type: 'singers/setCategory'
    //     })

    //     scrollRef.current.refresh();
    // }
    // const handleUpdateAlpha = newVal => {
    //     if (alpha === newVal) return;
    //     updateAlpha(newVal);
    //     scrollRef.current.refresh();
    // }

    const renderSingerList = () => {
        return (
            <List>
                {
                    singers.singersList.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + '' + index}>
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
            <Horizen list={categoryTypes} title={"分类(默认热门):"} handleClick={val => handleUpdateCategory(val)} oldVal={category} ></Horizen>
            <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha} ></Horizen>

            <ListContainer>
                <Suspense fallback={<Loading />}>
                    <Scroll
                    // onScroll={forceCheck}
                    // pullUp={handlePullUp}
                    // pullDown={handlePullDown}
                    // ref={scrollRef}
                    // pullUpLoading={pullUpLoading}
                    // pullDownLoading={pullDownLoading}
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
