export type PhilosopherSceneKey =
  | 'socrates'
  | 'plato'
  | 'aristotle'
  | 'hegel'
  | 'feuerbach'
  | 'marx'
  | 'engels'
  | 'lenin'

export interface PhilosopherSceneLayer {
  id: string
  label: string
  depth: number
  assetHint: string
  motion: string
}

export interface PhilosopherSceneDesign {
  slug: PhilosopherSceneKey
  chapterTone: string
  palette: {
    ink: string
    paper: string
    accent: string
    shadow: string
  }
  backdrop: {
    setting: string
    timeOfDay: string
    perspective: string
    texture: string
    depthCue: string
  }
  portrait: {
    treatment: string
    pose: string
    expression: string
    wardrobe: string
    framing: string
    assetHint: string
  }
  lighting: {
    key: string
    fill: string
    rim: string
  }
  camera: {
    parallaxIntensity: number
    focalPoint: string
    grain: string
  }
  props: string[]
  layers: PhilosopherSceneLayer[]
}

export const philosopherAudioMap: Record<PhilosopherSceneKey, string> = {
  socrates: 'audio/Socrates.mp3',
  plato: 'audio/Plato.mp3',
  aristotle: 'audio/Aristotle.mp3',
  hegel: 'audio/Hegel.mp3',
  feuerbach: 'audio/Feuerbach.mp3',
  marx: 'audio/Marx.mp3',
  engels: 'audio/Engels.mp3',
  lenin: 'audio/Lenin.mp3',
}

