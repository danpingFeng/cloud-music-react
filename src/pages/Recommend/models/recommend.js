import {getBannerList, getRecommendList} from '@/services/recommend';

export default {
    namespace: 'recommend',
    state: {
        bannerList: [],
        recommendList: []
    },
    effects: {
        *fetchBannerList(_, {call, put}) {
            const response = yield call(getBannerList);
            yield put({
                type: 'saveBannerList',
                payload: Array.isArray(response.banners) ? response.banners : [],
            });
        },
        *fetchRecommendList(_, {call, put}) {
            const response = yield call(getRecommendList);
            yield put({
                type: 'saveRecommendList',
                payload: Array.isArray(response.result) ? response.result : [],
            });
        },
    },

    reducers: {
        saveBannerList(state, action) {
            state.bannerList = action.payload;
            return {...state};
        },
        saveRecommendList(state, action) {
            state.recommendList = action.payload;
            return {...state};
        },
    },
}
