import { motion } from 'framer-motion'
import { Coins, TrendingUp, Users, Percent } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getAllBattles, getLeaderboard } from '../utils/solana'

const RewardsPage = () => {
  const [stats, setStats] = useState({
    totalVolume: 0,
    totalBattles: 0,
    activePlayers: 0,
    treasuryBalance: 0,
  })

  useEffect(() => {
    loadStats()
    const interval = setInterval(loadStats, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadStats = () => {
    const battles = getAllBattles()
    const leaderboard = getLeaderboard()
    
    // Calculate total volume (all wagers * 2)
    const totalVolume = battles.reduce((sum, b) => sum + (b.wager * 2), 0)
    
    // Calculate treasury (3% of total volume)
    const treasuryBalance = totalVolume * 0.03
    
    setStats({
      totalVolume: totalVolume.toFixed(2),
      totalBattles: battles.length,
      activePlayers: leaderboard.length,
      treasuryBalance: treasuryBalance.toFixed(3),
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-[#9945FF]/10 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
            Rewards & Treasury
          </h1>
          <p className="text-xl text-gray-300">
            Track the global treasury and platform economics
          </p>
        </motion.div>

        {/* Treasury Vault */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative">
            <img 
              src="/ui-assets/treasury_vault.png"
              alt="Treasury Vault"
              className="w-full h-auto rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-3xl flex items-end justify-center p-8">
              <div className="text-center">
                <p className="text-gray-300 text-lg mb-2">Global Treasury</p>
                <h2 className="text-5xl font-bold text-yellow-500 mb-2">{stats.treasuryBalance} SOL</h2>
                <p className="text-gray-400">Accumulated from 3% platform fees</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Coins, label: 'Total Volume', value: `${stats.totalVolume} SOL`, color: 'from-yellow-500 to-orange-500' },
            { icon: TrendingUp, label: 'Total Battles', value: stats.totalBattles, color: 'from-[#9945FF] to-purple-600' },
            { icon: Users, label: 'Active Players', value: stats.activePlayers, color: 'from-[#14F195] to-green-600' },
            { icon: Percent, label: 'Platform Fee', value: '3%', color: 'from-pink-500 to-red-500' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-6"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">How Platform Economics Work</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9945FF] to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Players Stake SOL</h3>
                <p className="text-gray-400">
                  Two players stake equal amounts of SOL to enter a battle. The total pot is doubled.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14F195] to-green-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Battle Resolves</h3>
                <p className="text-gray-400">
                  The winner is determined randomly (50/50 chance). All fighters have equal stats for fairness.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Winner Takes 97%</h3>
                <p className="text-gray-400">
                  The winner receives 97% of the total pot. A 3% platform fee goes to the treasury for development and maintenance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Example Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 border-2 border-[#9945FF] rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Example Battle</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-gray-400 mb-2">Player A Stakes</p>
              <p className="text-4xl font-bold text-[#9945FF]">1.0 SOL</p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-6xl text-[#14F195]">+</div>
            </div>
            
            <div>
              <p className="text-gray-400 mb-2">Player B Stakes</p>
              <p className="text-4xl font-bold text-[#9945FF]">1.0 SOL</p>
            </div>
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#9945FF] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/60 rounded-xl p-6 text-center">
              <p className="text-gray-400 mb-2">Winner Receives</p>
              <p className="text-5xl font-bold text-[#14F195] mb-2">1.94 SOL</p>
              <p className="text-sm text-gray-500">(97% of 2.0 SOL)</p>
            </div>
            
            <div className="bg-black/60 rounded-xl p-6 text-center">
              <p className="text-gray-400 mb-2">Platform Fee</p>
              <p className="text-5xl font-bold text-yellow-500 mb-2">0.06 SOL</p>
              <p className="text-sm text-gray-500">(3% of 2.0 SOL)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RewardsPage
