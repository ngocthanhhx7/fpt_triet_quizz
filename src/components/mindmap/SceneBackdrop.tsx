import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { getPhilosopherAssetPack, resolveAssetUrl } from '../../data/philosopherAssets'
import { getSceneDesign } from './sceneDesigns'

interface SceneBackdropProps {
  philosopher: PhilosopherTimelineItem
  reducedMotion: boolean
}

export function SceneBackdrop({ philosopher, reducedMotion }: SceneBackdropProps) {
  const design = getSceneDesign(philosopher)
  const assetPack = getPhilosopherAssetPack(philosopher.id)
  const backdropPlate = assetPack?.backdropPlate
  const backdropUrl = resolveAssetUrl(backdropPlate?.localPath) ?? backdropPlate?.remoteUrl

  const sceneSetPieces = (() => {
    switch (philosopher.id) {
      case 'socrates':
        return (
          <>
            <div className="mindmap-layer absolute left-[8%] bottom-[20%] h-[44%] w-[14%] rounded-t-[120px] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute left-[19%] bottom-[26%] h-[32%] w-[10%] rounded-t-[110px] border border-white/10 bg-white/[0.05]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute left-[14%] bottom-[14%] h-16 w-[38%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,217,157,0.22),transparent_70%)] blur-2xl" data-parallax-layer="near" />
          </>
        )
      case 'plato':
        return (
          <>
            <div className="mindmap-layer absolute left-[9%] bottom-[11%] h-[54%] w-[26%] rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,12,28,0.92),rgba(12,16,34,0.58))] shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute left-[20%] bottom-[23%] h-[18%] w-[40%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.42),transparent_72%)] blur-3xl" data-parallax-layer="near" />
            <div className="mindmap-layer absolute right-[10%] top-[15%] h-[26%] w-[20%] rounded-[60%_60%_28%_28%] bg-[linear-gradient(180deg,rgba(225,214,255,0.12),rgba(8,9,26,0.08))] opacity-70" data-parallax-layer="far" />
          </>
        )
      case 'aristotle':
        return (
          <>
            <div className="mindmap-layer absolute left-[7%] bottom-[13%] h-[26%] w-[52%] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(22,40,24,0.8),rgba(7,12,20,0.38))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute left-[15%] top-[20%] h-[36%] w-[19%] rounded-t-[100px] border border-white/12 bg-[linear-gradient(180deg,rgba(245,230,180,0.15),rgba(255,255,255,0.02))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute right-[17%] bottom-[22%] h-16 w-24 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.18),transparent_72%)] blur-2xl" data-parallax-layer="near" />
          </>
        )
      case 'hegel':
        return (
          <>
            <div className="mindmap-layer absolute left-[8%] top-[14%] h-[48%] w-[30%] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(24,18,46,0.92),rgba(7,8,18,0.4))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute right-[14%] top-[10%] h-[70%] w-[2px] bg-[linear-gradient(180deg,transparent,rgba(255,76,232,0.42),transparent)]" data-parallax-layer="far" />
            <div className="mindmap-layer absolute right-[20%] top-[26%] h-24 w-24 rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,76,232,0.18),transparent_68%)] blur-2xl" data-parallax-layer="near" />
          </>
        )
      case 'feuerbach':
        return (
          <>
            <div className="mindmap-layer absolute left-[9%] bottom-[14%] h-[36%] w-[30%] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(57,33,28,0.88),rgba(18,9,10,0.38))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute right-[16%] top-[18%] h-[34%] w-[18%] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,224,191,0.12),rgba(80,48,28,0.06))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute left-[22%] top-[26%] h-28 w-28 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.28),transparent_70%)] blur-3xl" data-parallax-layer="near" />
          </>
        )
      case 'marx':
        return (
          <>
            <div className="mindmap-layer absolute left-[4%] bottom-[11%] h-[34%] w-[36%] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,28,0.9),rgba(3,12,18,0.45))] shadow-[inset_0_0_32px_rgba(0,0,0,0.28)]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute left-[17%] top-[16%] h-[38%] w-[24%] rounded-[22px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(11,18,26,0.06))]" data-parallax-layer="far" />
            <div className="mindmap-layer absolute right-[10%] bottom-[18%] h-[30%] w-[18%] rounded-[20px] bg-[linear-gradient(180deg,rgba(111,255,0,0.12),rgba(2,8,10,0.02))] opacity-80" data-parallax-layer="near" />
          </>
        )
      case 'engels':
        return (
          <>
            <div className="mindmap-layer absolute left-[7%] bottom-[12%] h-[32%] w-[28%] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,54,53,0.9),rgba(4,12,18,0.38))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute right-[14%] top-[15%] h-[42%] w-[28%] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(52,211,153,0.1),rgba(6,10,16,0.08))]" data-parallax-layer="far" />
            <div className="mindmap-layer absolute left-[30%] top-[20%] h-24 w-24 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.2),transparent_70%)] blur-3xl" data-parallax-layer="near" />
          </>
        )
      case 'lenin':
        return (
          <>
            <div className="mindmap-layer absolute left-[7%] bottom-[12%] h-[34%] w-[40%] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(58,20,31,0.94),rgba(14,6,10,0.36))]" data-parallax-layer="mid" />
            <div className="mindmap-layer absolute right-[11%] top-[14%] h-[48%] w-[22%] rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(251,113,133,0.12),rgba(10,9,16,0.05))]" data-parallax-layer="far" />
            <div className="mindmap-layer absolute left-[25%] top-[18%] h-28 w-28 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,113,133,0.18),transparent_72%)] blur-3xl" data-parallax-layer="near" />
          </>
        )
      default:
        return null
    }
  })()

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: design.sky }} />
      {backdropUrl ? (
        <img
          alt=""
          aria-hidden="true"
          className="absolute inset-[-3%] h-[106%] w-[106%] object-cover object-center opacity-34 mix-blend-screen"
          src={backdropUrl}
        />
      ) : null}
      <div
        className="mindmap-layer absolute -inset-10 opacity-90"
        data-parallax-layer="far"
        style={{ background: design.backdrop }}
      />
      <div className="mindmap-layer absolute inset-x-[-8%] top-[13%] h-24 opacity-45" data-parallax-layer="mid">
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] blur-2xl" />
      </div>

      <div className="mindmap-layer absolute left-[5%] top-[18%] h-[48%] w-[18%] opacity-35" data-parallax-layer="mid">
        <div className="h-full rounded-t-[120px] border border-white/20 bg-white/[0.035]" />
        <div className="mx-auto mt-3 h-2 w-4/5 rounded-full bg-white/10" />
      </div>

      <div className="mindmap-layer absolute right-[6%] top-[16%] h-[55%] w-[22%] opacity-35" data-parallax-layer="mid">
        <div className="h-full rounded-[34px] border border-white/16 bg-black/15 shadow-2xl" />
        <div className="absolute inset-x-4 top-6 h-px bg-white/16" />
        <div className="absolute inset-x-4 top-14 h-px bg-white/10" />
        <div className="absolute inset-x-4 top-[5.5rem] h-px bg-white/10" />
      </div>

      {sceneSetPieces}

      <div className="mindmap-layer absolute bottom-[-10%] left-[-8%] h-[34%] w-[60%] rounded-[999px] blur-3xl" data-parallax-layer="near" style={{ background: design.foreground }} />
      <div className="mindmap-layer absolute bottom-[-8%] right-[-12%] h-[42%] w-[62%] rounded-[999px] blur-3xl opacity-70" data-parallax-layer="near" style={{ background: design.glow }} />

      <div className="mindmap-layer absolute bottom-[8%] left-[7%] h-[18%] w-[28%] rounded-t-[28px] border border-[#f8e4a4]/14 bg-[linear-gradient(180deg,rgba(255,247,222,0.12),rgba(15,12,24,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" data-parallax-layer="near" />
      <div className="mindmap-layer absolute bottom-[12%] right-[8%] hidden h-[24%] w-[20%] rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(3,7,18,0.18))] shadow-2xl md:block" data-parallax-layer="mid" />

      <div className="mindmap-layer absolute right-[14%] top-[9%] text-7xl font-black text-white/[0.055] sm:text-8xl" data-parallax-layer="far">
        {design.symbol}
      </div>

      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,transparent_0,rgba(1,8,40,0.18)_34%,rgba(1,8,40,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,8,40,0.08),rgba(1,8,40,0.34))]" />

      {!reducedMotion ? (
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.13)_45%,transparent_55%)] animate-float" />
      ) : null}
    </div>
  )
}
