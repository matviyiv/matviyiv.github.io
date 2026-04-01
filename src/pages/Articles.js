import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCalendar, faTag } from '@fortawesome/free-solid-svg-icons';
import AnimatedSection from '../components/AnimatedSection';

function Articles() {
  // Sample articles - you can replace with real data or fetch from API
  const articles = [
    {
      id: 1,
      title: 'Building Scalable Microservices with Node.js',
      excerpt: 'Learn how to architect and deploy microservices at scale using Node.js, Docker, and Kubernetes.',
      url: 'http://jsgags.blogspot.com/',
      date: '2024-03-15',
      tags: ['Node.js', 'Microservices', 'Kubernetes'],
      external: true
    },
    {
      id: 2,
      title: 'WebRTC: Real-time Communication in the Browser',
      excerpt: 'Deep dive into WebRTC technology and how to implement peer-to-peer video calls in your web applications.',
      url: 'http://jsgags.blogspot.com/',
      date: '2024-02-20',
      tags: ['WebRTC', 'JavaScript', 'Real-time'],
      external: true
    },
    {
      id: 3,
      title: 'AWS Lambda Best Practices for Production',
      excerpt: 'Essential tips and patterns for running serverless functions in production environments.',
      url: 'http://jsgags.blogspot.com/',
      date: '2024-01-10',
      tags: ['AWS', 'Lambda', 'Serverless'],
      external: true
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="section-title">My Articles</h1>
          <p className="text-slate-300 text-lg mt-4">
            Thoughts on software architecture, development practices, and technology trends.
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <AnimatedSection key={article.id}>
            <article className="glass-card p-8 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                <h2 className="text-2xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors">
                  {article.title}
                </h2>
                {article.external && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                    External
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} className="text-cyan-500" />
                  {formatDate(article.date)}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-full hover:bg-blue-500/20 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTag} className="text-xs" />
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                >
                  Read Article
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </div>
            </article>
          </AnimatedSection>
        ))}
      </div>

      {/* Empty state or CTA */}
      <AnimatedSection>
        <div className="glass-card p-8 mt-8 text-center border-l-4 border-purple-500">
          <h3 className="text-xl font-bold text-purple-400 mb-3">More Articles Coming Soon!</h3>
          <p className="text-slate-300 mb-4">
            Check out my blog for more technical articles and insights.
          </p>
          <a
            href="http://jsgags.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
          >
            Visit My Blog
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}

export default Articles;
