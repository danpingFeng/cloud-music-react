
import {getHotSingersList, getSingersList} from '@/services/singers'

export default {
    namespaced: 'singers',
    state: {
        hotSingersList: [],
        singersList: []
    },
    effects: {
        *fetchHotSingersList({payload}, {call, put}) {
            const response = yield call(getHotSingersList, payload);
            yield put({
                type: 'saveHotSingersList',
                payload: Array.isArray(response.artists) ? response.artists : []
            });
        },

        *fetchSingersList({payload}, {call, put}) {
            const {category, alpha, count} = payload;
            const response = yield call(getSingersList, category, alpha, count);
            yield put({
                type: 'saveSingersList',
                payload: Array.isArray(response.artists) ? response.artists : []
            })
        }
    },
    reducers: {
        saveHotSingersList(state, action) {
            return {
                ...state,
                hotSingersList: action.payload
            }
        },
        saveSingersList(state, action) {
            return {
                ...state,
                singersList: action.payload
            }
        }

    }
}