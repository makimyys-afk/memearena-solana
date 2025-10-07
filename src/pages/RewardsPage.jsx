import { motion } from 'framer-motion'
import { Coins, TrendingUp, Users, Percent } from 'lucide-react'

const RewardsPage = () => {
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
                <h2 className="text-5xl font-bold text-yellow-500 mb-2">1,234.56 SOL</h2>
                <p className="text-gray-400">Accumulated from 3% platform fees</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Coins, label: 'Total Volume', value: '41,152 SOL', color: 'from-yellow-500 to-orange-500' },
            { icon: TrendingUp, label: 'Total Battles', value: '8,234', color: 'from-[#9945FF] to-purple-600' },
            { icon: Users, label: 'Active Players', value: '1,547', color: 'from-[#14F195] to-green-600' },
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
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Fee Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Fee Distribution</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Platform Treasury</span>
                <span className="text-[#14F195] font-bold">3%</span>
              </div>
              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#9945FF] to-[#14F195] w-[3%]" />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                All platform fees go to the treasury for ecosystem development and rewards
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Winner Payout</span>
                <span className="text-yellow-500 font-bold">97%</span>
              </div>
              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[97%]" />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Winners receive 97% of the total pot immediately after battle resolution
              </p>
            </div>
          </div>
        </motion.div>

        {/* How to Earn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 border-2 border-[#9945FF]/50 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How to Earn Rewards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Win Battles',
                description: 'Defeat opponents to claim the prize pool. Each win adds to your total earnings.',
                icon: '⚔️',
              },
              {
                title: 'Climb Leaderboard',
                description: 'Top players earn recognition and future exclusive rewards.',
                icon: '🏆',
              },
              {
                title: 'Stay Active',
                description: 'Regular players may receive airdrops and special bonuses.',
                icon: '🎁',
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RewardsPage
