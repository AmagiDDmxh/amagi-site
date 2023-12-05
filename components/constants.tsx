import type { NextraBlogTheme } from 'nextra-theme-blog'

export const DEFAULT_THEME: NextraBlogTheme = {
  footer: (
    <small className="block">
      CC BY-NC 4.0 {new Date().getFullYear()} © Amagi.
    </small>
  ),
  readMore: 'Read More →'
}
