import {getRankList} from '@/services/rank';
import {findIndex} from '@/utils/utils';

export default {
    namespace: 'rank',
    state: {
        rankList: [],
        officalList: [],
        globalList: []
    },
    effects: {
        *fetchRankList(_, {call, put}) {
            const response = yield call(getRankList);
            yield put({
                type: 'saveRankList',
                payload: Array.isArray(response.list) ? response.list : [],
            });
        }
    },
    reducers: {
        saveRankList(state, action) {
            state.rankList = action.payload;
            let index = findIndex(action.payload);
            state.officalList = state.rankList.slice(0, index);
            state.globalList = state.rankList.slice(index);
            return {...state};
        }
    }
}

