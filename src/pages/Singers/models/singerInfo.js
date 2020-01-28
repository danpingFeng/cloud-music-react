
import {getSingerInfo} from '@/services/singers'

export default {
    namespaced: 'singerInfio',
    state: {
        singerInfo: {},

    },
    effects: {
        *fetchSingerInfo({payload}, {call, put}) {
            const response = yield call(getSingerInfo, payload);
            yield put({
                type: 'saveSingerInfo',
                payload: response
            })
        }
    },
    reducers: {
        saveSingerInfo(state, action) {
            state.singerInfo = action.payload;
            return {...state};
        }
    }
}
