import React, {useEffect, Suspense} from 'react';
import {connect} from 'dva';
import Slider from '@/components/slider';
import styles from './index.less';

import {forceCheck} from 'react-lazyload';
import Loading from '../../components/loading';

const Scroll = React.lazy(() => import('@/components/Scroll'));
const RecommendList = React.lazy(() => import('@/components/recommendList'));

function Recommend({dispatch, recommend}) {
    // const bannerList = [1, 2, 3, 4].map(item => {
    //     return {imgUrl: 'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'}
    // });

    // const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
    //     return {
    //         id: 1,
    //         picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
    //         playCount: 17171122,
    //         name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    //     }
    // });

    useEffect(() => {
        dispatch({
            type: 'recommend/fetchBannerList',
        });

        dispatch({
            type: 'recommend/fetchRecommendList',
        });
    }, [])

    return (
        <div className={styles.content}>
            <Suspense fallback={<Loading />}>
                {/* todo: 下拉加载图片 待验证 */}
                <Scroll className="list" onScroll={forceCheck}>
                    <div>
                        <Slider bannerList={recommend.bannerList}></Slider>
                        <Suspense fallback={<Loading />}>
                            <RecommendList recommendList={recommend.recommendList}></RecommendList>
                        </Suspense>
                    </div>
                </Scroll>
            </Suspense>
        </div>
    );
}

// export default Products;
export default connect(({recommend}) => ({
    recommend,
}))(React.memo(Recommend));
