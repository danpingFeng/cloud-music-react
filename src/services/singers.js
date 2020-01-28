import request from '@/utils/request';
export async function getHotSingersList(count) {
    return request(`/top/artists?offset=${count}`);
}

export async function getSingersList(category, alpha, listOffset) {
    return request(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${listOffset}`);
}

export async function getSingerInfo(id) {
    return request(`/artists?id=${id}`);
}


