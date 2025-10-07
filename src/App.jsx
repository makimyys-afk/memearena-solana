import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import ArenaPage from './pages/ArenaPage'
import MemeDexPage from './pages/MemeDexPage'
import LeaderboardPage from './pages/LeaderboardPage'
import RewardsPage from './pages/RewardsPage'
import LiveBattlePage from './pages/LiveBattlePage'

// Components
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navigation />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/arena" element={<ArenaPage />} />
            <Route path="/memedex" element={<MemeDexPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/battle/:id" element={<LiveBattlePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App
