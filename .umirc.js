
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'cloud-music-react2',
      dll: false,
      
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}
