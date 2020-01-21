import request from '@/utils/request';

export async function getAlbumDetailRequest(id) {
    return request(`/playlist/detail?id=${id}`);
}


