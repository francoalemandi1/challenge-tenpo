import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import type { RuleSetRule } from 'webpack'

interface PostcssLoaderOptions {
  postcssOptions: {
    config: string
  }
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: true,
  },
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      }
    }

    // Configuración para PostCSS y Tailwind
    if (config.module?.rules) {
      const rules = config.module.rules as RuleSetRule[]
      const cssRule = rules.find(rule => rule.test instanceof RegExp && rule.test.test('.css'))

      if (cssRule && cssRule.use && Array.isArray(cssRule.use)) {
        const postcssLoader = cssRule.use.find(
          (loader): loader is { loader: string; options: PostcssLoaderOptions } =>
            typeof loader === 'object' &&
            loader !== null &&
            'loader' in loader &&
            typeof loader.loader === 'string' &&
            loader.loader.includes('postcss-loader')
        )

        if (postcssLoader) {
          postcssLoader.options = {
            ...postcssLoader.options,
            postcssOptions: {
              config: path.resolve(__dirname, './postcss.config.js'),
            },
          }
        }
      }
    }

    return config
  },
}

export default config
