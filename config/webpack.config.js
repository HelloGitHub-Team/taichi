const path = require('path');

// 该配置没有实际用途，仅供WebStorm识别
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
