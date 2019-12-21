import React from 'react';
import styles from './index.css';

// 全局路由
function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Header</h1>
      {props.children}
    </div>
  );
}

export default React.memo(BasicLayout);
