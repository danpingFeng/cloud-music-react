import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo} from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from 'styled-components';
import {debounce} from '../../utils/utils';
import Loading from '../loading-v1/index';
import Loading2 from '../loading-v2/index';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left:0;
  right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left:0;
  right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

// forwardRef 接收父组件传递过来的ref
const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState();
    // current 指向初始化 bs 实例需要的 DOM 元素
    const scrollContaninerRef = useRef();
    const {direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom} = props;

    console.log('scroll', pullUpLoading);
    // 上拉加载、下拉刷新 和 滚动请求 的函数
    const {pullUp, pullDown, onScroll} = props;

    // 对函数做节流处理
    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp])

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 300)
    }, [pullDown])

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,  // 是否支持向上吸顶
                bottom: bounceBottom  // 是否支持吸底
            }
        });
        setBScroll(scroll);
        return () => {
            setBScroll(null);
        }
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!bScroll || !onScroll) return;
        // 绑定事件，监听滚动的位置，scroll 为position，回传给父组件
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll]);

    useEffect(() => {
        if (!bScroll || !pullUp) return;
        // 滚动结束时触发
        bScroll.on('scrollEnd', () => {
            // 判断是否滑动到了底部, 触发上拉加载
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                // pullUp(); 防抖处理，此处应用节流
                pullUpDebounce();
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUp, pullUpDebounce, bScroll]);

    useEffect(() => {
        if (!bScroll || !pullDown) return;
        bScroll.on('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                // pullDown();
                pullDownDebounce();
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [pullDown, pullDownDebounce, bScroll]);


    useEffect(() => {
        // 每次re-render都要更新scroll,保证正确的渲染状态，
        // 当 DOM 结构发生变化的时候务必要调用refresh()确保滚动的效果正常，重新渲染高度
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });

    // 利用 useImperativeHandle 暴露给外界方法，一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
    useImperativeHandle(ref, () => ({
        // refresh 方法暴露给外界，给外界提供刷新Scroll的接口
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }));

    const PullUpdisplayStyle = pullUpLoading ? {display: ""} : {display: "none"};
    const PullDowndisplayStyle = pullDownLoading ? {display: ""} : {display: "none"};

    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}

            {/* 滑到底部加载动画 */}
            <PullUpLoading style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading>

            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={PullDowndisplayStyle}><Loading2></Loading2></PullDownLoading>

        </ScrollContainer>
    );
})

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;