import { PureComponent, type CSSProperties } from 'react';
import type { PostData } from '../types/Post';
import './Post.css';

interface PostProps {
  post: PostData;
}

const HIGHLIGHTED_AUTHOR = 'Amina Kone';
const PREVIEW_WORD_COUNT = 14;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function isNewPost(dateString: string): boolean {
  return Date.now() - new Date(dateString).getTime() <= ONE_DAY_MS;
}

function getPreview(content: string): string {
  const words = content.trim().split(/\s+/);
  if (words.length <= PREVIEW_WORD_COUNT) return content;
  return `${words.slice(0, PREVIEW_WORD_COUNT).join(' ')}...`;
}

/**
 * Class component (extends PureComponent) rather than functional.
 *
 * Why a class here: this is the component most likely to be rendered many
 * times over in a list, so it's the one where the built-in shallow prop
 * comparison of PureComponent is most valuable — it skips re-rendering a
 * post whose `post` prop hasn't changed, even if a sibling post updates.
 * Every other component in this app is a plain function since they don't
 * need lifecycle methods or that comparison behavior.
 */
class Post extends PureComponent<PostProps> {
  render() {
    const { post } = this.props;
    const isHighlighted = post.author === HIGHLIGHTED_AUTHOR;
    const isNew = isNewPost(post.date);

    // Inline styles used here (in addition to the external Post.css file)
    // specifically for conditional, data-driven styling.
    const cardStyle: CSSProperties = {
      backgroundColor: isHighlighted ? '#fff4e0' : '#ffffff',
      borderLeft: isHighlighted ? '4px solid #f5a623' : '4px solid transparent',
    };

    return (
      <article className="post-card" style={cardStyle}>
        <div className="post-card__header">
          <h3 className="post-card__title">{post.title}</h3>
          {isNew && <span className="post-card__badge">New!</span>}
        </div>
        <p className="post-card__meta">
          By <strong>{post.author}</strong> · {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="post-card__preview">{getPreview(post.content)}</p>
      </article>
    );
  }
}

export default Post;
