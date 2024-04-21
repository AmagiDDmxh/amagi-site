import { useTheme } from 'next-themes'
import { useMounted } from 'nextra/hooks'
import { MoonIcon, SunIcon } from 'nextra/icons'

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = resolvedTheme === 'dark'

  // @TODO: system theme
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      className="p-2 group relative rounded-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600 md:order-none"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={e => {
        if (e.key === 'Enter') toggleTheme()
      }}
    >
      {mounted && isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
