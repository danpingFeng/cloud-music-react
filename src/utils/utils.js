export const getCount = count => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}

export function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            clearTimeout(timer);
        }, delay);
    }
}

export function findIndex(list) {
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i].tracks.length && !list[i + 1].tracks.length) {
            return i + 1;
        }
    }
}

export function getName(list) {
    let str = "";
    list.map((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        return item;
    });
    return str;
}

export function isEmptyObj(obj) {
    return !obj || Object.keys(obj).length === 0;
}

