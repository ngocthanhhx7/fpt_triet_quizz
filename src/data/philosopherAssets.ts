export interface SourcedImageAsset {
  localPath?: string
  remoteUrl: string
  sourcePage: string
  license: string
  credit: string
  usageNote: string
  downloaded: boolean
}

export interface SceneAssetPlan {
  settingBrief: string
  collectionStrategy: string
  neededLayers: string[]
  status: 'procedural-fallback' | 'needs-sourcing' | 'sourced'
}

export interface PhilosopherDisplayPlan {
  presentation: 'plaster-bust' | 'portrait-plate'
  galleryFrame: 'illuminated-manuscript'
  pedestal?: {
    label: string
    material: 'plaster' | 'marble' | 'stone'
    tone: string
  }
}

export interface PhilosopherAssetPack {
  backdropPlate: SourcedImageAsset
  id: string
  portrait: SourcedImageAsset
  backdrop: SceneAssetPlan
  display: PhilosopherDisplayPlan
}

const ASSET_BASE = 'assets/mindmap'

export const philosopherAssetPacks: Record<string, PhilosopherAssetPack> = {
  socrates: {
    id: 'socrates',
    display: {
      presentation: 'plaster-bust',
      galleryFrame: 'illuminated-manuscript',
      pedestal: {
        label: 'Socrates',
        material: 'plaster',
        tone: '#d9d4c8',
      },
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/socrates-agora.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Agora_-_Ath%C3%A8nes_%28GRA1%29_-_2022-03-26_-_97.jpg/330px-Agora_-_Ath%C3%A8nes_%28GRA1%29_-_2022-03-26_-_97.jpg',
      sourcePage: 'https://en.wikipedia.org/wiki/Ancient_Agora_of_Athens',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Ancient Agora of Athens / Wikimedia Commons',
      usageNote: 'Use the sourced Athens agora plate behind the Socrates chapter.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/socrates.jpg`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Socrates_Louvre.jpg/500px-Socrates_Louvre.jpg',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Socrates_Louvre.jpg',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Bust of Socrates, Louvre / Wikimedia Commons',
      usageNote: 'Use as the primary sourced 2.5D portrait plate; layer parchment glow and agora dust over it.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'Agora Athens at dawn, stone steps, market columns, small circles of listeners.',
      collectionStrategy: 'Source public-domain/CC images of the Ancient Agora, Acropolis haze, amphorae, and marble textures.',
      neededLayers: ['foreground amphorae', 'dialogue circle silhouettes', 'distant Acropolis haze'],
      status: 'procedural-fallback',
    },
  },
  plato: {
    id: 'plato',
    display: {
      presentation: 'plaster-bust',
      galleryFrame: 'illuminated-manuscript',
      pedestal: {
        label: 'Plato',
        material: 'marble',
        tone: '#d8d0c2',
      },
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/plato-cave.jpg`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Platon_Cave_Sanraedam_1604.jpg/330px-Platon_Cave_Sanraedam_1604.jpg',
      sourcePage: 'https://en.wikipedia.org/wiki/Allegory_of_the_cave',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Platon Cave, Jan Saenredam / Wikimedia Commons',
      usageNote: 'Dreamlike cave plate behind Plato; combine with violet forms light.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/plato.png`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Plato_Silanion_Musei_Capitolini_MC1377.png/500px-Plato_Silanion_Musei_Capitolini_MC1377.png',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Plato_Silanion_Musei_Capitolini_MC1377.png',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Plato bust, Musei Capitolini / Wikimedia Commons',
      usageNote: 'Use as the luminous cave-and-forms portrait plate with violet rim light.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'Allegory cave opening into impossible light and geometric forms.',
      collectionStrategy: 'Source CC cave stone, stair, and celestial-light textures; keep final composition dreamlike.',
      neededLayers: ['shadow wall', 'ascending cave steps', 'abstract forms sky'],
      status: 'procedural-fallback',
    },
  },
  aristotle: {
    id: 'aristotle',
    display: {
      presentation: 'plaster-bust',
      galleryFrame: 'illuminated-manuscript',
      pedestal: {
        label: 'Aristotle',
        material: 'stone',
        tone: '#cfc7b4',
      },
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/aristotle-lyceum.png`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sanzio_01_cropped.png/330px-Sanzio_01_cropped.png',
      sourcePage: 'https://en.wikipedia.org/wiki/Lyceum_(classical)',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Classical school detail associated with Lyceum / Wikimedia Commons',
      usageNote: 'Clear academic plate behind Aristotle, with garden and classification overlays.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/aristotle.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/500px-Aristotle_Altemps_Inv8575.jpg',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Aristotle bust, Palazzo Altemps / Wikimedia Commons',
      usageNote: 'Use as the clear Lyceum portrait plate, sharper and more observational than Plato.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'Lyceum garden, specimen table, taxonomy scrolls, clean daylight.',
      collectionStrategy: 'Source open garden colonnade, botanical specimen, and manuscript textures.',
      neededLayers: ['specimen table', 'logic scrolls', 'Lyceum garden columns'],
      status: 'procedural-fallback',
    },
  },
  hegel: {
    id: 'hegel',
    display: {
      presentation: 'portrait-plate',
      galleryFrame: 'illuminated-manuscript',
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/hegel-study.jpg`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Carl_Spitzweg_-_%22The_Bookworm%22.jpg/330px-Carl_Spitzweg_-_%22The_Bookworm%22.jpg',
      sourcePage: 'https://en.wikipedia.org/wiki/The_Bookworm_(Spitzweg)',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'The Bookworm by Carl Spitzweg / Wikimedia Commons',
      usageNote: 'Dramatic study/library plate behind Hegel, with dialectic storm overlays.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/hegel.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Jakob_Schlesinger_-_Hegel_1831.jpg/250px-Jakob_Schlesinger_-_Hegel_1831.jpg',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Jakob_Schlesinger_-_Hegel_1831.jpg',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Portrait of Hegel by Jakob Schlesinger / Wikimedia Commons',
      usageNote: 'Use as the dramatic study portrait plate, surrounded by dialectical spiral light.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'German study, stormed window, papers, spiral dialectic diagram.',
      collectionStrategy: 'Source public-domain study-room paintings, manuscript paper, storm-window plates.',
      neededLayers: ['contradiction manuscript', 'spiral study room', 'storm of history'],
      status: 'procedural-fallback',
    },
  },
  feuerbach: {
    id: 'feuerbach',
    display: {
      presentation: 'portrait-plate',
      galleryFrame: 'illuminated-manuscript',
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/feuerbach-desk.jpg`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bureau_table_MET_DP108643.jpg/330px-Bureau_table_MET_DP108643.jpg',
      sourcePage: 'https://en.wikipedia.org/wiki/Desk',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Writing desk, Metropolitan Museum of Art / Wikimedia Commons',
      usageNote: 'Warm writing-room plate behind Feuerbach, softened by humanist candle light.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/feuerbach.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ludwig_Feuerbach-1.2_V01-1.1.1_cropped_and_rotated.jpg/250px-Ludwig_Feuerbach-1.2_V01-1.1.1_cropped_and_rotated.jpg',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Ludwig_Feuerbach-1.2_V01-1.1.1_cropped_and_rotated.jpg',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Ludwig Feuerbach portrait / Wikimedia Commons',
      usageNote: 'Use the sourced local portrait plate for the humanist chapter.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'Warm humanist writing room, table, candle, window toward ordinary life.',
      collectionStrategy: 'Source open interior, writing desk, candle, and humanist portrait-room textures.',
      neededLayers: ['warm writing table', 'human portrait wall', 'distant steeple/window'],
      status: 'procedural-fallback',
    },
  },
  marx: {
    id: 'marx',
    display: {
      presentation: 'portrait-plate',
      galleryFrame: 'illuminated-manuscript',
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/marx-factory.jpg`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Strickmaschine_im_Museum.JPG/330px-Strickmaschine_im_Museum.JPG',
      sourcePage: 'https://en.wikipedia.org/wiki/Power_loom',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Power loom machinery / Wikimedia Commons',
      usageNote: 'Use the industrial plate behind Marx together with factory overlays.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/marx.png`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored_%26_Adjusted_%283x4_cropped_b%29.png/500px-Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored_%26_Adjusted_%283x4_cropped_b%29.png',
      sourcePage:
        'https://commons.wikimedia.org/wiki/File:Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored_%26_Adjusted_(3x4_cropped_b).png',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Karl Marx photograph by John Jabez Edwin Mayall / Wikimedia Commons',
      usageNote: 'Use as the monumental library-factory portrait plate with industrial green rim light.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'British Museum reading room dissolving into factory floor and chimney haze.',
      collectionStrategy: 'Source public-domain reading room, factory, ledger, and smoke-city imagery.',
      neededLayers: ['open manuscript ledger', 'factory floor', 'city chimneys'],
      status: 'procedural-fallback',
    },
  },
  engels: {
    id: 'engels',
    display: {
      presentation: 'portrait-plate',
      galleryFrame: 'illuminated-manuscript',
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/engels-manchester.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tower_Blocks_over_Knott_Mill%2C_geograph_6866152_by_David_Dixon.jpg/330px-Tower_Blocks_over_Knott_Mill%2C_geograph_6866152_by_David_Dixon.jpg',
      sourcePage: 'https://en.wikipedia.org/wiki/Manchester',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Manchester city/industry context / Wikimedia Commons',
      usageNote: 'Systems-and-city plate behind Engels, paired with network overlays.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/engels.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Friedrich_Engels_portrait_%28cropped%29.jpg/250px-Friedrich_Engels_portrait_%28cropped%29.jpg',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Friedrich_Engels_portrait_(cropped).jpg',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Friedrich Engels portrait / Wikimedia Commons',
      usageNote: 'Use as the systems-map portrait plate with linked scientific diagrams.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'Drafting table, city, scientific map, nature-society-thinking connection board.',
      collectionStrategy: 'Source open drafting-table, Manchester industrial, map, and diagram textures.',
      neededLayers: ['drafting table', 'systems map', 'city/nature panels'],
      status: 'procedural-fallback',
    },
  },
  lenin: {
    id: 'lenin',
    display: {
      presentation: 'portrait-plate',
      galleryFrame: 'illuminated-manuscript',
    },
    backdropPlate: {
      localPath: `${ASSET_BASE}/backdrops/lenin-smolny.jpg`,
      remoteUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/RUS-2016-SPB-Smolny_Institute_02.jpg/330px-RUS-2016-SPB-Smolny_Institute_02.jpg',
      sourcePage: 'https://en.wikipedia.org/wiki/Smolny_Institute',
      license: 'Wikimedia/Wikipedia thumbnail; see source page for current reuse terms.',
      credit: 'Smolny Institute, Saint Petersburg / Wikimedia Commons',
      usageNote: 'Use the local revolutionary operations backdrop for Lenin.',
      downloaded: true,
    },
    portrait: {
      localPath: `${ASSET_BASE}/portraits/lenin.jpg`,
      remoteUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Lenin_in_1920_%28cropped%29.jpg/250px-Lenin_in_1920_%28cropped%29.jpg',
      sourcePage: 'https://commons.wikimedia.org/wiki/File:Lenin_in_1920_(cropped).jpg',
      license: 'Wikimedia Commons; see source page for current reuse terms.',
      credit: 'Lenin in 1920 / Wikimedia Commons',
      usageNote: 'Use as the action-strategy portrait plate with red map-table lighting.',
      downloaded: true,
    },
    backdrop: {
      settingBrief: 'Cold operations room, route map, telegrams, station window before dawn.',
      collectionStrategy: 'Source open map, telegram, train-station, red flag, and winter window imagery.',
      neededLayers: ['map table', 'operations room', 'station dawn'],
      status: 'procedural-fallback',
    },
  },
}

export const getPhilosopherAssetPack = (id: string) => philosopherAssetPacks[id]

export const resolveAssetUrl = (path?: string) => {
  if (!path) {
    return undefined
  }

  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalizedPath}`
}
