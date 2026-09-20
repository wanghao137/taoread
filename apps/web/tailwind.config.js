/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * 「贴纸绘本」设计语言（docs/26，参照 codex-resets.com 的暖纸 neobrutalism）：
         * 暖纸底 + 高饱和贴纸色 + 2px 墨线描边 + 硬偏移阴影 + 圆胖字体。
         * 全天候阅读：白天是主场景（阳光黄/天空蓝/蜜桃橙），夜间只是可选模式。
         */
        paper: {
          100: '#FFF4DD', // 应用底：暖纸黄
          200: '#FFFDF7', // 卡片底：奶白
          300: '#FFF0BD', // 内嵌区/高亮纸
          border: '#E8DCC3', // 纸面细线（结构线仍用 ink）
          'border-strong': '#D9CBAE',
        },
        ink: {
          900: '#26201A', // 墨色：文字 + 描边 + 硬阴影
          700: '#5C5347',
          500: '#877B6B',
          300: '#26201A1A', // 点缀墨（10% 透明）
        },
        terra: {
          50: '#FFEFE7',
          100: '#FFD9C9',
          300: '#FFB07A', // 蜜桃橙
          500: '#FF5C2B', // 主强调：橘红（CTA/选中/进度）
          600: '#EE4518', // hover
          700: '#C23A10',
        },
        /** 贴纸色板：章节卡片/徽章/分类色，装饰与分类用，按钮只用 terra */
        sun: { DEFAULT: '#FFD84D', light: '#FFE070', deep: '#675015' },
        rose: { DEFAULT: '#FFB9CC', deep: '#8B3D1F' },
        sky: { DEFAULT: '#A5DCFF', deep: '#1D5A7A' },
        mint: { DEFAULT: '#B9E6A6', deep: '#3D6B2A' },
        peach: { DEFAULT: '#FFB07A', deep: '#8B3D1F' },
        kraft: {
          300: '#F1E3C4', // 空状态纸
          400: '#D4A27F',
          500: '#B9835C',
        },
        moss: {
          500: '#5F8F46', // 成功/完成
          100: '#E4F1D9',
        },
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.75rem',
      },
      borderWidth: {
        ink: '2px', // 墨线描边默认宽度
      },
      boxShadow: {
        /** neobrutalism：实心墨色偏移阴影，按下位移归零（按压感） */
        card: '4px 4px 0 #26201A',
        sm: '3px 3px 0 #26201A',
        xs: '2px 2px 0 #26201A',
        lift: '8px 8px 0 #26201A',
        none: '0 0 0 #26201A',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'PingFang SC',
          'HarmonyOS Sans SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
        /** 圆胖展示体：标题/大字（玩具感、孩子气） */
        display: [
          'Baloo 2',
          'Arial Rounded MT Bold',
          'Yuanti SC',
          'YouYuan',
          '幼圆',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif',
        ],
        /** 楷体：儿童阅读正文（语文课本标准字体，利于识字） */
        kai: ['KaiTi', 'Kaiti SC', 'STKaiti', 'DFKai-SB', 'serif'],
      },
      minHeight: {
        touch: '4rem', // 64px：儿童触达最低标准（docs/03 第 5 夜审查重点）
      },
    },
  },
  plugins: [],
}
