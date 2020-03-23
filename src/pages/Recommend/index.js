import React, {useEffect, Suspense} from 'react';
import {connect} from 'dva';
import Slider from '@/components/slider';
import {Content} from './style';

import {forceCheck} from 'react-lazyload';
import Loading from '@/components/loading';

// React.lazy + Suspense 组件懒加载
const Scroll = React.lazy(() => import('@/components/scroll'));
const RecommendList = React.lazy(() => import('@/components/recommend-list'));

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
                {/* vue使用slot分发内容,react使用prop分发内容 */}
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
