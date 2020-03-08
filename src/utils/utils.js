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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(arr) {
    let new_arr = [];
    arr.forEach(item => new_arr.push(arr));
    for (let i = 0; i < new_arr.length; i++) {
        let j = getRandomInt(0, i);
        let t = new_arr[i];
        new_arr[i] = new_arr[j];
        new_arr[j] = t;
    }
    return new_arr;
}

// export function findIndex(song, list) {
//     return list.findIndex(item => song.id === item.id)
// }

export function getSongUrl(id) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement("div").style;

let vendor = (() => {
    //首先通过transition属性判断是何种浏览器
    let transformNames = {
        webkit: "webkitTransform",
        Moz: "MozTransform",
        O: "OTransfrom",
        ms: "msTransform",
        standard: "Transform"
    };
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();
export function prefixStyle(style) {
    if (vendor === false) {
        return false;
    }
    if (vendor === "standard") {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
//转换歌曲播放时间
export const formatPlayTime = interval => {
    interval = interval | 0;
    const minute = (interval / 60) | 0;
    const second = (interval % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
};

export const getTransitionEndName = dom => {
    let cssTransition = ["transition", "webkitTransition"];
    let transitionEnd = {
        transition: "transitionend",
        webkitTransition: "webkitTransitionEnd"
    };
    for (let i = 0; i < cssTransition.length; i++) {
        if (dom.style[cssTransition[i]] !== undefined) {
            return transitionEnd[cssTransition[i]];
        }
    }
    return undefined;
};

//除去手机号码的空格符号
export const trimPhone = val => val.replace(/(^\s+)|(\s+$)|\s+/g, "");
