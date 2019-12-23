import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import {debounce} from '@/utils/index';
import styles from './index.less';

const Scroll = forwardRef(
    (props, ref) => {
        const [bScroll, setBScroll] = useState();
        const scrollContaninerRef = useRef();
        const {direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom} = props;
        const {pullUp, pullDown, onScroll} = props;

        let pullUpDebounce = useMemo(() => {
            return debounce(pullUp, 300);
        }, [pullUp]);

        let pullDownDebounce = useMemo(() => {
            return debounce(pullDown, 300);
        }, [pullDown]);


        useEffect(() => {
            const scroll = new BScroll(scrollContaninerRef.current, {
                scrollX: direction === 'horizental',
                scrollY: direction === 'vertical',
                probeType: 3,
                click: click,
                bounce: {
                    top: bounceTop,
                    bottom: bounceBottom
                }
            });

            setBScroll(scroll);
            return () => {
                setBScroll(null);
            }
        }, []);
        // 给实例绑定 scroll 事件，
        useEffect(() => {
            if (!bScroll || !onScroll) return;
            bScroll.on('scroll', (scroll) => {
                onScroll(scroll);
            });
            return () => {
                bScroll.off('scroll');
            }
        }, [onScroll, bScroll]);

        // 进行上拉到底的判断，调用上拉刷新的函数
        useEffect(() => {
            if (!bScroll || !pullUp) return;
            bScroll.on('scrollEnd', () => {
                //判断是否滑动到了底部
                if (bScroll.y < bScroll.maxScrollY + 100) {
                    pullUpDebounce();
                }
            });

            return () => {
                bScroll.off('scrollEnd');
            }
        }, [pullUp, pullUpDebounce, bScroll]);

        // 进行下拉的判断，调用下拉刷新的函数
        useEffect(() => {
            if (!bScroll || !pullDown) return;
            bScroll.on('touchEnd', pos => {
                if (pos.y > 50) {
                    pullDownDebounce();
                }
            });
            return () => {
                bScroll.off('touchEnd');
            }
        }, [pullDown, pullDownDebounce, bScroll]);

        useEffect(() => {
            if (refresh && bScroll) {
                bScroll.refresh();
            }
        });

        useImperativeHandle(ref, () => ({
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

        // const pullUpdisplayStyle = pullUpLoading ? {display: ""} : {display: "none"};

        // const pullDowndisplayStyle = pullDownLoading ? {display: ""} : {display: "none"};

        return (

            <div className={styles.ScrollContainer} ref={scrollContaninerRef}>
                {props.children}
                {/* 滑到底部加载动画 */}
                {/* <PullUpLoading style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading> */}
                {/* 顶部下拉刷新动画 */}
                {/* <PullDownLoading style={PullDowndisplayStyle}><Loading2></Loading2></PullDownLoading> */}
            </div>
        )
    }
)


Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),// 滚动的方向
    click: true, // 是否支持点击
    refresh: PropTypes.bool, // 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func, // 上拉加载逻辑
    pullDown: PropTypes.func, // 下拉加载逻辑
    pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool, // 是否支持向上吸顶
    bounceBottom: PropTypes.bool // 是否支持向下吸底
};

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

export default React.memo(Scroll)

