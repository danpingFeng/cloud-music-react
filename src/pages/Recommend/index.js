import React, {useEffect, Suspense} from 'react';
import {connect} from 'dva';
import Slider from '@/components/slider';
import {Content} from './style';

import {forceCheck} from 'react-lazyload';
import Loading from '@/components/loading';

// React.lazy + Suspense 组件懒加载
const Scroll = React.lazy(() => import('@/components/Scroll'));
const RecommendList = React.lazy(() => import('@/components/recommendList'));

function Recommend({dispatch, recommend}) {

    useEffect(() => {
        if (!recommend.bannerList.length) {
            dispatch({
                type: 'recommend/fetchBannerList',
            });
        }

        if (!recommend.recommendList.length) {
            dispatch({
                type: 'recommend/fetchRecommendList',
            });
        }

    }, [])

    return (
        <Content>
            <Suspense fallback={<Loading />}>
                <Scroll className="list" onScroll={forceCheck}>
                    <div>
                        <Slider bannerList={recommend.bannerList}></Slider>
                        <RecommendList recommendList={recommend.recommendList}></RecommendList>
                    </div>
                </Scroll>
            </Suspense>
        </Content>
    );
}

export default connect(({recommend}) => ({
    recommend,
}))(React.memo(Recommend));
