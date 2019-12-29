
import {getHotSingersList, getSingersList} from '@/services/singers'

export default {
    namespaced: 'singers',
    state: {
        category: '',
        alpha: '',
        enterLoading: false,
        pullUpLoading: false,
        pullDownLoading: false,
        listOffset: 0,
        hotSingersList: [],
        singersList: [],
    },
    effects: {
        *fetchHotSingersList({payload}, {call, put}) {
            const response = yield call(getHotSingersList, payload);
            yield put({
                type: 'saveSingersList',
                payload: Array.isArray(response.artists) ? response.artists : []
            });
        },

        *fetchSingersList({payload}, {call, put}) {
            const {category, alpha, listOffset} = payload;
            const response = yield call(getSingersList, category, alpha, listOffset);
            yield put({
                type: 'saveSingersList',
                payload: Array.isArray(response.artists) ? response.artists : []
            })
        },

        *fetchMoreHotSingersList({payload}, {call, put}) {
            const response = yield call(getHotSingersList, payload);
            yield put({
                type: 'saveMoreSingersList',
                payload: Array.isArray(response.artists) ? response.artists : []
            });
        },

        *fetchMoreSingersList({payload}, {call, put}) {
            const {category, alpha, listOffset} = payload;
            const response = yield call(getSingersList, category, alpha, listOffset);
            yield put({
                type: 'saveMoreSingersList',
                payload: Array.isArray(response.artists) ? response.artists : []
            })
        },

    },
    reducers: {
        saveHotSingersList(state, action) {
            state.hotSingersList = action.payload;
            return {...state}
        },
        saveSingersList(state, action) {
            state.singersList = action.payload;
            state.listOffset = action.payload.length;
            return {...state}
        },
        setCategory(state, action) {
            state.category = action.payload;
            return {...state}
        },
        setAlpha(state, action) {
            state.alpha = action.payload;
            return {...state}
        },
        setListOffset(state, action) {
            state.listOffset = action.payload;
            return {...state}
        },
        setEnterLoading(state, action) {
            state.enterLoading = action.payload;
            return {...state}
        },
        setPullUpLoading(state, action) {
            state.pullUpLoading = action.payload;
            return {...state}
        },
        setPullDownLoading(state, action) {
            state.pullDownLoading = action.payload;
            return {...state}
        },
        saveMoreSingersList(state, action) {
            state.singersList = [...state.singersList, ...action.payload];
            state.listOffset = state.singersList.length;
            return {...state};
        }
    }
}
