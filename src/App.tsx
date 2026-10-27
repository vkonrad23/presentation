import { Header } from './components/Header';
import { Hero, HowItWorks, ProblemSection, SolutionSection } from './components/Introduction';
import { JourneyDemo, SampleJourney } from './components/JourneyExperience';
import { AISystem, EvidenceRoadmap, SafetySection } from './components/SafetyEvidence';
import { AcceleratorFit, ApplicationSnapshot, BusinessModel, CompetitiveLandscape, DevelopmentRoadmap, GoToMarket, TeamSection, UserSegments, WhyNow } from './components/BusinessSections';
import { ImpactDashboard } from './components/ImpactDashboard';
import { PitchTimer } from './components/PitchTimer';
import { ContactSection, FAQ, Footer } from './components/ContactFooter';

export default function App() {
  return <div id="top"><Header /><main id="main"><Hero /><ProblemSection /><SolutionSection /><HowItWorks /><JourneyDemo /><SampleJourney /><AISystem /><SafetySection /><EvidenceRoadmap /><WhyNow /><UserSegments /><ImpactDashboard /><BusinessModel /><GoToMarket /><CompetitiveLandscape /><AcceleratorFit /><DevelopmentRoadmap /><TeamSection /><ApplicationSnapshot /><PitchTimer /><FAQ /><ContactSection /></main><Footer /></div>;
}
