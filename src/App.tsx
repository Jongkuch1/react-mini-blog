import Header from './components/Header';
import PostList from './components/PostList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <PostList />
      </main>
    </div>
  );
}

export default App;
