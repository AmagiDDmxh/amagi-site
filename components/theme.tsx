import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import type { NextraThemeLayoutProps } from 'nextra/types'
import type { LayoutProps } from 'nextra-theme-blog'
import { ArticleLayout } from './article-layout'
import { BlogProvider } from './blog-context'
import { DEFAULT_THEME } from './constants'
import { PageLayout } from './page-layout'
import { PostsLayout } from './posts-layout'

const layoutMap = {
  post: ArticleLayout,
  page: PageLayout,
  posts: PostsLayout,
  tag: PostsLayout
}

const BlogLayout = ({
  config,
  children,
  opts
}: LayoutProps & { children: ReactNode }): ReactElement => {
  const type = opts.frontMatter.type || 'post'
  const Layout = layoutMap[type as keyof typeof layoutMap]
  if (!Layout) {
    throw new Error(
      `nextra-theme-blog does not support the layout type "${type}" It only supports "post", "page", "posts" and "tag"`
    )
  }
  return (
    <BlogProvider opts={opts} config={config}>
      <Layout>{children}</Layout>
    </BlogProvider>
  )
}

export default function Layout({
  children,
  ...context
}: NextraThemeLayoutProps) {
  const extendedConfig = { ...DEFAULT_THEME, ...context.themeConfig }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BlogLayout config={extendedConfig} opts={context.pageOpts}>
        {children}
      </BlogLayout>
    </ThemeProvider>
  )
}

export { useTheme } from 'next-themes'
export { getStaticTags } from '@/lib/get-tags'
export { useBlogContext } from './blog-context'
