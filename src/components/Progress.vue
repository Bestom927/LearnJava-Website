<template>
    <div class="m-progress" :style="`width:${width}px;`">
      <div class="m-progress-outer">
        <div class="m-progress-inner">
          <div :class="['u-progress-bg', {'u-success-bg': progress >= 100}]" :style="`width: ${progress >= 100 ? 100:progress}%; height: ${strokeWidth}px;`"></div>
        </div>
      </div>
      <template v-if="showInfo"></template>
      <svg class="u-success" v-if="progress>=100" viewBox="64 64 896 896" data-icon="check-circle" aria-hidden="true" focusable="false"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>
      <p class="u-progress-text" v-else>{{ progress>=100 ? 100:progress }}%</p>
    </div>
  </template>
  <script>
  export default {
    name: 'Progress',
    props: {
      width: { // 进度条总宽度
        type: Number,
        default: 600
      },
      progress: { // 当前进度
        type: Number,
        default: 36
      },
      strokeWidth: { // 进度条线的宽度
        type: Number,
        default: 8
      },
      showInfo: { // 是否显示进度数值或状态图标
        type: Boolean,
        default: true
      }
    }
  }
  </script>
  <style  scoped>
  .m-progress {
    height: 24px;
    margin: 0 auto;
    display: flex;
  }
  .m-progress-outer {
      width: 100%;

    }
    .m-progress-inner {
        display: inline-block;
        width: 100%;
        background: #f5f5f5;
        border-radius: 100px;

      }
      .u-progress-bg {
          
          background: linear-gradient(to right, rgb(16, 142, 233), rgb(135, 208, 104));
          border-radius: 100px;
          transition: all .3s cubic-bezier(.08,.82,.17,1);
        }
        .u-success-bg {
          background: #52C41A;
        }
    .u-success {
      width: 16px;
      height: 16px;
      fill: #52C41A;
      margin-left: 8px;
      margin-top: 4px;
    }
    .u-progress-text {
      font-size: 16px;
      line-height: 24px;
      margin-left: 8px;
      color: rgba(0,0,0,.45);
    }
  </style>