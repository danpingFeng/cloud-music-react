import React, {useState, useEffect, Suspense} from 'react';
import Horizen from '@/components/horizenItem';
// import Scroll from '@/components/Scroll';
import {categoryTypes, alphaTypes} from '@/config/index';
import {NavContainer, ListContainer, List, ListItem} from './style';
import {connect} from 'dva';
import Loading from '@/components/loading';

const Scroll = React.lazy(() => import('@/components/Scroll'));

function Singers({dispatch, singers}) {
    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    let handleUpdateAlpha = val => {
        setAlpha(val);
    }

    let handleUpdateCategory = val => {
        setCategory(val);
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

    const renderSingerList = () => {
        return (
            <List>
                {
                    singers.singersList.map((item, index) => {
                        console.log('item', item);
                        return (
                            <ListItem key={item.accountId + '' + index}>
                                <div className="img_wrapper">
                                    <img src={`${item.picUrl}?parm=300*300`} width="100%" alt="" />
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
                    <Scroll>
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
