import React, { useState } from 'react'
import {
  ThemeProvider, CssBaseline, useTheme, GlobalStyles,
  Box, Paper, Stack, Grid,
  Tabs, Tab, Typography, Chip,
  Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  ToggleButtonGroup, ToggleButton,
  Alert,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { THEMES } from './themes'

// ── useDash: theme.dashboard 커스텀 토큰 읽기 ──
function useDash() {
  const t = useTheme()
  return t.dashboard || {
    bodyBg: t.palette.background.default,
    headerBg: t.palette.background.paper,
    headerAccent: t.palette.primary.main,
    kpiAlpha: 0.07, kpiBorderAlpha: 0.2,
    storyBg: 'transparent', storyBorder: t.palette.primary.main,
    actionColors: [t.palette.error.main, t.palette.warning.main, t.palette.success.main],
    paperSx: {},
    transition: '',
  }
}

// ── DashCard: theme.dashboard.paperSx를 자동 적용하는 Paper ──
function DashCard({ children, sx = {}, ...props }) {
  const d = useDash()
  return (
    <Paper elevation={0} sx={{ ...d.paperSx, transition: d.transition, ...sx }} {...props}>
      {children}
    </Paper>
  )
}

// ══ 서브컴포넌트 ══

function TopBar({ title, sub, meta }) {
  const d = useDash()
  return (
    <Box sx={{
      background: d.headerBg,
      px: 3, py: 2.5,
      display: 'flex', alignItems: 'flex-end',
      justifyContent: 'space-between', gap: 2,
      borderBottom: `3px solid ${d.headerAccent}`,
    }}>
      <Box>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,.35)', fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', mt: 0.5, letterSpacing: '0.03em' }}>
          {sub}
        </Typography>
      </Box>
      <Typography sx={{ color: 'rgba(255,255,255,.3)', fontSize: '11px', textAlign: 'right', lineHeight: 1.7, flexShrink: 0 }}>
        {meta}
      </Typography>
    </Box>
  )
}

function SecHeader({ tag, label }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 3 }}>
      <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'text.disabled', fontWeight: 700 }}>
        {tag}
      </Typography>
      <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: 'text.secondary' }}>{label}</Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
    </Box>
  )
}

function KPIStrip() {
  const t = useTheme()
  const d = useDash()
  const kpis = [
    { label: '전체 예산 달성률', value: '112.8%', status: '↑ 초과', badge: '목표 ≤105%' },
    { label: 'Sonnet 초과율',   value: '+31.2%', status: '5개월 연속', badge: '초과 지속' },
    { label: 'Gemini 오류율',   value: '5.2%',   status: '↑ 경고',    badge: '기준 2%' },
    { label: '일일 Burn Rate',  value: '$87.4',  status: '/일',        badge: '예산 $66.7' },
    { label: '비용 효율 지수',  value: '6.7×',   status: 'Haiku',      badge: '전환 기회' },
  ]
  return (
    <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
      {kpis.map(({ label, value, status, badge }) => (
        <Grid item xs={6} sm={4} md key={label}>
          <DashCard sx={{ p: 2, '&:hover': { transform: 'none !important' } }}>
            <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'text.secondary', mb: 1 }}>
              {label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, mb: 0.75 }}>
              <Typography sx={{ fontFamily: "'Barlow',sans-serif", fontSize: '24px', fontWeight: 800, color: 'text.primary', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {value}
              </Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary', fontFamily: "'JetBrains Mono',monospace" }}>
                {status}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '10px', color: 'text.disabled', fontFamily: "'JetBrains Mono',monospace" }}>
              {badge}
            </Typography>
          </DashCard>
        </Grid>
      ))}
    </Grid>
  )
}

function StoryBlock() {
  const d = useDash()
  return (
    <DashCard sx={{
      p: 2.5, mb: 2.5,
      '&:hover': { transform: 'none !important' },
    }}>
      <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.disabled', mb: 1 }}>
        Overview · 주요 인사이트
      </Typography>
      <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.8 }}>
        전체 AI 서비스 비용이 예산의 <strong style={{ fontWeight: 700 }}>112.8%</strong>로 5개월 연속 초과 중.
        Claude Sonnet이 5개월 연속 예산 초과하며 전체 초과액의 <strong style={{ fontWeight: 700 }}>72.5% 단독 차지</strong>.
        Gemini Pro 오류율 6개월 새 <strong style={{ fontWeight: 700 }}>4.7배 상승</strong> — 즉각 점검 필요.
        Claude Haiku 30% 전환 시 <strong style={{ fontWeight: 700 }}>월 $682 절감</strong> 가능.
      </Typography>
    </DashCard>
  )
}

