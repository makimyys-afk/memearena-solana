import { motion } from 'framer-motion'
import { Trophy, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getLeaderboard } from '../utils/solana'

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    loadLeaderboard()
    const interval = setInterval(loadLeaderboard, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadLeaderboard = () => {
    const data = getLeaderboard()
    setLeaderboard(data)
  }

  const getMedalIcon = (rank) => {
    if (rank === 1) return '/ui-assets/medal_gold.png'
    if (rank === 2) return '/ui-assets/medal_silver.png'
    if (rank === 3) return '/ui-assets/medal_bronze.png'
    return null
  }

  const getMedalColor = (rank) => {
    if (rank === 1) return 'from-yellow-500 to-yellow-600'
    if (rank === 2) return 'from-gray-400 to-gray-500'
    if (rank === 3) return 'from-orange-600 to-orange-700'
    return 'from-gray-700 to-gray-800'
  }

  const topThree = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3)

  return (
    <div 
      className="min-h-screen pt-24 pb-12"
      style={{
        backgroundImage: 'url(/ui-assets/leaderboard_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-16 h-16 text-yellow-500" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <Trophy className="w-16 h-16 text-yellow-500" />
          </div>
          <p className="text-xl text-gray-300">
            Top fighters in the MemeArena
          </p>
        </motion.div>

        {leaderboard.length === 0 ? (
          <div className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-lg">No battles yet. Be the first to compete!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                {[1, 0, 2].map((index) => {
                  const player = topThree[index]
                  if (!player) return null
                  
                  return (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`relative ${index === 1 ? 'md:-mt-8' : 'md:mt-8'}`}
                    >
                      <div className={`bg-gradient-to-br ${getMedalColor(player.rank)} p-1 rounded-2xl`}>
                        <div className="bg-black/90 rounded-2xl p-6 text-center">
                          {/* Medal */}
                          <div className="relative mb-4">
                            <img 
                              src={getMedalIcon(player.rank)}
                              alt={`Rank ${player.rank}`}
                              className="w-24 h-24 mx-auto drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                            />
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl">
                              {player.rank}
                            </div>
                          </div>

                          {/* Player Info */}
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {player.wallet}
                          </h3>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Wins</span>
                              <span className="text-green-500 font-bold">{player.wins}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Losses</span>
                              <span className="text-red-500 font-bold">{player.losses}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                              <span className="text-gray-400">Earned</span>
                              <span className="text-yellow-500 font-bold flex items-center gap-1">
                                <img src="/ui-assets/sol_coin_icon.png" alt="SOL" className="w-4 h-4" />
                                {player.earnedSol.toFixed(3)} SOL
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Full Leaderboard Table */}
            {rest.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-bold">Rank</th>
                        <th className="px-6 py-4 text-left text-white font-bold">Player</th>
                        <th className="px-6 py-4 text-center text-white font-bold">Wins</th>
                        <th className="px-6 py-4 text-center text-white font-bold">Losses</th>
                        <th className="px-6 py-4 text-center text-white font-bold">Win Rate</th>
                        <th className="px-6 py-4 text-right text-white font-bold">Earned SOL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rest.map((player, index) => (
                        <motion.tr
                          key={player.rank}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold">
                              {player.rank}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center text-white font-bold">
                                {player.wallet.charAt(0)}
                              </div>
                              <span className="text-white font-semibold">{player.wallet}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-green-500 font-bold">{player.wins}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-red-500 font-bold">{player.losses}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-[#14F195] font-bold">
                              {((player.wins / (player.wins + player.losses)) * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <img src="/ui-assets/sol_coin_icon.png" alt="SOL" className="w-5 h-5" />
                              <span className="text-yellow-500 font-bold">{player.earnedSol.toFixed(3)}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Stats Summary */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-6 text-center"
              >
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-[#14F195]" />
                <h3 className="text-3xl font-bold text-white mb-2">
                  {leaderboard.reduce((sum, p) => sum + p.wins + p.losses, 0)}
                </h3>
                <p className="text-gray-400">Total Battles</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-6 text-center"
              >
                <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-3xl font-bold text-white mb-2">
                  {leaderboard[0]?.wallet || 'N/A'}
                </h3>
                <p className="text-gray-400">Top Champion</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-6 text-center"
              >
                <img src="/ui-assets/sol_coin_icon.png" alt="SOL" className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">
                  {leaderboard.reduce((sum, p) => sum + p.earnedSol, 0).toFixed(2)} SOL
                </h3>
                <p className="text-gray-400">Total Distributed</p>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default LeaderboardPage
