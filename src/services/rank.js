import request from '@/utils/request'

export async function getRankList() {
    return request('/toplist/detail');
}
