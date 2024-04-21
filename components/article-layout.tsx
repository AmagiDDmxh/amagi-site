import { useEffect, useMemo, type ReactNode } from "react";
import { BasicLayout } from "./basic-layout";
import { useBlogContext } from "./blog-context";
import { MDXTheme } from "./mdx-theme";
import Meta from "./meta";
import { useAudioPlayer } from "./(audio)/audio-provider";

export const ArticleLayout = ({ children }: { children: ReactNode }) => {
  const { config, opts } = useBlogContext();
  // const { frontMatter } = opts;
  // const playerData = useMemo(
  //   () => ({
  //     title: opts.title,
  //     link: opts.route,
  //     audio: frontMatter.audio.url
  //       ? {
  //           src: `/${frontMatter.audio.url}`,
  //         }
  //       : undefined,
  //   }),
  //   [frontMatter.audio.url, opts.route, opts.title]
  // );
  // const player = useAudioPlayer(playerData);

  // useEffect(() => {
    // if (frontMatter.audio?.url && !player.playing) {
    //   player.play();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [frontMatter?.audio, player.playing, player.meta]);

  return (
    <BasicLayout>
      <Meta />
      <MDXTheme>
        {children}
        {config.postFooter}
        {config.comments}
      </MDXTheme>
    </BasicLayout>
  );
};
