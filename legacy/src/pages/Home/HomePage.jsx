import HeroSection from './sections/HeroSection'
import PopularDestinationsSection from './sections/PopularDestinationsSection'
import RouteDivider from './sections/RouteDivider'
import FeaturedPackagesSection from './sections/FeaturedPackagesSection'
import WhyChooseUsSection from './sections/WhyChooseUsSection'
import TravelGallery from './sections/TravelGallery'
import TestimonialsSection from './sections/TestimonialsSection'
import LatestBlogsSection from './sections/LatestBlogsSection'
import ContactCTASection from './sections/ContactCTASection'
import FaqSection from './sections/FaqSection'
import TravelLinkHubSection from './sections/TravelLinkHubSection'

const HomePage = ({ initialData = null }) => {
  return (
    <div className="w-full overflow-hidden bg-[#FAF8F4] text-dark-900">
      <HeroSection />
      <PopularDestinationsSection initialDestinations={initialData?.destinations} />
      <RouteDivider />
      <FeaturedPackagesSection initialPackages={initialData?.packages} />
      <WhyChooseUsSection />
      <TravelGallery />
      <TestimonialsSection />
      <LatestBlogsSection initialBlogs={initialData?.blogs || []} />
      <ContactCTASection />
      <FaqSection />
      <TravelLinkHubSection />
    </div>
  )
}

export default HomePage
