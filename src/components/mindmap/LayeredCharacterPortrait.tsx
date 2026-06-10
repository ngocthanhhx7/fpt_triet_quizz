import type { CSSProperties } from 'react'
import { getPhilosopherAssetPack, resolveAssetUrl } from '../../data/philosopherAssets'
import type { PhilosopherTimelineItem } from '../../data/philosophyTimeline'
import { getSceneDesign } from './sceneDesigns'

interface LayeredCharacterPortraitProps {
  isSpeaking?: boolean
  philosopher: PhilosopherTimelineItem
  reducedMotion: boolean
}

export function LayeredCharacterPortrait({
  isSpeaking = false,
  philosopher,
  reducedMotion,
}: LayeredCharacterPortraitProps) {
  const design = getSceneDesign(philosopher)
  const assetPack = getPhilosopherAssetPack(philosopher.id)
  const portrait = assetPack?.portrait
  const display = assetPack?.display
  const portraitUrl = resolveAssetUrl(portrait?.localPath) ?? portrait?.remoteUrl
  const isBust = display?.presentation === 'plaster-bust'
  const pedestal = display?.pedestal
  const style = {
    '--portrait-detail': design.detail,
    '--portrait-glow': design.glow,
    '--portrait-robe': design.robe,
    '--portrait-shadow': design.shadow,
    '--pedestal-tone': pedestal?.tone ?? '#d8d0c2',
  } as CSSProperties

  return (
    <div
      className="mindmap-layer relative z-30 mx-auto flex h-[410px] w-full max-w-[520px] items-center justify-center [perspective:900px] [transform-style:preserve-3d] sm:h-[480px] xl:h-[540px]"
      data-character-layer
      style={style}
      aria-label={`Chân dung 2.5D của ${philosopher.name}`}
    >
      <div className="absolute bottom-8 h-16 w-[68%] rounded-[999px] bg-[var(--portrait-shadow)] opacity-85 blur-2xl" data-parallax-layer="near" />
      <div className="absolute left-1/2 top-[8%] h-[62%] w-[76%] -translate-x-1/2 rounded-[36px] border border-[#f4d27a]/22 bg-[linear-gradient(135deg,rgba(244,210,122,0.18),rgba(255,247,222,0.08)_28%,rgba(20,16,32,0.42)_74%),radial-gradient(circle_at_50%_16%,rgba(255,245,198,0.16),transparent_42%)] shadow-[0_32px_90px_rgba(0,0,0,0.34)] [transform:translateZ(8px)]" data-parallax-layer="far" />
      <div className="absolute left-1/2 top-[13%] h-[52%] w-[64%] -translate-x-1/2 rounded-[30px] border border-[#f4d27a]/30 bg-[linear-gradient(90deg,rgba(244,210,122,0.18)_1px,transparent_1px),linear-gradient(180deg,rgba(244,210,122,0.16)_1px,transparent_1px)] bg-[length:26px_26px] opacity-80 [transform:translateZ(14px)]" data-parallax-layer="mid" />
      <div className="absolute left-1/2 top-[12%] h-[56%] w-[68%] -translate-x-1/2 rounded-[32px] border border-[#f8e4a4]/28 shadow-[inset_0_0_0_8px_rgba(65,44,24,0.16),inset_0_0_0_10px_rgba(248,228,164,0.08)] [transform:translateZ(18px)]" data-parallax-layer="mid" />

      <div
        className={[
          'relative z-20 overflow-hidden border border-[#f8e4a4]/38 bg-[#f7f0df] shadow-[0_0_48px_var(--portrait-glow),0_24px_58px_rgba(0,0,0,0.34)] [transform:translateZ(38px)]',
          isBust
            ? 'mt-[-3.25rem] h-[244px] w-[206px] rounded-t-[46%] rounded-b-[22px] sm:h-[300px] sm:w-[242px] xl:h-[326px] xl:w-[264px]'
            : 'mt-[-1.75rem] h-[272px] w-[214px] rounded-[28px] sm:h-[328px] sm:w-[252px] xl:h-[356px] xl:w-[274px]',
        ].join(' ')}
      >
        {portraitUrl ? (
          <img
            alt=""
            aria-hidden="true"
            className={[
              'h-full w-full object-cover object-center',
              isBust ? 'scale-[1.08] saturate-[0.9] contrast-[1.06]' : 'scale-[1.03]',
            ].join(' ')}
            src={portraitUrl}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_38%_25%,rgba(255,255,255,0.5),transparent_34%),#c69064]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_20%,rgba(255,255,255,0.24),transparent_24%),linear-gradient(110deg,rgba(255,255,255,0.1),transparent_36%),linear-gradient(180deg,transparent_58%,rgba(5,8,22,0.18))]" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),transparent)] mix-blend-soft-light" />
        {portrait ? (
          <a
            className="absolute right-2 top-2 rounded-full border border-[#162031]/10 bg-[#f7f0df]/72 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[#3e3322]/60 opacity-70 transition-opacity hover:opacity-100"
            href={portrait.sourcePage}
            rel="noreferrer"
            target="_blank"
            title={portrait.credit}
          >
            Credit
          </a>
        ) : null}
      </div>

      {isBust ? (
        <div className="absolute bottom-[12%] left-1/2 z-30 w-[250px] -translate-x-1/2 [transform-style:preserve-3d] sm:bottom-[10%] sm:w-[300px] xl:w-[330px]" data-parallax-layer="near">
          <div className="mx-auto h-5 w-[56%] rounded-t-[12px] border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),var(--pedestal-tone))] shadow-[0_12px_30px_rgba(0,0,0,0.22)]" />
          <div className="mx-auto h-[72px] w-[74%] border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.08)_34%,rgba(70,60,52,0.18)),var(--pedestal-tone)] shadow-[inset_0_1px_0_rgba(255,255,255,0.46),0_26px_42px_rgba(0,0,0,0.3)] sm:h-[82px]">
            <div className="mx-auto mt-4 w-fit rounded-sm border border-[#5d4c33]/18 bg-[#101827]/8 px-4 py-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#342c21]/64">
              {pedestal?.label ?? philosopher.name}
            </div>
          </div>
          <div className="mx-auto h-5 w-[86%] rounded-b-[16px] border border-white/12 bg-[linear-gradient(180deg,var(--pedestal-tone),rgba(76,66,55,0.48))]" />
        </div>
      ) : (
        <div className="absolute bottom-[10%] left-1/2 z-30 w-[230px] -translate-x-1/2 rounded-[20px] border border-[#f8e4a4]/22 bg-[#17101f]/58 px-4 py-3 text-center shadow-2xl backdrop-blur-md sm:w-[270px]" data-parallax-layer="near">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#f8e4a4]/58">Manuscript plate</div>
          <div className="mt-1 font-grotesk text-2xl uppercase leading-none text-cream">{philosopher.name}</div>
        </div>
      )}

      {isSpeaking && !reducedMotion ? (
        <div className="absolute left-1/2 top-[18%] z-10 h-[44%] w-[62%] -translate-x-1/2 rounded-full border border-white/18 bg-[var(--portrait-glow)] opacity-24 blur-xl animate-pulse" data-parallax-layer="mid" />
      ) : null}

      <div
        className={[
          'pointer-events-none absolute inset-x-4 top-6 bottom-6 rounded-[42px] border border-[#f8e4a4]/12 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_36%)]',
          reducedMotion ? '' : 'animate-float',
        ].join(' ')}
      />
    </div>
  )
}