function CostChart() {
  const t = useTheme()
  const d = useDash()
  const p = d.headerAccent
  const muted = t.palette.text.secondary
  const div = t.palette.divider
  return (
    <DashCard sx={{ p: 2.5, height: '100%', minHeight: 280 }}>
      <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
        월별 전체 AI 비용 — 2월부터 예산 초과 구조화
      </Typography>
      <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 1 }}>Jan–Jun 2026 총지출 vs 예산 $5,700 (USD)</Typography>
      <svg viewBox="0 0 460 175" style={{ display: 'block', width: '100%', height: 'auto' }}>

        <line x1="50" y1="10" x2="50" y2="148" stroke={div} strokeWidth="1"/>
        <line x1="50" y1="148" x2="448" y2="148" stroke={div} strokeWidth="1"/>
        <line x1="50" y1="70" x2="448" y2="70" stroke={muted} strokeDasharray="5,3" strokeWidth="1.5" opacity=".5"/>
        <text x="450" y="73" fontSize="9" fill={muted}>예산</text>
        {[['$4K',148],['$5.7K',70],['$7K',10]].map(([l,y]) =>
          <text key={l} x="45" y={y+3} textAnchor="end" fontSize="9" fill={muted}>{l}</text>
        )}
        <polygon points="124,64.7 198,49.8 272,49.7 346,30.5 420,36.9 420,148 124,148" fill={alpha(p, 0.07)}/>
        <polyline points="50,98.7 124,64.7 198,49.8 272,49.7 346,30.5 420,36.9" fill="none" stroke={p} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
        {[50,124,198,272,346,420].map((x, i) => {
          const y = [98.7,64.7,49.8,49.7,30.5,36.9][i]
          return <circle key={i} cx={x} cy={y} r={i===5?4.5:3.5} fill={i===5?p:t.palette.background.paper} stroke={p} strokeWidth="2"/>
        })}
        {['Jan','Feb','Mar','Apr','May','Jun'].map((m,i) =>
          <text key={m} x={50+i*74} y="163" textAnchor="middle" fontSize="9" fill={muted}>{m}</text>
        )}
        {[['$5.1K',92,false],['$5.8K',58,true],['$6.2K',43,true],['$6.2K',43,true],['$6.6K',24,true],['$6.4K',30,true]].map(([l,y,over],i) =>
          <text key={i} x={50+i*74} y={y} textAnchor="middle" fontSize="9" fill={over?t.palette.error.main:muted} fontFamily="'JetBrains Mono',monospace">{l}</text>
        )}
      </svg>
    </DashCard>
  )
}

function ServiceStatus() {
  const t = useTheme()
  const d = useDash()
  const rows = [
    { name: 'Claude Sonnet', pct: 131, color: t.palette.error.main,   chip: '초과', chipC: 'error' },
    { name: 'Azure OpenAI',  pct: 105, color: t.palette.warning.main, chip: '경고', chipC: 'warning' },
    { name: 'Claude Haiku',  pct: 104, color: t.palette.warning.main, chip: '경고', chipC: 'warning' },
    { name: 'GPT-4o',        pct: 102, color: t.palette.warning.main, chip: '경고', chipC: 'warning' },
    { name: 'Gemini Pro',    pct:  91, color: t.palette.success.main, chip: '정상', chipC: 'success' },
  ]
  return (
    <DashCard sx={{ p: 2.5, height: '100%', minHeight: 280 }}>
      <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>서비스별 예산 달성률</Typography>
      <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 2 }}>6개월 평균 기준</Typography>
      <Stack spacing={1.5}>
        {rows.map(({ name, pct, color, chip, chipC }) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', width: '110px', flexShrink: 0, color: 'text.primary' }}>{name}</Typography>
            <Box sx={{ flex: 1, bgcolor: alpha(color, 0.12), borderRadius: 1, height: '10px', overflow: 'hidden' }}>
              <Box sx={{ width: `${Math.min(pct, 100)}%`, height: '100%', bgcolor: color, borderRadius: 1 }} />
            </Box>
            <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color, fontWeight: 700, width: '36px', textAlign: 'right', flexShrink: 0 }}>{pct}%</Typography>
            <Chip label={chip} color={chipC} size="small" sx={{ flexShrink: 0, height: '20px' }} />
          </Box>
        ))}
      </Stack>
      <Alert severity="warning" sx={{ mt: 2, py: 0.5, fontSize: '11px' }}>
        Gemini Pro 예산 내이나 오류율 5.2% — 별도 점검 필요
      </Alert>
    </DashCard>
  )
}

