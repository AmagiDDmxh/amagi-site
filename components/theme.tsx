import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import type { NextraThemeLayoutProps } from "nextra/types";
import type { LayoutProps } from "nextra-theme-blog";
import { ArticleLayout } from "./article-layout";
import { BlogProvider } from "./blog-context";
import { DEFAULT_THEME } from "./constants";
import { PageLayout } from "./page-layout";
import { PostsLayout } from "./posts-layout";
import { AudioProvider } from "./(audio)/audio-provider";
// import { AudioPlayer } from "./(audio)/audio-player";

const layoutMap = {
  post: ArticleLayout,
  page: PageLayout,
  posts: PostsLayout,
  tag: PostsLayout,
};

const BlogLayout = ({
  config,
  children,
  opts,
}: LayoutProps & { children: ReactNode }): ReactElement => {
  const type = opts.frontMatter.type || "post";
  const Layout = layoutMap[type as keyof typeof layoutMap];
  if (!Layout) {
    throw new Error(
      `nextra-theme-blog does not support the layout type "${type}" It only supports "post", "page", "posts" and "tag"`
    );
  }
  return (
    <BlogProvider opts={opts} config={config}>
      <Layout>{children}</Layout>
    </BlogProvider>
  );
};

export default function Layout({
  children,
  ...context
}: NextraThemeLayoutProps) {
  const extendedConfig = { ...DEFAULT_THEME, ...context.themeConfig };

  return (
    <AudioProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BlogLayout config={extendedConfig} opts={context.pageOpts}>
          {children}
        </BlogLayout>
        {/* <div className="fixed inset-x-0 bottom-0 z-10">
          <AudioPlayer />
        </div> */}
      </ThemeProvider>
    </AudioProvider>
  );
}

export { useTheme } from "next-themes";
export { getStaticTags } from "@/lib/get-tags";
export { useBlogContext } from "./blog-context";
