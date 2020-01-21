import {getAlbumDetailRequest} from '@/services/album';

export default {
    namespace: 'album',
    state: {
        currentAlbum: {},
        enterLoading: {}
    },
    effects: {
        *fetchAlbumDetail({payload}, {call, put}) {
            const response = yield call(getAlbumDetailRequest, payload);

            yield put({
                type: 'saveAlbumDetail',
                payload: response.playlist
            })
        }
    },
    reducers: {
        saveAlbumDetail(state, action) {
            state.currentAlbum = action.payload;
            return {...state};
        }
    }
}
