import React, {useEffect, Suspense} from 'react';
import {connect} from 'dva';
import Slider from '@/components/slider';
import {Content} from './style';

import {forceCheck} from 'react-lazyload';
import Loading from '@/components/loading';


// import Scroll from '@/components/Scroll';
// import RecommendList from '@/components/recommendList';
const Scroll = React.lazy(() => import('@/components/Scroll'));
const RecommendList = React.lazy(() => import('@/components/recommendList'));

function Recommend({dispatch, recommend}) {
    useEffect(() => {
        dispatch({
            type: 'recommend/fetchBannerList',
        });

        dispatch({
            type: 'recommend/fetchRecommendList',
        });
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
