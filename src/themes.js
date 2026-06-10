import { createTheme } from '@mui/material/styles'
import { grey, blueGrey, orange } from '@mui/material/colors'

const TR = 'background-color 0.32s cubic-bezier(0.4,0,0.2,1), color 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s cubic-bezier(0.4,0,0.2,1)'

const chip = (extra = {}) => ({
  defaultProps: { variant: 'outlined', size: 'small' },
  styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, borderRadius: 3, ...extra } },
})

function comp(overrides = {}) {
  return {
    MuiPaper:        { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiChip:         chip(),
    MuiAlert:        { defaultProps: { variant: 'outlined' } },
    MuiTableCell:    { styleOverrides: { head: { fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' } } },
    MuiTab:          { styleOverrides: { root: { fontWeight: 600, fontSize: '12px' } } },
    MuiToggleButton: { styleOverrides: { root: { fontWeight: 600, fontSize: '11px', textTransform: 'none' } } },
    ...overrides,
  }
}

const sem = {
  error:   { main: '#A1524A' },
  warning: { main: '#8A6830' },
  success: { main: '#3D7A5A' },
}
const semDark = {
  error:   { main: '#E09090' },
  warning: { main: '#D4AA6A' },
  success: { main: '#7ABFA0' },
}


// ════════════════════════════════════════════════════
// 1. KT — Corporate clean
// ════════════════════════════════════════════════════
export const ktTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#C8001A', light: '#E8445A', dark: '#8C0012', contrastText: '#fff' },
    secondary:  { main: blueGrey[400] },
    ...sem,
    background: { default: grey[50], paper: '#FFFFFF' },
    text:       { primary: grey[900], secondary: blueGrey[500], disabled: grey[400] },
    divider:    grey[200],
  },
  shape: { borderRadius: 4 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: comp(),
})
ktTheme.dashboard = {
  bodyBg: grey[50],
  headerBg: grey[900],
  headerAccent: '#C8001A',
  paperSx: { background: '#FFFFFF', border: `1px solid ${grey[200]}`, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 2. Neubrutalism
// ════════════════════════════════════════════════════
export const brutalTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#000000', light: grey[700], dark: '#000000', contrastText: '#fff' },
    secondary:  { main: grey[700] },
    ...sem,
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    text:       { primary: '#000000', secondary: grey[600], disabled: grey[400] },
    divider:    '#000000',
  },
  shape: { borderRadius: 0 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif", fontWeightBold: 900 },
  components: comp({
    MuiPaper:        { styleOverrides: { root: { backgroundImage: 'none', borderRadius: '0 !important' } } },
    MuiChip:         { defaultProps: { variant: 'filled', size: 'small' }, styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, borderRadius: 0, border: '1.5px solid #000' } } },
    MuiToggleButton: { defaultProps: { disableRipple: true }, styleOverrides: { root: { fontWeight: 800, fontSize: '11px', textTransform: 'none', borderRadius: '0 !important' } } },
    MuiTab:          { styleOverrides: { root: { fontWeight: 800, fontSize: '12px' } } },
  }),
})
brutalTheme.dashboard = {
  bodyBg: '#FFFFFF',
  headerBg: '#000000',
  headerAccent: '#000000',
  paperSx: {
    background: '#FFFFFF',
    borderRadius: '0 !important',
    border: '2px solid #000000',
    boxShadow: '4px 4px 0px #000000',
    transition: TR + ', transform 0.1s ease',
    '&:hover': { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0px #000000' },
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 3. Glassmorphism — frosted glass
//    navy 배경 (보라 아님), 흰 텍스트 충분한 대비
// ════════════════════════════════════════════════════
export const glassTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#93C5FD', light: '#BFDBFE', dark: '#3B82F6', contrastText: '#000' },
    secondary:  { main: '#A5F3FC' },
    ...semDark,
    background: { default: '#0F2847', paper: 'rgba(255,255,255,0.08)' },
    text:       { primary: '#FFFFFF', secondary: 'rgba(255,255,255,0.75)', disabled: 'rgba(255,255,255,0.4)' },
    divider:    'rgba(255,255,255,0.12)',
  },
  shape: { borderRadius: 6 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: comp(),
})
glassTheme.dashboard = {
  bodyBg: '#0F2847',
  headerBg: 'rgba(255,255,255,0.06)',
  headerAccent: '#93C5FD',
  paperSx: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 4. Neumorphism (Soft UI)
//    headerBg = 어두운 색 → 흰 텍스트 읽힘
// ════════════════════════════════════════════════════
export const softTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#5B8DEF', light: '#85AAFF', dark: '#3A68C4', contrastText: '#fff' },
    secondary:  { main: blueGrey[400] },
    ...sem,
    background: { default: '#E0E5EC', paper: '#E0E5EC' },
    text:       { primary: '#2C3A4A', secondary: '#5C6B7A', disabled: '#9AAABB' },
    divider:    '#C8D0DA',
  },
  shape: { borderRadius: 6 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: comp(),
})
softTheme.dashboard = {
  bodyBg: '#E0E5EC',
  headerBg: '#2C3A4A',          // 어두운 헤더 → 흰 텍스트 가독성 확보
  headerAccent: '#5B8DEF',
  paperSx: {
    background: '#E0E5EC',
    border: 'none',
    boxShadow: '5px 5px 10px #b8bec7, -5px -5px 10px #ffffff',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 5. Claymorphism
//    bodyBg = 중립 연회색 (보라 아님), 카드만 clay 처리
// ════════════════════════════════════════════════════
export const clayTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#7C5CFC', light: '#A990FD', dark: '#5A3DD4', contrastText: '#fff' },
    secondary:  { main: '#FC5C7D' },
    ...sem,
    background: { default: '#F3F2F8', paper: '#FFFFFF' },
    text:       { primary: '#1A1030', secondary: '#5A5070', disabled: '#ABA8C0' },
    divider:    '#E0DCF0',
  },
  shape: { borderRadius: 6 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: comp(),
})
clayTheme.dashboard = {
  bodyBg: '#F3F2F8',            // 거의 회색 — 보라 아님
  headerBg: '#1A1030',
  headerAccent: '#A990FD',
  paperSx: {
    background: '#FFFFFF',
    borderRadius: '14px !important',
    border: '1px solid rgba(255,255,255,0.95)',
    boxShadow: '0 12px 32px rgba(124,92,252,0.15), inset 0 1px 6px rgba(255,255,255,0.9)',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 6. Terminal — Hacker
// ════════════════════════════════════════════════════
export const terminalTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#00FF41', light: '#66FF80', dark: '#00CC33', contrastText: '#000' },
    secondary:  { main: '#00CC33' },
    error:      { main: '#FF5555' },
    warning:    { main: '#FFBB00' },
    success:    { main: '#00FF41' },
    background: { default: '#0C0C0C', paper: '#0C0C0C' },
    text:       { primary: '#00FF41', secondary: 'rgba(0,255,65,0.65)', disabled: 'rgba(0,255,65,0.35)' },
    divider:    'rgba(0,255,65,0.18)',
  },
  shape: { borderRadius: 2 },
  typography: { fontFamily: "'JetBrains Mono', 'Courier New', monospace" },
  components: comp({
    MuiChip: { defaultProps: { variant: 'outlined', size: 'small' }, styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, borderRadius: 2 } } },
  }),
})
terminalTheme.dashboard = {
  bodyBg: '#0C0C0C',
  headerBg: '#050505',
  headerAccent: '#00FF41',
  paperSx: {
    background: '#0C0C0C',
    border: '1px solid rgba(0,255,65,0.25)',
    boxShadow: '0 0 10px rgba(0,255,65,0.06)',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 7. Y2K Neon
//    text.secondary 더 밝게 → 가독성 확보
// ════════════════════════════════════════════════════
export const neonTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:    { main: '#FF00FF', light: '#FF66FF', dark: '#CC00CC', contrastText: '#fff' },
    secondary:  { main: '#00FFFF' },
    error:      { main: '#FF4466' },
    warning:    { main: '#FFCC00' },
    success:    { main: '#00FFAA' },
    background: { default: '#08001F', paper: '#10003A' },
    text:       { primary: '#F5EEFF', secondary: '#C0A8E8', disabled: '#604880' },
    divider:    'rgba(255,0,255,0.18)',
  },
  shape: { borderRadius: 4 },
  typography: { fontFamily: "'JetBrains Mono', -apple-system, sans-serif" },
  components: comp({
    MuiChip: { defaultProps: { variant: 'outlined', size: 'small' }, styleOverrides: { root: { fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 600, borderRadius: 3 } } },
  }),
})
neonTheme.dashboard = {
  bodyBg: '#08001F',
  headerBg: '#10003A',
  headerAccent: '#FF00FF',
  paperSx: {
    background: '#10003A',
    border: '1px solid rgba(255,0,255,0.3)',
    boxShadow: '0 0 8px rgba(255,0,255,0.15)',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 8. Pixel Art
// ════════════════════════════════════════════════════
export const pixelTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#1565C0', light: '#5E92F3', dark: '#003c8f', contrastText: '#fff' },
    secondary:  { main: '#1565C0' },
    ...sem,
    background: { default: '#E8E5DC', paper: '#F0EDE6' },
    text:       { primary: '#1A1A2E', secondary: '#555577', disabled: '#9999AA' },
    divider:    '#C8C5BA',
  },
  shape: { borderRadius: 0 },
  typography: { fontFamily: "'Pixelify Sans', 'Courier New', monospace" },
  components: comp({
    MuiPaper:        { styleOverrides: { root: { backgroundImage: 'none', borderRadius: '0 !important' } } },
    MuiChip:         { defaultProps: { variant: 'filled', size: 'small' }, styleOverrides: { root: { fontFamily: "'Pixelify Sans', monospace", fontSize: '9px', fontWeight: 700, borderRadius: 2 } } },
    MuiToggleButton: { styleOverrides: { root: { fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: '11px', textTransform: 'none', borderRadius: '0 !important' } } },
    MuiTab:          { styleOverrides: { root: { fontFamily: "'Pixelify Sans', monospace", fontWeight: 700, fontSize: '12px' } } },
  }),
})
pixelTheme.dashboard = {
  bodyBg: '#E8E5DC',
  headerBg: '#1A1A2E',
  headerAccent: '#5E92F3',
  paperSx: {
    background: '#F0EDE6',
    borderRadius: '0 !important',
    border: 'none',
    boxShadow: 'inset -2px -2px 0 #B8B5AC, inset 2px 2px 0 #FFFFFF, 3px 3px 0 #9A9790',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 9. Minimal Ink
// ════════════════════════════════════════════════════
export const minimalTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#1A1A1A', light: '#555555', dark: '#000000', contrastText: '#fff' },
    secondary:  { main: '#666666' },
    ...sem,
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    text:       { primary: '#111111', secondary: '#777777', disabled: '#C0C0C0' },
    divider:    'rgba(0,0,0,0.09)',
  },
  shape: { borderRadius: 2 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif", fontWeightRegular: 300 },
  components: comp({
    MuiToggleButton: { styleOverrides: { root: { fontWeight: 400, fontSize: '11px', textTransform: 'none' } } },
  }),
})
minimalTheme.dashboard = {
  bodyBg: '#FFFFFF',
  headerBg: '#111111',
  headerAccent: '#111111',
  paperSx: {
    background: '#FFFFFF',
    border: '0.5px solid rgba(0,0,0,0.1)',
    boxShadow: 'none',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 10. Warm Sand
// ════════════════════════════════════════════════════
export const sandTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: orange[800], light: orange[500], dark: orange[900], contrastText: '#fff' },
    secondary:  { main: orange[600] },
    ...sem,
    background: { default: '#FDF6EE', paper: '#FFFDF8' },
    text:       { primary: '#1C1008', secondary: blueGrey[400], disabled: grey[400] },
    divider:    '#EDE0D0',
  },
  shape: { borderRadius: 4 },
  typography: { fontFamily: "'Inter', -apple-system, sans-serif" },
  components: comp(),
})
sandTheme.dashboard = {
  bodyBg: '#FDF6EE',
  headerBg: '#1C1008',
  headerAccent: orange[500],
  paperSx: { background: '#FFFDF8', border: '1px solid #EDE0D0', boxShadow: '0 1px 4px rgba(28,16,8,0.06)' },
  transition: TR,
}


