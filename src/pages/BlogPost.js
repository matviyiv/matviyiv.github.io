import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTag, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getPostBySlug } from '../data/blogPosts';
import AnimatedSection from '../components/AnimatedSection';

// Import blog post content
import McpServerLocalLlm from '../posts/mcp-server-local-llm';
import RedBlueSecureAiCodeReview from '../posts/redblue-secure-ai-code-review';

// Map of slug to content component
const postContent = {
  'mcp-server-local-llm': McpServerLocalLlm,
  'redblue-secure-ai-code-review': RedBlueSecureAiCodeReview
};

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card p-12 text-center">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">Post Not Found</h1>
          <p className="text-slate-300 mb-6">The article you're looking for doesn't exist.</p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ContentComponent = postContent[slug];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/articles')}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>
      </div>

      {/* Article Container - Medium-like width */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedSection>
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                {post.title}
              </span>
            </h1>

            {post.subtitle && (
              <p className="text-2xl text-slate-400 mb-8 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Cover Image - Lazy loaded, 80% width */}
            {post.coverImage && (
              <div className="my-8 flex justify-center">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="w-[80%] h-auto rounded-lg shadow-2xl shadow-cyan-500/20 border border-slate-700/50 object-cover"
                  style={{
                    contentVisibility: 'auto',
                    willChange: 'auto'
                  }}
                />
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pb-8 border-b border-slate-700/50">
              {post.author && (
                <span className="text-blue-300 font-semibold text-base">
                  {post.author}
                </span>
              )}
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} className="text-cyan-500" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-purple-500" />
                {post.readTime} min read
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-full"
                >
                  <FontAwesomeIcon icon={faTag} className="text-xs" />
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </AnimatedSection>

        {/* Article Content - Medium-like typography */}
        <div className="blog-content text-slate-300 leading-relaxed">
          {ContentComponent ? <ContentComponent /> : (
            <p className="text-slate-400 italic">Content coming soon...</p>
          )}
        </div>

        {/* Footer - Share/Navigation */}
        <footer className="mt-16 pt-8 border-t border-slate-700/50">
            <div className="flex justify-between items-center">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg font-medium transition-all duration-300"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                All Articles
              </Link>

              <div className="flex gap-3">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </footer>
      </article>
    </div>
  );
}

export default BlogPost;
