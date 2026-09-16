import { memo } from 'react';
import { withLogger } from '../hoc/withLogger';
import './Header.css';

/**
 * Simple, static header — a good candidate for React.memo since it
 * takes no props and never needs to re-render once mounted.
 */
function Header() {
  return (
    <header className="header">
      <span className="header__logo">Dev Insights</span>
      <nav className="header__nav">
        <a href="#new-post" className="header__nav-link">
          New Post
        </a>
      </nav>
    </header>
  );
}

const MemoizedHeader = memo(Header);

export default withLogger(MemoizedHeader, 'Header');