function ActionItems() {
  const d = useDash()
  const items = [
    { p: 'P1 — 즉시', title: 'Sonnet 월별 예산 상한 설정', why: '신규 사용자 온보딩 시 예산 알림 없음. 사용자 +15명이 자동으로 초과로 연결되는 구조.', ci: 0 },
    { p: 'P1 — 즉시', title: '5월 Non-Azure 오류 원인 분석', why: 'Azure 계열 정상, 비Azure 3개 동시 급등. SPOF → Azure API Gateway 프록시 검토.', ci: 0 },
    { p: 'P2 — 이번 달', title: 'Haiku 30% 전환 파일럿', why: 'Sonnet 대비 6.7×. IT개발팀 30% 전환 시 월 $682 절감 = 초과액 93.5% 해소.', ci: 1 },
  ]
  return (
    <Grid container spacing={1.5}>
      {items.map(({ p, title, why, ci }) => (
        <Grid item xs={12} md={4} key={title}>
          <DashCard sx={{ p: 2, height: '100%', '&:hover': { transform: 'none !important' } }}>
            <Typography sx={{ fontSize: '10px', fontWeight: 700, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1 }}>{p}</Typography>
            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.75, lineHeight: 1.45 }}>{title}</Typography>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.65 }}>{why}</Typography>
          </DashCard>
        </Grid>
      ))}
    </Grid>
  )
}

// ── TAB 1 ──
function TabOverview() {
  return (
    <Box>
      <TopBar
        title="KT IT기술부문 · AI 서비스 모니터링"
        sub="분석 기간: 2026-01 ~ 2026-06 · 5개 서비스 · 30행 · 기준일: 2026-06-10"
        meta={'kt_cloud_monitoring.csv\n총예산 $5,700/월'}
      />
      <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
        <KPIStrip />
        <StoryBlock />
        <SecHeader tag="TREND" label="월별 전체 비용 추세 — 예산 대비 실적" />
        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          <Grid item xs={12} md={8}><CostChart /></Grid>
          <Grid item xs={12} md={4}><ServiceStatus /></Grid>
        </Grid>
        <SecHeader tag="ACTIONS" label="즉시 실행 과제 3선" />
        <ActionItems />
      </Box>
    </Box>
  )
}

