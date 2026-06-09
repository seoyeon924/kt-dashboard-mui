import { createTheme } from '@mui/material/styles'

// ══════════════════════════════════════════
// 이 파일이 전부입니다.
// 아래 3개의 createTheme() 값만 바꾸면
// 전체 UI가 자동으로 바뀝니다.
// ══════════════════════════════════════════

const monoFont = { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600 }
const commonComponents = {
  MuiPaper:     { styleOverrides: { root: { backgroundImage: 'none' } } },
  MuiChip:      { styleOverrides: { root: monoFont } },
  MuiTableCell: { styleOverrides: { head: { fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' } } },
  MuiTab:       { styleOverrides: { root: { fontWeight: 600, fontSize: '13px' } } },
  MuiToggleButton: { styleOverrides: { root: { fontWeight: 600, fontSize: '12px', textTransform: 'none' } } },
}

// ── Theme 1: KT Seamless Flow (Light / KT Red) ──
export const ktSeamlessFlow = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#E6001F', light: '#FF8A7A', dark: '#9E0015', contrastText: '#fff' },
    secondary:  { main: '#1B6B4A' },
    error:      { main: '#C62828' },
    warning:    { main: '#C45200' },
    success:    { main: '#1B6B4A' },
    background: { default: '#F5F4F2', paper: '#FFFFFF' },
    text:       { primary: '#1A1916', secondary: '#6B675E', disabled: '#CBC8C2' },
    divider:    '#E7E5E2',
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: commonComponents,
})

// ── Theme 2: Dark Warm (Original Dashboard Feel) ──
export const darkWarm = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#4fb799', light: '#35c995', dark: '#2a7a65', contrastText: '#fff' },
    secondary:  { main: '#efb05d' },
    error:      { main: '#ef7d86' },
    warning:    { main: '#efb05d' },
    success:    { main: '#35c995' },
    background: { default: '#0a0a0a', paper: '#1c1914' },
    text:       { primary: '#f0ebe4', secondary: '#9a9086', disabled: '#504844' },
    divider:    'rgba(110,93,80,0.2)',
  },
  shape: { borderRadius: 14 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: commonComponents,
})

// ── Theme 3: Ocean Blue (Corporate Enterprise) ──
export const oceanBlue = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#0057A8', light: '#4A8FD6', dark: '#003975', contrastText: '#fff' },
    secondary:  { main: '#00897B' },
    error:      { main: '#C62828' },
    warning:    { main: '#E65100' },
    success:    { main: '#2E7D32' },
    background: { default: '#EEF2F7', paper: '#FFFFFF' },
    text:       { primary: '#0A1929', secondary: '#546E7A', disabled: '#B0BEC5' },
    divider:    '#E3EAF2',
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: commonComponents,
})

export const THEMES = {
  kt:    { theme: ktSeamlessFlow, label: 'KT Seamless Flow' },
  dark:  { theme: darkWarm,       label: 'Dark Warm' },
  ocean: { theme: oceanBlue,      label: 'Ocean Blue' },
}
