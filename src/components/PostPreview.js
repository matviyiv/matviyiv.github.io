import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faTag, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function PostPreview({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="glass-card p-8 hover:border-cyan-400/50 transition-all duration-300 group">
      {/* Post Header */}
      <Link to={`/articles/${post.slug}`} className="block">
        <h2 className="text-3xl font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors mb-3">
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="text-xl text-slate-400 mb-4 leading-relaxed">
            {post.subtitle}
          </p>
        )}
      </Link>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6 pb-6 border-b border-slate-700/50">
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} className="text-cyan-500" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-2">
          <FontAwesomeIcon icon={faClock} className="text-purple-500" />
          {post.readTime} min read
        </span>
        {post.author && (
          <span className="text-blue-300 font-medium">
            by {post.author}
          </span>
        )}
      </div>

      {/* Excerpt */}
      <p className="text-slate-300 leading-relaxed text-lg mb-6">
        {post.excerpt}
      </p>

      {/* Tags and Read More */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-full hover:bg-blue-500/20 transition-colors"
            >
              <FontAwesomeIcon icon={faTag} className="text-xs" />
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/articles/${post.slug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 group"
        >
          Read Article
          <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export default PostPreview;
