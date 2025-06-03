import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import type { RuleSetRule } from 'webpack'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      }
    }

    // Configuración para PostCSS y Tailwind
    if (config.module?.rules) {
      const cssRule = config.module.rules.find(
        (rule): rule is RuleSetRule => 
          rule !== '...' && 
          typeof rule !== 'string' && 
          rule !== false && 
          rule !== '' && 
          rule !== 0 &&
          rule.test instanceof RegExp && 
          rule.test.toString().includes('css')
      )

      if (cssRule) {
        cssRule.use = [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js'),
              },
            },
          },
        ]
      }
    }

    return config
  },
}

export default config