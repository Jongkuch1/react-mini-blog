import type { PostData } from '../types/Post';
import Post from './Post';
import './PostList.css';

// Hardcoded sample posts. `date` uses ISO strings so Post can compute
// whether a post is "new" (posted within the last 24 hours).
const samplePosts: PostData[] = [
  {
    id: 1,
    title: 'Getting Started with TypeScript in React',
    author: 'Amina Kone',
    content:
      'TypeScript adds static typing to JavaScript, catching bugs before they hit production and making large React codebases far easier to navigate and refactor with confidence.',
    date: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Why Vite Beats Older Bundler-Based Tooling',
    author: 'Daniel Osei',
    content:
      'Vite uses native ES modules during development, giving near-instant server start and hot module replacement compared to older bundler-based tooling like Webpack.',
    date: '2026-09-01T09:00:00Z',
  },
  {
    id: 3,
    title: 'Understanding Higher-Order Components',
    author: 'Grace Mwangi',
    content:
      'A higher-order component is a function that takes a component and returns a new component, letting you reuse logic like logging or authentication across your app.',
    date: '2026-08-20T14:30:00Z',
  },
];

/**
 * Renders the list of posts. Each Post gets a stable, unique `key`
 * (the post id) so React can efficiently reconcile the list on updates.
 */
function PostList() {
  return (
    <section className="post-list">
      <h2 className="post-list__heading">Latest Posts</h2>
      <div className="post-list__grid">
        {samplePosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
