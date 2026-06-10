import { BookOpen, Brain, Code2, Flag, Gamepad2, Mail, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
}

export interface MediaAsset {
  src: string
  poster?: string
}

export interface TopicCard {
  title: string
  description: string
  metaLabel: string
  metaValue: string
  media: MediaAsset
  href: string
  icon: LucideIcon
}

export const videoAssets = {
  hero: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4',
  intro: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4',
  cardA: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
  cardB: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
  cardC: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
  final: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4',
}

export const homeContent = {
  brand: 'FPT Triết Quest',
  navItems: [
    { label: 'Tổng quan', href: '#home' },
    { label: 'Bài học', href: '#learn' },
    { label: 'Mini game', href: '#/games' },
    { label: 'Cây tư duy', href: '#/mindmap' },
    { label: 'Luyện tập', href: '#practice' },
    { label: 'Tiến độ', href: '#progress' },
  ] satisfies NavItem[],
  socialLinks: [
    { label: 'Mail', href: 'mailto:fpt-triet-quest@example.com', icon: Mail },
    { label: 'Github', href: 'https://github.com', icon: Code2, external: true },
    { label: 'Lộ trình', href: '#learn', icon: BookOpen },
  ] satisfies SocialLink[],
  hero: {
    media: { src: videoAssets.hero },
    eyebrow: 'Client-only learning lab for FPT students',
    headlineLines: ['Giải mã', 'Triết học', 'bằng game'],
    accentText: 'Mác-Lênin',
    body: 'Biến nội dung triết học Mác-Lênin thành bản đồ kiến thức, quiz mở rương và mini game để học sâu hơn mà vẫn giữ cảm giác khám phá.',
    primaryCta: { label: 'Chơi thử ngay', href: '#/games' },
    secondaryCta: { label: 'Ôn nhanh 3 chương', href: '#learn' },
  },
  intro: {
    media: { src: videoAssets.intro },
    titleLines: ['Không học vẹt.', 'Học bằng trải nghiệm.'],
    accentText: 'Quest mode',
    body: 'Mỗi chương PDF được chuyển thành module ngắn, ví dụ gần đời sống sinh viên, câu hỏi có giải thích và phần thưởng lưu ngay trong trình duyệt.',
    ghostBody: [
      'Thế giới quan giúp bạn nhìn vấn đề đúng nền tảng.',
      'Phương pháp luận giúp bạn chọn cách hành động có căn cứ.',
    ],
  },
  topics: {
    heading: ['Ba cánh cổng', 'tri thức'],
    accentWord: 'Quest',
    cta: { label: 'Mở khu luyện tập', href: '#practice' },
    cards: [
      {
        title: 'Hành Trình Biện Chứng',
        description: 'Platformer 3 world: mở rương bằng quiz, nhận vật phẩm và vượt chướng ngại theo từng chương.',
        metaLabel: 'GAME TYPE',
        metaValue: 'Canvas runner',
        media: { src: videoAssets.cardA },
        href: '#/games',
        icon: Gamepad2,
      },
      {
        title: 'Ghép Cặp Phạm Trù',
        description: 'Memory puzzle ghép thuật ngữ, định nghĩa và ví dụ để nhớ nhanh các cặp phạm trù quan trọng.',
        metaLabel: 'GAME TYPE',
        metaValue: 'Pair puzzle',
        media: { src: videoAssets.cardB },
        href: '#/games',
        icon: Brain,
      },
      {
        title: 'Dòng Chảy Lịch Sử',
        description: 'Timeline quiz giúp nối sản xuất vật chất, LLSX-QHSX, CSHT-KTTT và vai trò con người.',
        metaLabel: 'GAME TYPE',
        metaValue: 'Timeline quiz',
        media: { src: videoAssets.cardC },
        href: '#/games',
        icon: Flag,
      },
    ] satisfies TopicCard[],
  },
  finalCta: {
    media: { src: videoAssets.final },
    accentText: 'Ready?',
    headlineLines: ['HỌC CÓ TIẾN ĐỘ.', 'CHƠI CÓ PHẦN THƯỞNG.', 'HIỂU CÓ PHƯƠNG PHÁP.'],
    badge: { label: 'Local progress', icon: Trophy },
  },
}