// ════════════════════════════════════════════════════
// 11. Pipeline — ai-pipeline-kit 팔레트 재현
//     검정 외부 프레임 + 따뜻한 크림 카드 + 틸 그린
//     출처: /Users/sy/Projects/ai-pipeline-kit/runs/latest/outputs/06_dashboard.html
// ════════════════════════════════════════════════════
export const pipelineTheme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#35c995', light: '#5fdba8', dark: '#1fa876', contrastText: '#fff' },
    secondary:  { main: '#efb05d' },
    error:      { main: '#c85a64' },
    warning:    { main: '#efb05d' },
    success:    { main: '#35c995' },
    background: { default: '#FAF6F0', paper: '#FAF6F0' },
    text:       { primary: '#2f2b27', secondary: '#766c63', disabled: '#b0a898' },
    divider:    'rgba(96,79,67,0.14)',
  },
  shape: { borderRadius: 6 },
  typography: { fontFamily: "'Barlow', 'Inter', -apple-system, sans-serif" },
  components: comp({
    MuiChip: chip({ fontFamily: "'JetBrains Mono', monospace" }),
  }),
})
pipelineTheme.dashboard = {
  bodyBg: '#0C0A08',
  headerBg: '#0C0A08',
  headerAccent: '#35c995',
  paperSx: {
    background: '#FAF6F0',
    border: '1px solid rgba(96,79,67,0.14)',
    boxShadow: '0 12px 40px rgba(42,30,18,0.1)',
  },
  transition: TR,
}


// ════════════════════════════════════════════════════
export const THEMES = {
  kt:       { theme: ktTheme,       label: 'KT' },
  brutal:   { theme: brutalTheme,   label: 'Brutal' },
  glass:    { theme: glassTheme,    label: 'Glass' },
  soft:     { theme: softTheme,     label: 'Soft UI' },
  clay:     { theme: clayTheme,     label: 'Clay' },
  terminal: { theme: terminalTheme, label: 'Terminal' },
  neon:     { theme: neonTheme,     label: 'Neon' },
  pixel:    { theme: pixelTheme,    label: 'Pixel' },
  minimal:  { theme: minimalTheme,  label: 'Minimal' },
  sand:     { theme: sandTheme,     label: 'Sand' },
  pipeline: { theme: pipelineTheme, label: 'Pipeline' },
}
