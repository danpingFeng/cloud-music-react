
import {getBannerList, getRecommendList} from '@/services/recommend';

export default {
    namespace: 'recommend',
    state: {
        banenrList: [],
        recommendList: []
    },
    effects: {
        *fetchBannerList(_, {call, put}) {
            const response = yield call(getBannerList);
            yield put({
                type: 'saveBannerList',
                payload: Array.isArray(response) ? response : [],
            });
        },
        *fetchRecommendList(_, {call, put}) {
            const response = yield call(getRecommendList);
            yield put({
                type: 'saveRecommendList',
                payload: Array.isArray(response) ? response : [],
            });
        },
    },

    reducers: {
        saveBannerList(state, action) {
            return {
                ...state,
                banenrList: action.payload,
            };
        },
        saveRecommendList(state, action) {
            return {
                ...state,
                recommendList: action.payload,
            };
        },
    },
}
