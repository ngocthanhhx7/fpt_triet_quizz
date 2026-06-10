import { homeContent } from '../../data/homeContent'
import { HeroSection } from './HeroSection'
import { IntroSection } from './IntroSection'
import { PageTexture } from './PageTexture'
import { TopicGridSection } from './TopicGridSection'

export function HomePage() {
  return (
    <>
      <PageTexture />
      <HeroSection content={homeContent} />
      <IntroSection intro={homeContent.intro} />
      <TopicGridSection topics={homeContent.topics} />
    </>
  )
}