export const philosopherSceneDesigns: Record<PhilosopherSceneKey, PhilosopherSceneDesign> = {
  socrates: {
    slug: 'socrates',
    chapterTone: 'Athenian dawn, curious, intimate, a public square turning into a classroom.',
    palette: {
      ink: '#102B3C',
      paper: '#F5D99D',
      accent: '#5EEAD4',
      shadow: '#071A2D',
    },
    backdrop: {
      setting: 'Agora of Athens with low stone steps, market columns, and listeners in loose circles.',
      timeOfDay: 'early morning',
      perspective: 'wide plaza view with Socrates slightly below the viewer, inviting entry into the crowd',
      texture: 'limestone dust, papyrus fibers, chalk marks, sun-warmed marble',
      depthCue: 'foreground amphora silhouettes, midground dialogue circle, distant Acropolis haze',
    },
    portrait: {
      treatment: 'engraved bust blended with warm painterly skin tones',
      pose: 'one hand raised as if asking the next question',
      expression: 'calm, amused, unafraid of uncertainty',
      wardrobe: 'plain himation, weathered folds, no ornament',
      framing: 'three-quarter bust inside a worn circular manuscript vignette',
      assetHint: 'portraits/socrates-asker.png',
    },
    lighting: {
      key: 'soft gold from upper left',
      fill: 'cool cyan bounce from polished stone',
      rim: 'thin turquoise line around shoulders and hand',
    },
    camera: {
      parallaxIntensity: 0.28,
      focalPoint: 'raised hand and listening crowd',
      grain: 'fine parchment grain with drifting dust',
    },
    props: ['wax tablet', 'market column', 'olive branch', 'chalk circle'],
    layers: [
      {
        id: 'foreground-vessels',
        label: 'Amphorae and sandals at plaza edge',
        depth: 0.18,
        assetHint: 'layers/socrates-foreground-vessels.png',
        motion: 'barely drifting dust across the stone',
      },
      {
        id: 'dialogue-circle',
        label: 'Listeners gathered in a questioning circle',
        depth: 0.52,
        assetHint: 'layers/socrates-dialogue-circle.png',
        motion: 'subtle head turns and parchment flutter',
      },
      {
        id: 'acropolis-haze',
        label: 'Acropolis horizon in warm haze',
        depth: 0.9,
        assetHint: 'layers/socrates-acropolis-haze.png',
        motion: 'slow atmospheric shimmer',
      },
    ],
  },
  plato: {
    slug: 'plato',
    chapterTone: 'Mystic and architectural, a cave opening toward a severe blue idea of truth.',
    palette: {
      ink: '#170F33',
      paper: '#DDD6FE',
      accent: '#A78BFA',
      shadow: '#050217',
    },
    backdrop: {
      setting: 'Cave interior where shadows on stone walls give way to geometric light outside.',
      timeOfDay: 'threshold between night and noon',
      perspective: 'deep tunnel composition pulling the eye from firelight to a white-blue opening',
      texture: 'charcoal soot, fractured stone, translucent vellum diagrams',
      depthCue: 'chains and shadow puppets near viewer, ascending path, radiant abstract forms beyond',
    },
    portrait: {
      treatment: 'marble philosopher portrait overlaid with diagram lines',
      pose: 'turned toward the cave exit while holding a tablet',
      expression: 'remote, searching, convinced that the visible world is incomplete',
      wardrobe: 'layered Greek cloak with violet-blue shadows',
      framing: 'arched cave aperture with geometric halos',
      assetHint: 'portraits/plato-forms.png',
    },
    lighting: {
      key: 'cold white light from cave mouth',
      fill: 'orange fire glow from below',
      rim: 'violet edge tracing the profile',
    },
    camera: {
      parallaxIntensity: 0.36,
      focalPoint: 'cave opening and tablet geometry',
      grain: 'soft smoke and charcoal flecks',
    },
    props: ['shadow screen', 'geometric tablet', 'fire brazier', 'ascending steps'],
    layers: [
      {
        id: 'shadow-wall',
        label: 'Moving shadows on cave wall',
        depth: 0.22,
        assetHint: 'layers/plato-shadow-wall.png',
        motion: 'slow wavering silhouettes from firelight',
      },
      {
        id: 'ascent-steps',
        label: 'Stone path toward the world of forms',
        depth: 0.58,
        assetHint: 'layers/plato-ascent-steps.png',
        motion: 'gentle light sweep upward',
      },
      {
        id: 'forms-sky',
        label: 'Abstract forms beyond the cave',
        depth: 0.94,
        assetHint: 'layers/plato-forms-sky.png',
        motion: 'faint rotational drift of geometric glyphs',
      },
    ],
  },
  aristotle: {
    slug: 'aristotle',
    chapterTone: 'Precise, observant, almost botanical, with knowledge arranged like a living archive.',
    palette: {
      ink: '#07364A',
      paper: '#DDF4FF',
      accent: '#38BDF8',
      shadow: '#02131F',
    },
    backdrop: {
      setting: 'Lyceum walkway with shelves of specimens, scrolls, diagrams, and open garden views.',
      timeOfDay: 'clear afternoon',
      perspective: 'ordered colonnade receding behind a desk of classified objects',
      texture: 'inked labels, specimen glass, blue-white plaster, leaf shadows',
      depthCue: 'foreground specimens, midground writing desk, background peripatetic walkway',
    },
    portrait: {
      treatment: 'scholarly painted bust with crisp annotation marks',
      pose: 'leaning over a scroll and pointing to a classified specimen',
      expression: 'focused, empirical, patient',
      wardrobe: 'clean pale robe with sky-blue edge shadows',
      framing: 'rectangular scholar plate with catalog tabs',
      assetHint: 'portraits/aristotle-lyceum.png',
    },
    lighting: {
      key: 'clear skylight through colonnade',
      fill: 'soft blue reflected from plaster',
      rim: 'thin daylight on scroll edges',
    },
    camera: {
      parallaxIntensity: 0.22,
      focalPoint: 'pointing hand, scroll, and specimen labels',
      grain: 'clean paper fibers with precise ink specks',
    },
    props: ['specimen jars', 'classification chart', 'reed pen', 'open scroll'],
    layers: [
      {
        id: 'specimen-table',
        label: 'Table of named specimens',
        depth: 0.2,
        assetHint: 'layers/aristotle-specimen-table.png',
        motion: 'small label cards lifting with a breeze',
      },
      {
        id: 'logic-scrolls',
        label: 'Scrolls and diagrams of causes',
        depth: 0.5,
        assetHint: 'layers/aristotle-logic-scrolls.png',
        motion: 'ink lines drawing in measured order',
      },
      {
        id: 'lyceum-garden',
        label: 'Garden colonnade in the distance',
        depth: 0.86,
        assetHint: 'layers/aristotle-lyceum-garden.png',
        motion: 'leaf-shadow movement across columns',
      },
    ],
  },
  hegel: {
    slug: 'hegel',
    chapterTone: 'Monumental and storm-lit, history folding into itself through contradiction.',
    palette: {
      ink: '#2A0B35',
      paper: '#F5D0FE',
      accent: '#F472B6',
      shadow: '#110018',
    },
    backdrop: {
      setting: 'Berlin study with a window onto marching clouds, spiral stair, and layered manuscripts.',
      timeOfDay: 'stormy evening',
      perspective: 'spiral composition where desk, window, and stair turn around a central contradiction',
      texture: 'dark wood, rain on glass, dense ink, polished brass',
      depthCue: 'foreground manuscripts, midground philosopher desk, background storm and civic silhouettes',
    },
    portrait: {
      treatment: 'oil portrait with luminous magenta dialectic lines',
      pose: 'seated at a desk, one page half-written and one page crossed out',
      expression: 'severe, concentrated, inwardly dramatic',
      wardrobe: 'black coat, white collar, wine-toned shadows',
      framing: 'oval academic frame interrupted by a spiral motif',
      assetHint: 'portraits/hegel-dialectic.png',
    },
    lighting: {
      key: 'lightning-white flash through the window',
      fill: 'low amber desk lamp',
      rim: 'magenta glow along manuscripts and profile',
    },
    camera: {
      parallaxIntensity: 0.44,
      focalPoint: 'crossed-out page transforming into a new page',
      grain: 'rain streaks with heavy archival paper grain',
    },
    props: ['spiral stair', 'crossed manuscript', 'desk lamp', 'storm window'],
    layers: [
      {
        id: 'manuscript-contradiction',
        label: 'Pages of thesis and negation',
        depth: 0.16,
        assetHint: 'layers/hegel-manuscript-contradiction.png',
        motion: 'page edges turning against each other',
      },
      {
        id: 'spiral-study',
        label: 'Study arranged as a dialectical spiral',
        depth: 0.55,
        assetHint: 'layers/hegel-spiral-study.png',
        motion: 'slow clockwise parallax rotation',
      },
      {
        id: 'storm-history',
        label: 'Storm-lit city as history in motion',
        depth: 0.92,
        assetHint: 'layers/hegel-storm-history.png',
        motion: 'brief lightning pulses behind civic silhouettes',
      },
    ],
  },
  feuerbach: {
    slug: 'feuerbach',
    chapterTone: 'Warm, human, grounded, as if philosophy steps down from heaven into a kitchen-lit room.',
    palette: {
      ink: '#4A2505',
      paper: '#FFE7B8',
      accent: '#F59E0B',
      shadow: '#1A0D03',
    },
    backdrop: {
      setting: 'Human-scale room with a simple table, window, bread, books, and a softened church silhouette outside.',
      timeOfDay: 'late afternoon',
      perspective: 'close domestic framing that keeps the human face larger than the institution outside',
      texture: 'warm paper, wood grain, linen, hand-smudged charcoal',
      depthCue: 'foreground bread and hands, midground portrait, distant steeple dissolved by window light',
    },
    portrait: {
      treatment: 'soft realist portrait with visible charcoal underdrawing',
      pose: 'turning away from an abstract icon toward a person at the table',
      expression: 'attentive, humane, gently skeptical',
      wardrobe: 'dark nineteenth-century coat warmed by amber light',
      framing: 'intimate rectangular plate like a family album page',
      assetHint: 'portraits/feuerbach-humanism.png',
    },
    lighting: {
      key: 'amber window light at face level',
      fill: 'matte candle glow from the table',
      rim: 'soft gold along hands and book edges',
    },
    camera: {
      parallaxIntensity: 0.2,
      focalPoint: 'human face and table objects',
      grain: 'warm charcoal and linen texture',
    },
    props: ['bread', 'plain cup', 'human hand study', 'blurred church window'],
    layers: [
      {
        id: 'table-life',
        label: 'Everyday table of human needs',
        depth: 0.18,
        assetHint: 'layers/feuerbach-table-life.png',
        motion: 'candle flicker and soft fabric movement',
      },
      {
        id: 'human-portrait',
        label: 'Human portrait replacing abstraction',
        depth: 0.56,
        assetHint: 'layers/feuerbach-human-portrait.png',
        motion: 'gentle light breathing across the face',
      },
      {
        id: 'distant-steeple',
        label: 'Distant religious symbol softened by daylight',
        depth: 0.88,
        assetHint: 'layers/feuerbach-distant-steeple.png',
        motion: 'window haze slowly brightening',
      },
    ],
  },
  marx: {
    slug: 'marx',
    chapterTone: 'Industrial, urgent, analytical, with theory written over the noise of production.',
    palette: {
      ink: '#1D2510',
      paper: '#E7FFB8',
      accent: '#7CFF01',
      shadow: '#060A03',
    },
    backdrop: {
      setting: 'Industrial reading room opening onto factory machinery, newspapers, ledgers, and worker silhouettes.',
      timeOfDay: 'smoky night',
      perspective: 'desk in foreground, factory floor behind, city chimneys cutting the horizon',
      texture: 'newsprint, iron, soot, green ledger lines, oil-stained paper',
      depthCue: 'foreground Capital manuscript, midground machine belts, background workers and chimneys',
    },
    portrait: {
      treatment: 'high-contrast engraved portrait with neon-green marginalia',
      pose: 'leaning forward over a manuscript, as if argument becomes action',
      expression: 'intense, diagnostic, unsentimental',
      wardrobe: 'dark coat and beard with sharp paper highlights',
      framing: 'newspaper-column frame with ledger ticks',
      assetHint: 'portraits/marx-capital.png',
    },
    lighting: {
      key: 'hard green-white desk light',
      fill: 'red-orange furnace glow from factory windows',
      rim: 'acid green line across shoulders and manuscript',
    },
    camera: {
      parallaxIntensity: 0.5,
      focalPoint: 'manuscript margin beside factory motion',
      grain: 'heavy newsprint halftone and soot particles',
    },
    props: ['Capital manuscript', 'factory belt', 'wage ledger', 'newspaper proofs'],
    layers: [
      {
        id: 'manuscript-ledger',
        label: 'Manuscript, ledger, and critique notes',
        depth: 0.14,
        assetHint: 'layers/marx-manuscript-ledger.png',
        motion: 'green annotation lines appearing over columns',
      },
      {
        id: 'factory-floor',
        label: 'Machines and social production',
        depth: 0.58,
        assetHint: 'layers/marx-factory-floor.png',
        motion: 'slow belt movement and furnace pulse',
      },
      {
        id: 'city-chimneys',
        label: 'Industrial city horizon',
        depth: 0.94,
        assetHint: 'layers/marx-city-chimneys.png',
        motion: 'smoke drifting across distant lights',
      },
    ],
  },
  engels: {
    slug: 'engels',
    chapterTone: 'Systemic and lucid, joining natural science, industry, and social analysis into one map.',
    palette: {
      ink: '#08361F',
      paper: '#D9FBE8',
      accent: '#34D399',
      shadow: '#02140B',
    },
    backdrop: {
      setting: 'Study-map room where factory plans, geological strata, botanical plates, and worker streets connect.',
      timeOfDay: 'rain-cleared morning',
      perspective: 'wall-sized map with strings and diagrams extending into layered city and nature panels',
      texture: 'green drafting paper, brass pins, scientific engraving, wet cobblestone',
      depthCue: 'foreground compass and pins, midground map network, background city and natural forms',
    },
    portrait: {
      treatment: 'documentary portrait blended with scientific atlas illustration',
      pose: 'standing beside a map, connecting two fields with a pin and thread',
      expression: 'clear, practical, system-building',
      wardrobe: 'dark coat with emerald reflected highlights',
      framing: 'atlas plate bordered by measuring marks',
      assetHint: 'portraits/engels-system.png',
    },
    lighting: {
      key: 'cool morning light from high window',
      fill: 'green reflected light from drafting paper',
      rim: 'fine emerald edge on map pins and thread',
    },
    camera: {
      parallaxIntensity: 0.34,
      focalPoint: 'thread joining nature, labor, and thought',
      grain: 'scientific plate stipple with clean ink lines',
    },
    props: ['map pins', 'compass', 'factory plan', 'geological cross-section'],
    layers: [
      {
        id: 'drafting-table',
        label: 'Compass, pins, and system notes',
        depth: 0.18,
        assetHint: 'layers/engels-drafting-table.png',
        motion: 'threads tightening between pins',
      },
      {
        id: 'systems-map',
        label: 'Wall map linking nature and society',
        depth: 0.54,
        assetHint: 'layers/engels-systems-map.png',
        motion: 'network lines pulsing in sequence',
      },
      {
        id: 'city-nature-panels',
        label: 'City and natural science panels',
        depth: 0.9,
        assetHint: 'layers/engels-city-nature-panels.png',
        motion: 'rain haze clearing across background panels',
      },
    ],
  },
  lenin: {
    slug: 'lenin',
    chapterTone: 'Strategic, cold, decisive, with theory crossing from text into organized action.',
    palette: {
      ink: '#3E0716',
      paper: '#FFD6DD',
      accent: '#FB7185',
      shadow: '#170208',
    },
    backdrop: {
      setting: 'Revolutionary operations room with train routes, telegrams, red flags, and winter city windows.',
      timeOfDay: 'blue pre-dawn',
      perspective: 'map table angled toward the viewer, city lights and station rails beyond',
      texture: 'telegram paper, red pencil, frost on glass, worn map canvas',
      depthCue: 'foreground map and hand, midground organizing table, background station and crowd silhouettes',
    },
    portrait: {
      treatment: 'sharp poster-like portrait with archival paper wear',
      pose: 'leaning over a map, finger marking the next move',
      expression: 'alert, compressed, tactical',
      wardrobe: 'dark suit and cap with rose-red reflected edge',
      framing: 'propaganda poster crop softened by manuscript margins',
      assetHint: 'portraits/lenin-action.png',
    },
    lighting: {
      key: 'cold window light from winter dawn',
      fill: 'low red lamp over the map table',
      rim: 'rose highlight on cap, cheek, and map pins',
    },
    camera: {
      parallaxIntensity: 0.46,
      focalPoint: 'finger on route map and telegram stack',
      grain: 'poster ink, paper scratches, faint frost',
    },
    props: ['route map', 'telegram stack', 'red pencil', 'station clock'],
    layers: [
      {
        id: 'map-table',
        label: 'Route map and strategic notes',
        depth: 0.16,
        assetHint: 'layers/lenin-map-table.png',
        motion: 'route lines drawing from city to city',
      },
      {
        id: 'operations-room',
        label: 'Organizing room with telegrams and flags',
        depth: 0.56,
        assetHint: 'layers/lenin-operations-room.png',
        motion: 'telegram papers shifting under red lamp',
      },
      {
        id: 'station-dawn',
        label: 'Winter station and city silhouettes',
        depth: 0.92,
        assetHint: 'layers/lenin-station-dawn.png',
        motion: 'slow blue dawn brightening behind windows',
      },
    ],
  },
}
