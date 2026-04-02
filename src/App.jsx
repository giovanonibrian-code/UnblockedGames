import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Play } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-display font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Unblocked Games
            </h1>
          </div>

          <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleFullscreen}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Mobile Search */}
        <div className="relative mb-6 sm:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Hero Section */}
        <div className="mb-12 relative overflow-hidden rounded-3xl bg-indigo-600 p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Play Your Favorite Games Anywhere
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              A collection of high-quality, unblocked web games. No downloads, no signups, just fun.
            </p>
            <button
              onClick={() => {
                const randomGame = games[Math.floor(Math.random() * games.length)];
                if (randomGame) setSelectedGame(randomGame);
              }}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Surprise Me
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              layoutId={game.id}
              onClick={() => setSelectedGame(game)}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
              whileHover={{ y: -4 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl">
                    <Play className="text-white w-6 h-6 fill-current" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white mb-1">{game.title}</h3>
                <p className="text-zinc-400 text-sm line-clamp-2">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-indigo-500 w-6 h-6" />
            <span className="font-display font-bold text-white">Unblocked Games Hub</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Unblocked Games Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Game Player Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
              onClick={() => setSelectedGame(null)}
            />
            <motion.div
              layoutId={selectedGame.id}
              className="relative w-full max-w-6xl aspect-video bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col"
            >
              {/* Game Toolbar */}
              <div className="bg-zinc-800/50 px-6 py-4 flex items-center justify-between border-b border-zinc-700">
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-lg text-white">{selectedGame.title}</h3>
                  <a
                    href={selectedGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
