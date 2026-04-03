import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import PostPreview from '../components/PostPreview';
import { getAllPosts } from '../data/blogPosts';

function Articles() {
  const posts = getAllPosts();

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <div className="mb-12">
          <h1 className="section-title">My Articles</h1>
          <p className="text-slate-300 text-lg mt-4">
            Technical articles about software architecture, AI, and development best practices.
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-8">
        {posts.map((post) => (
          <AnimatedSection key={post.id}>
            <PostPreview post={post} />
          </AnimatedSection>
        ))}
      </div>

      {posts.length === 0 && (
        <AnimatedSection>
          <div className="glass-card p-12 text-center">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">No Articles Yet</h3>
            <p className="text-slate-300">
              Check back soon for technical articles and insights!
            </p>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}

export default Articles;