// ── TAB 2 ──
function TabCost() {
  const t = useTheme()
  const d = useDash()
  const services = [
    { name: 'Claude Sonnet', total: 14442, share: 39.9, over: 2618, mo: '5/6', sc: 'error' },
    { name: 'GPT-4o',        total: 9079,  share: 25.1, over: 166,  mo: '3/6', sc: 'warning' },
    { name: 'Azure OpenAI',  total: 5752,  share: 15.9, over: 360,  mo: '5/6', sc: 'warning' },
    { name: 'Claude Haiku',  total: 4814,  share: 13.3, over: 268,  mo: '3/6', sc: 'warning' },
    { name: 'Gemini Pro',    total: 2138,  share: 5.9,  over: 0,    mo: '0/6', sc: 'success' },
  ]
  const eff = [
    { name: 'Claude Haiku',  idx: '1.0×', sc: 'success', save: '기준',    task: '분류, 요약, 단순 Q&A' },
    { name: 'Claude Sonnet', idx: '6.7×', sc: 'error',   save: '+$682/월', task: '복잡 추론, 코드 생성' },
    { name: 'GPT-4o',        idx: '4.2×', sc: 'warning', save: '+$280/월', task: '멀티모달, 파인튜닝' },
    { name: 'Azure OpenAI',  idx: '2.7×', sc: 'warning', save: '+$150/월', task: '컴플라이언스 필수' },
    { name: 'Gemini Pro',    idx: '2.3×', sc: 'warning', save: '+$88/월',  task: 'Google Workspace' },
  ]
  const muted = t.palette.text.secondary
  return (
    <Box>
      <TopBar title="비용 분석 — 서비스별 지출 구조" sub="6개월 누적 $36,225 · Sonnet 39.9% 집중 · 초과 97%는 호출량" meta="총예산 $34,200 · 누적 초과 $2,025" />
      <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
        <SecHeader tag="BREAKDOWN" label="서비스별 6개월 누적 지출" />
        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          <Grid item xs={12} md={7}>
            <DashCard sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 2 }}>지출 비중 — Sonnet 단독 39.9%</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead><TableRow>
                    <TableCell>서비스</TableCell>
                    <TableCell align="right">6개월($)</TableCell>
                    <TableCell align="right">비중</TableCell>
                    <TableCell align="right">초과액</TableCell>
                    <TableCell>상태</TableCell>
                  </TableRow></TableHead>
                  <TableBody>
                    {services.map(({ name, total, share, over, mo, sc }) => (
                      <TableRow key={name} hover sx={{ bgcolor: name === 'Claude Sonnet' ? alpha(t.palette.error.main, 0.04) : 'transparent' }}>
                        <TableCell sx={{ fontWeight: name === 'Claude Sonnet' ? 700 : 400 }}>{name}</TableCell>
                        <TableCell align="right" sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}>{total.toLocaleString()}</TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: `${sc}.main`, fontWeight: share > 30 ? 700 : 400 }}>{share}%</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', color: over > 0 ? 'error.main' : 'success.main' }}>{over > 0 ? `+${over}` : '0'}</Typography>
                        </TableCell>
                        <TableCell><Chip label={mo} color={sc} size="small" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="error" sx={{ mt: 1.5, py: 0.5, fontSize: '11px' }}>Sonnet 초과액 $2,618 = 전체의 72.5%. 나머지 4개 합산의 3.3배.</Alert>
            </DashCard>
          </Grid>
          <Grid item xs={12} md={5}>
            <DashCard sx={{ p: 2.5, height: '100%' }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>호출량 추이 — Sonnet</Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 1 }}>Jan 142K → May 213K (+39.6%)</Typography>
              <svg viewBox="0 0 280 155" style={{ display: 'block', width: '100%', height: 'auto' }}>
                <line x1="8" y1="145" x2="272" y2="145" stroke={t.palette.divider} strokeWidth="1"/>
                {[142300,168900,195400,178200,212800,198600].map((v, i) => {
                  const h = (v/220000)*128
                  const x = 10 + i*44
                  return (
                    <g key={i}>
                      <rect x={x} y={145-h} width={34} height={h} rx="3" fill={d.headerAccent} opacity={0.25 + i*0.1}/>
                      <text x={x+17} y="155" textAnchor="middle" fontSize="8" fill={muted}>
                        {['J','F','M','A','M','J'][i]}
                      </text>
                    </g>
                  )
                })}
                <text x="10" y="10" fontSize="9" fill={muted} fontFamily="'JetBrains Mono',monospace">142K</text>
                <text x="214" y="9" fontSize="9" fill={t.palette.error.main} fontFamily="'JetBrains Mono',monospace" fontWeight="700">213K ↑</text>
              </svg>
              <Alert severity="info" sx={{ mt: 1, py: 0.5, fontSize: '11px' }}>
                원인: 사용자 34→49명(+44%). 1인당 사용량은 -3.2%. 온보딩 예산 교육 부재.
              </Alert>
            </DashCard>
          </Grid>
        </Grid>
        <SecHeader tag="EFFICIENCY" label="비용 효율 비교 — Haiku 전환 기회" />
        <DashCard sx={{ p: 2.5 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 2 }}>토큰당 비용 효율 — Haiku 전환 시 월 $682 절감</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead><TableRow>
                <TableCell>서비스</TableCell>
                <TableCell>상대 비용 지수</TableCell>
                <TableCell>적합 태스크</TableCell>
                <TableCell>30% 전환 시 절감</TableCell>
              </TableRow></TableHead>
              <TableBody>
                {eff.map(({ name, idx, sc, save, task }) => (
                  <TableRow key={name} hover>
                    <TableCell sx={{ fontWeight: name === 'Claude Haiku' ? 700 : 400 }}>{name}</TableCell>
                    <TableCell><Typography sx={{ fontFamily: "'JetBrains Mono',monospace", color: `${sc}.main`, fontWeight: 700, fontSize: '12px' }}>{idx}</Typography></TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '12px' }}>{task}</TableCell>
                    <TableCell><Typography sx={{ color: save.includes('$682') ? 'success.main' : 'text.secondary', fontWeight: save.includes('$682') ? 700 : 400, fontSize: '12px' }}>{save}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="success" sx={{ mt: 1.5, py: 0.5, fontSize: '11px' }}>
            IT개발팀 Sonnet 30% → Haiku 전환 시 월 $682 절감 = 초과액 93.5% 해소.
          </Alert>
        </DashCard>
      </Box>
    </Box>
  )
}

