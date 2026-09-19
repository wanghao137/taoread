/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * 「纸与桃」设计语言（docs/23，参照 claude.com/product/cowork 的暖编辑风）：
         * 暖米白纸感底色 + 赤陶橙单强调 + 墨色正文 + 细线边框。
         * 睡前适配：全程无蓝光波长（暖白/赤陶/琥珀），亮度可由阅读器夜间主题进一步压低。
         */
        paper: {
          100: '#FAF9F5', // 应用底：暖米白
          200: '#F5F3EC', // 卡片底：浅奶油
          300: '#EFEBE0', // 内嵌区/输入底
          border: '#E5E1D5', // 细线边框
          'border-strong': '#D6D1C2',
        },
        ink: {
          900: '#1F1E1B', // 主文字：暖黑
          700: '#54524B', // 次级文字
          500: '#8A877C', // 辅助文字/占位
          300: '#C9C5B8', // 禁用/极浅
        },
        terra: {
          50: '#FBF1EB', // 强调浅底（徽章/选中态）
          100: '#F6E2D6',
          300: '#E89B7D',
          500: '#D97757', // 主强调：赤陶橙（CTA/选中/进度）
          600: '#C15F3C', // hover/按下
          700: '#A34E30',
        },
        /** 插画辅色：牛皮纸黄与杏色，只用于装饰层，不参与按钮 */
        kraft: {
          300: '#EBCFA8',
          400: '#D4A27F',
          500: '#B9835C',
        },
        moss: {
          500: '#7A8A5A', // 成功/完成（低饱和橄榄绿，不刺眼）
          100: '#EEF0E4',
        },
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.75rem',
      },
      boxShadow: {
        /** Cowork 风：边框承担结构，阴影只做一层极轻的浮起 */
        card: '0 1px 2px rgba(31,30,27,0.05)',
        lift: '0 8px 24px rgba(31,30,27,0.08)',
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
        /** 衬线展示字体：标题/大字（编辑排版气质） */
        display: [
          'Tiempos Headline',
          'Georgia',
          'Source Han Serif SC',
          'Songti SC',
          'SimSun',
          'serif',
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
