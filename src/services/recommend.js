import {stringify} from 'qs';
import request from '@/utils/request'

// export async function query() {
//     return request('/api/users');
// }

export async function getBannerList() {
    return request('/banner');
}

export async function getRecommendList() {
    return request('/personalized');
}

// post 请求示例：
// export async function updateRule(params = {}) {
//     return request(`/api/rule?${stringify(params.query)}`, {
//         method: 'POST',
//         data: {
//             ...params.body,
//             method: 'update',
//         },
//     });
// }

