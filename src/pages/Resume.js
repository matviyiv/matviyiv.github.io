import React from 'react';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Technologies from '../components/Technologies';
import Languages from '../components/Languages';
import AnimatedSection from '../components/AnimatedSection';

function Resume({ resumeData }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <About text={resumeData.aboutMe} />
      </AnimatedSection>
      <AnimatedSection>
        <Experience experiences={resumeData.experiences} />
      </AnimatedSection>
      <AnimatedSection>
        <Skills skills={resumeData.skills} />
      </AnimatedSection>
      <AnimatedSection>
        <Technologies text={resumeData.technologiesOverview} />
      </AnimatedSection>
      <AnimatedSection>
        <Education education={resumeData.education} />
      </AnimatedSection>
      <AnimatedSection>
        <Languages languages={resumeData.languages} />
      </AnimatedSection>
    </div>
  );
}

export default Resume;
