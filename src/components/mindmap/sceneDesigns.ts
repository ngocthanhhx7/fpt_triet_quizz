import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'

export interface MindmapSceneDesign {
  atmosphere: string
  backdrop: string
  body: string
  detail: string
  face: string
  figureNote: string
  foreground: string
  glow: string
  hair: string
  motif: string
  prop: string
  robe: string
  shadow: string
  sky: string
  symbol: string
}

const designs: Record<string, MindmapSceneDesign> = {
  socrates: {
    atmosphere: 'Bụi nắng Athens, đá cẩm thạch và tiếng hỏi đáp giữa quảng trường.',
    backdrop: 'linear-gradient(145deg, rgba(188,150,82,0.45), rgba(25,37,71,0.86) 52%, rgba(4,9,27,0.96))',
    body: '#d8c299',
    detail: '#f0cf82',
    face: '#c69064',
    figureNote: 'Áo choàng giản dị, râu bạc, dáng nghiêng như đang chất vấn người đối thoại.',
    foreground: 'rgba(240, 207, 130, 0.16)',
    glow: 'rgba(240,207,130,0.48)',
    hair: '#efe7d3',
    motif: 'Agora',
    prop: '?',
    robe: '#5f7294',
    shadow: 'rgba(7, 13, 28, 0.74)',
    sky: 'radial-gradient(circle at 30% 18%, rgba(255,225,160,0.4), transparent 25%), linear-gradient(180deg, #132347, #04091d)',
    symbol: 'Σ',
  },
  plato: {
    atmosphere: 'Hang động, bóng đổ và vệt sáng mở ra thế giới ý niệm.',
    backdrop: 'linear-gradient(145deg, rgba(107,78,183,0.54), rgba(18,23,57,0.9) 48%, rgba(4,6,19,0.98))',
    body: '#dac7ff',
    detail: '#a78bfa',
    face: '#bd8a68',
    figureNote: 'Dáng tĩnh tại trước cửa hang, tay giữ cuộn bản thảo như chỉ về phía ánh sáng.',
    foreground: 'rgba(167, 139, 250, 0.16)',
    glow: 'rgba(167,139,250,0.55)',
    hair: '#ded8ff',
    motif: 'Cave',
    prop: '◯',
    robe: '#5946a3',
    shadow: 'rgba(2, 4, 19, 0.84)',
    sky: 'radial-gradient(circle at 76% 20%, rgba(225,214,255,0.45), transparent 20%), linear-gradient(180deg, #19134a, #030514)',
    symbol: 'Ι',
  },
  aristotle: {
    atmosphere: 'Lyceum rõ nét, bảng phân loại, lá cây và nhịp quan sát chính xác.',
    backdrop: 'linear-gradient(145deg, rgba(35,117,164,0.52), rgba(16,42,68,0.9) 50%, rgba(3,10,24,0.98))',
    body: '#cfe9ff',
    detail: '#38bdf8',
    face: '#b98260',
    figureNote: 'Áo choàng xanh, bảng ghi chú và ánh nhìn của người đang phân loại thế giới.',
    foreground: 'rgba(56, 189, 248, 0.14)',
    glow: 'rgba(56,189,248,0.5)',
    hair: '#d7e7ee',
    motif: 'Lyceum',
    prop: '□',
    robe: '#2f6f98',
    shadow: 'rgba(3, 12, 26, 0.78)',
    sky: 'radial-gradient(circle at 36% 12%, rgba(125,211,252,0.34), transparent 22%), linear-gradient(180deg, #123c5c, #030817)',
    symbol: 'A',
  },
  hegel: {
    atmosphere: 'Thư phòng Đức, xoắn ốc biện chứng, đối lập chồng lên đối lập.',
    backdrop: 'linear-gradient(145deg, rgba(188,52,184,0.5), rgba(25,20,55,0.92) 48%, rgba(5,5,18,0.98))',
    body: '#f0d8f2',
    detail: '#ff4ce8',
    face: '#b88062',
    figureNote: 'Áo tối, tóc sáng, đứng giữa vòng xoắn như lịch sử đang tự phủ định.',
    foreground: 'rgba(255, 76, 232, 0.15)',
    glow: 'rgba(255,76,232,0.54)',
    hair: '#d8d7e9',
    motif: 'Dialectic',
    prop: '↻',
    robe: '#332d68',
    shadow: 'rgba(4, 5, 20, 0.8)',
    sky: 'radial-gradient(circle at 70% 18%, rgba(255,76,232,0.34), transparent 20%), linear-gradient(180deg, #1b1647, #040413)',
    symbol: '↯',
  },
  feuerbach: {
    atmosphere: 'Ánh sáng nhân bản, bàn viết ấm và triết học quay về con người thật.',
    backdrop: 'linear-gradient(145deg, rgba(207,129,54,0.5), rgba(55,35,28,0.92) 52%, rgba(15,9,10,0.98))',
    body: '#ffe0bf',
    detail: '#f59e0b',
    face: '#c58a66',
    figureNote: 'Chân dung gần gũi, áo nâu ấm, đặt con người ở trung tâm khung hình.',
    foreground: 'rgba(245, 158, 11, 0.15)',
    glow: 'rgba(245,158,11,0.52)',
    hair: '#e9d6c7',
    motif: 'Human',
    prop: '♡',
    robe: '#7b4b30',
    shadow: 'rgba(24, 12, 9, 0.82)',
    sky: 'radial-gradient(circle at 28% 18%, rgba(255,190,112,0.38), transparent 24%), linear-gradient(180deg, #4a2b23, #12090a)',
    symbol: 'H',
  },
  marx: {
    atmosphere: 'Thư viện, xưởng máy, khói công nghiệp và câu hỏi về thực tiễn xã hội.',
    backdrop: 'linear-gradient(145deg, rgba(48,183,117,0.48), rgba(20,45,41,0.92) 50%, rgba(3,12,18,0.98))',
    body: '#d9f8e7',
    detail: '#6fff00',
    face: '#b77d5c',
    figureNote: 'Râu lớn, áo khoác tối, tài liệu mở phía trước như triết học bước vào nhà máy.',
    foreground: 'rgba(111, 255, 0, 0.13)',
    glow: 'rgba(111,255,0,0.52)',
    hair: '#e6e8e0',
    motif: 'Factory',
    prop: '✦',
    robe: '#1d4239',
    shadow: 'rgba(2, 10, 13, 0.84)',
    sky: 'radial-gradient(circle at 80% 15%, rgba(111,255,0,0.24), transparent 20%), linear-gradient(180deg, #12332e, #02090e)',
    symbol: 'M',
  },
  engels: {
    atmosphere: 'Bản đồ, đường nối khoa học và mạng quan hệ tự nhiên - xã hội - tư duy.',
    backdrop: 'linear-gradient(145deg, rgba(32,180,128,0.5), rgba(13,49,54,0.92) 52%, rgba(2,13,20,0.98))',
    body: '#d7fff0',
    detail: '#34d399',
    face: '#bd8062',
    figureNote: 'Dáng hệ thống hóa, áo xanh đậm, phía sau là bản đồ các mối liên hệ.',
    foreground: 'rgba(52, 211, 153, 0.14)',
    glow: 'rgba(52,211,153,0.5)',
    hair: '#d9eee8',
    motif: 'Network',
    prop: '△',
    robe: '#174f4a',
    shadow: 'rgba(2, 11, 18, 0.82)',
    sky: 'radial-gradient(circle at 38% 16%, rgba(52,211,153,0.28), transparent 23%), linear-gradient(180deg, #103d43, #020b12)',
    symbol: 'E',
  },
  lenin: {
    atmosphere: 'Phòng chiến lược, bản đồ đỏ, nhịp hành động và quyết định lịch sử.',
    backdrop: 'linear-gradient(145deg, rgba(229,57,89,0.5), rgba(55,24,35,0.93) 52%, rgba(16,6,12,0.98))',
    body: '#ffe0e6',
    detail: '#fb7185',
    face: '#bd7c5d',
    figureNote: 'Áo khoác sắc nét, ánh nhìn quyết đoán, bản đồ phía sau đang phát sáng.',
    foreground: 'rgba(251, 113, 133, 0.15)',
    glow: 'rgba(251,113,133,0.52)',
    hair: '#d8c6bb',
    motif: 'Strategy',
    prop: '▲',
    robe: '#612134',
    shadow: 'rgba(16, 6, 12, 0.84)',
    sky: 'radial-gradient(circle at 72% 18%, rgba(251,113,133,0.32), transparent 22%), linear-gradient(180deg, #431726, #10060c)',
    symbol: 'L',
  },
}

export const getSceneDesign = (philosopher: PhilosopherTimelineItem) => designs[philosopher.id] ?? designs.socrates