// ── TAB 3 ──
function TabQuality() {
  const t = useTheme()
  const d = useDash()
  const muted = t.palette.text.secondary
  const div = t.palette.divider
  const errRows = [
    { name: 'Claude Haiku', apr: 2.1, may: 4.2, delta: '+2.1%p', sc: 'error' },
    { name: 'Gemini Pro',   apr: 2.8, may: 4.7, delta: '+1.9%p', sc: 'error' },
    { name: 'Claude Sonnet',apr: 1.7, may: 3.1, delta: '+1.4%p', sc: 'error' },
    { name: 'Azure OpenAI', apr: 1.2, may: 0.5, delta: '-0.7%p', sc: 'success' },
    { name: 'GPT-4o',       apr: 0.9, may: 0.8, delta: '-0.1%p', sc: 'success' },
  ]
  const rtRows = [
    { name: 'Claude Haiku',  ms: 380,  sc: 'success', eff: '1.0×',    task: '분류, 요약, 단순 Q&A' },
    { name: 'GPT-4o',        ms: 520,  sc: 'success', eff: '4.2×',    task: '멀티모달, 복잡 추론' },
    { name: 'Azure OpenAI',  ms: 580,  sc: 'warning', eff: '2.7×',    task: '엔터프라이즈 컴플라이언스' },
    { name: 'Claude Sonnet', ms: 720,  sc: 'warning', eff: '6.7×',    task: '복잡 코드, 다단계 분석' },
    { name: 'Gemini Pro',    ms: 890,  sc: 'error',   eff: '2.3×',    task: 'Google Workspace (오류율 주의)' },
  ]
  return (
    <Box>
      <TopBar title="품질 모니터링 — 오류율 · 응답시간" sub="5월 Non-Azure 3개 서비스 동시 오류 급등 · SPOF 구조 확인" meta="Gemini 5.2% / Sonnet 2.8%" />
      <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.default' }}>
        <SecHeader tag="ERROR RATE" label="서비스별 오류율 — 1~6월" />
        <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
          <Grid item xs={12} md={7}>
            <DashCard sx={{ p: 2.5, minHeight: 300 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>오류율 추이 — Gemini 4.7배 상승</Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary' }}>경고 기준선 2%(점선). 단위: %</Typography>
              <svg viewBox="0 0 460 190" style={{ display: 'block', width: '100%', height: 'auto', marginTop: '8px' }}>
                <line x1="50" y1="10" x2="50" y2="150" stroke={div} strokeWidth="1"/>
                <line x1="50" y1="150" x2="448" y2="150" stroke={div} strokeWidth="1"/>
                <line x1="50" y1="108" x2="448" y2="108" stroke={muted} strokeDasharray="5,3" strokeWidth="1.5" opacity=".5"/>
                <text x="450" y="111" fontSize="9" fill={muted}>2%</text>
                {[0,2,4,6].map((v,i)=><text key={v} x="45" y={150-i*35} textAnchor="end" fontSize="9" fill={muted}>{v}%</text>)}
                <polyline points="50,145 124,140 198,131 272,101 346,66 420,47" fill="none" stroke={t.palette.error.main} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
                <circle cx="420" cy="47" r="4.5" fill={t.palette.error.main} stroke={t.palette.background.paper} strokeWidth="2"/>
                <text x="426" y="45" fontSize="9" fill={t.palette.error.main} fontWeight="700" fontFamily="'JetBrains Mono',monospace">5.2%</text>
                <polyline points="50,147 124,146 198,140 272,129 346,95 420,99" fill="none" stroke={t.palette.warning.main} strokeWidth="2" strokeLinejoin="round" strokeDasharray="5,2"/>
                <circle cx="420" cy="99" r="3.5" fill={t.palette.warning.main} stroke={t.palette.background.paper} strokeWidth="2"/>
                <text x="426" y="97" fontSize="9" fill={t.palette.warning.main} fontFamily="'JetBrains Mono',monospace">2.8%</text>
                <polyline points="50,148 124,144 198,143 272,131 346,148 420,147" fill="none" stroke={t.palette.success.main} strokeWidth="1.5" strokeLinejoin="round"/>
                <text x="426" y="145" fontSize="9" fill={t.palette.success.main} fontFamily="'JetBrains Mono',monospace">0.6%</text>
                <rect x="326" y="8" width="40" height="144" rx="2" fill={alpha(t.palette.error.main, 0.05)} stroke={alpha(t.palette.error.main, 0.25)} strokeWidth="1"/>
                {['Jan','Feb','Mar','Apr','May','Jun'].map((m,i)=>
                  <text key={m} x={50+i*74} y="167" textAnchor="middle" fontSize="9" fill={muted}>{m}</text>
                )}
                {[
                  [t.palette.error.main, 'Gemini', false],
                  [t.palette.warning.main, 'Sonnet', true],
                  [t.palette.success.main, 'Azure/GPT', false],
                ].map(([c,l,dash],i)=>(
                  <g key={l}>
                    <line x1={50+i*110} y1="182" x2={74+i*110} y2="182" stroke={c} strokeWidth="2" strokeDasharray={dash?'5,2':undefined}/>
                    <text x={78+i*110} y="185" fontSize="8" fill={t.palette.text.primary}>{l}</text>
                  </g>
                ))}
              </svg>
            </DashCard>
          </Grid>
          <Grid item xs={12} md={5}>
            <DashCard sx={{ p: 2.5 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 0.5 }}>Apr → May 변화 — SPOF 구조</Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 1.5 }}>Azure 계열만 정상. Non-Azure 3개 동시 급등.</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead><TableRow>
                    <TableCell>서비스</TableCell>
                    <TableCell align="right">Apr</TableCell>
                    <TableCell align="right">May</TableCell>
                    <TableCell>변화</TableCell>
                  </TableRow></TableHead>
                  <TableBody>
                    {errRows.map(({ name, apr, may, delta, sc }) => (
                      <TableRow key={name} hover>
                        <TableCell sx={{ fontSize: '11px' }}>{name}</TableCell>
                        <TableCell align="right" sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px' }}>{apr}%</TableCell>
                        <TableCell align="right">
                          <Typography sx={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: `${sc}.main`, fontWeight: sc==='error'?700:400 }}>{may}%</Typography>
                        </TableCell>
                        <TableCell><Chip label={delta} color={sc} size="small" sx={{ fontSize: '9px', height: '18px' }}/></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Alert severity="error"   sx={{ mt: 1, py: 0.5, fontSize: '11px' }}>KT IDC ↔ Anthropic/Google 공통 경로 5월 장애 추정.</Alert>
              <Alert severity="success" sx={{ mt: 0.5, py: 0.5, fontSize: '11px' }}>권고: Azure API Gateway 프록시 도입 검토.</Alert>
            </DashCard>
          </Grid>
        </Grid>
        <SecHeader tag="RESPONSE" label="응답시간 — 비용 vs 속도" />
        <DashCard sx={{ p: 2.5 }}>
          <Typography sx={{ fontSize: '13px', fontWeight: 700, color: 'text.primary', mb: 2 }}>응답시간 vs 비용 효율 — Haiku가 가장 빠르고 가장 저렴</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead><TableRow>
                <TableCell>서비스</TableCell>
                <TableCell>평균 응답</TableCell>
                <TableCell>속도</TableCell>
                <TableCell>비용 효율</TableCell>
                <TableCell>추천 용도</TableCell>
              </TableRow></TableHead>
              <TableBody>
                {rtRows.map(({ name, ms, sc, eff, task }) => (
                  <TableRow key={name} hover>
                    <TableCell sx={{ fontWeight: name==='Claude Haiku'?700:400 }}>{name}</TableCell>
                    <TableCell><Typography sx={{ fontFamily:"'JetBrains Mono',monospace", color:`${sc}.main`, fontWeight:700, fontSize:'12px' }}>~{ms}ms</Typography></TableCell>
                    <TableCell><Chip label={sc==='success'?'빠름':sc==='warning'?'보통':'느림'} color={sc} size="small"/></TableCell>
                    <TableCell sx={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', color:`${sc}.main` }}>{eff}</TableCell>
                    <TableCell sx={{ color:'text.secondary', fontSize:'12px' }}>{task}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashCard>
      </Box>
    </Box>
  )
}

// ── AppContent: ThemeProvider 안에서 dashboard 토큰 읽기 ──
function AppContent({ themeKey, setThemeKey, tab, setTab }) {
  const d = useDash()
  return (
    <>
      <GlobalStyles styles={{
        body: {
          background: `${d.bodyBg} !important`,
          backgroundAttachment: 'fixed !important',
          transition: `background 0.5s cubic-bezier(0.4,0,0.2,1)`,
          minHeight: '100vh',
        }
      }}/>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3.5, px: { xs: 1.5, md: 5 }, pb: 10, transition: 'background-color 0.32s cubic-bezier(0.4,0,0.2,1)' }}>

        {/* ── 테마 스위처 ── */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2.5, gap: 0.75 }}>
          <Typography sx={{ fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", color: 'text.disabled', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Design Token · Theme Switcher
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.75, maxWidth: '520px' }}>
            {Object.entries(THEMES).map(([key, { label }]) => (
              <Box
                key={key}
                onClick={() => setThemeKey(key)}
                sx={{
                  px: 1.75, py: 0.7,
                  borderRadius: 2,
                  fontSize: '11px',
                  fontWeight: themeKey === key ? 700 : 500,
                  cursor: 'pointer',
                  bgcolor: themeKey === key ? 'primary.main' : 'background.paper',
                  color: themeKey === key ? 'primary.contrastText' : 'text.primary',
                  border: '1px solid',
                  borderColor: themeKey === key ? 'primary.main' : 'divider',
                  transition: d.transition,
                  userSelect: 'none',
                  boxShadow: themeKey === key ? 2 : 0,
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── 탭 네비게이션 ── */}
        <Paper elevation={1} sx={{ borderRadius: 3, mb: 2, overflow: 'hidden', transition: d.transition }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth" indicatorColor="primary" textColor="primary">
            <Tab label="개요" />
            <Tab label="비용 분석" />
            <Tab label="품질 모니터링" />
          </Tabs>
        </Paper>

        {/* ── 대시보드 ── */}
        <DashCard sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {tab === 0 && <TabOverview />}
          {tab === 1 && <TabCost />}
          {tab === 2 && <TabQuality />}
        </DashCard>

        <Typography sx={{ textAlign: 'center', mt: 4, fontSize: '11px', color: 'text.disabled', fontFamily: "'JetBrains Mono',monospace" }}>
          kt_cloud_monitoring.csv · AI Pipeline Kit · MUI Design Tokens · 2026-06-10
        </Typography>
      </Box>
    </>
  )
}

// ══ MAIN ══
export default function App() {
  const [themeKey, setThemeKey] = useState('kt')
  const [tab, setTab] = useState(0)

  return (
    <ThemeProvider theme={THEMES[themeKey].theme}>
      <CssBaseline />
      <AppContent themeKey={themeKey} setThemeKey={setThemeKey} tab={tab} setTab={setTab} />
    </ThemeProvider>
  )
}
