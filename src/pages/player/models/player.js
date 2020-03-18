import {playMode} from '@/config/index';

export default {
    namespace: 'player',
    state: {
        // 播放器是否为全屏模式
        fullScreen: false,
        // 当前歌曲是否播放
        playing: false,
        // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
        sequencePlayList: [],
        playList: [],
        // 播放模式
        mode: playMode.sequence,
        // 当前歌曲在播放列表的索引位置
        currentIndex: -1,
        // 是否展示播放列表
        speed: '',
        showPlayList: false,
        currentSong: {}
    },
    effects: {
        // *fetchAlbumDetail({payload}, {call, put}) {
        //     const response = yield call(getAlbumDetailRequest, payload);

        //     yield put({
        //         type: 'saveAlbumDetail',
        //         payload: response.playlist
        //     })
        // }
    },
    reducers: {
        saveCurrentSong(state, action) {
            state.currentSong = action.payload;
            return {...state};
        },
        saveFullScreen(state, action) {
            state.fullScreen = action.payload;
            return {...state};
        },
        savePlayState(state, action) {
            state.playing = action.payload;
        },
        saveSequencePlayList(state, action) {
            state.sequencePlayList = action.payload;
        },
        savePlayList(state, action) {
            state.playList = action.payload;
        },
        savePlayMode(state, action) {
            state.mode = action.payload;
        },
        saveCurrentIndex(state, action) {
            state.currentIndex = action.payload;
        },
        saveShowPlayList(state, action) {
            state.showPlayList = action.payload;
        }

    }
}
