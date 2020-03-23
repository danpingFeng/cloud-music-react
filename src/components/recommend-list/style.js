import styled from 'styled-components';
export const ListWrapper = styled.div`
    .title {
        font-weight: 700;
        padding-left: 6px;
        font-size: 14px;
        line-height: 40px;
        // color: #d44439;
        text-align: left;
    }
`
export const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: pink;
    justify-content: space-around;
`

export const ListItem = styled.div`
    width: 32%;
    position: relative;

    .img-wrapper {
        img {
            border-radius: 6px;
        }

        .decorate {
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        }
    }

    .playCount {
        position: absolute;
        // background: red;
        top: 2px;
        right: 2px;
        line-height: 15px;

        span {
            font-size: 12px;
            vertical-align: top;
            color: #fff;
            font-weight: 400;
            letter-spacing: 1px;
            margin-left: 2px;
        }
    }

    // todo 多余2行省略
    .desc {
        font-size: 12px;
        color: #2E3030;
        line-height: 16px;
        margin-bottom: 20px;
        text-align: left;

        overflow: hidden;  /** 隐藏超出的内容 **/
        word-break: break-all;
        text-overflow: ellipsis; /** 多行 **/
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 2; /** 显示的行数 **/
    }

`
