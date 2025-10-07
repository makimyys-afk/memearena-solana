import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Swords, Plus, Users, Trophy } from 'lucide-react'

const ArenaPage = () => {
  const [activeBattles] = useState([
    {
      id: 1,
      playerA: { wallet: 'So1ana...King', fighter: 'BONK', avatar: '/ui-assets/player_avatar_1.png' },
      playerB: null,
      wager: 0.5,
      status: 'waiting',
    },
    {
      id: 2,
      playerA: { wallet: 'Wif...Doge', fighter: 'WIF', avatar: '/ui-assets/player_avatar_2.png' },
      playerB: { wallet: 'Popcat...Lover', fighter: 'POPCAT', avatar: '/ui-assets/player_avatar_3.png' },
      wager: 1.0,
      status: 'ready',
    },
    {
      id: 3,
      playerA: { wallet: 'Myro...HODL', fighter: 'MYRO', avatar: '/ui-assets/player_avatar_1.png' },
      playerB: null,
      wager: 0.25,
      status: 'waiting',
    },
  ])

  return (
    <div 
      className="min-h-screen pt-24 pb-12"
      style={{
        backgroundImage: 'url(/ui-assets/arena_battle_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
            Battle Arena
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Create or join battles. Winner takes all!
          </p>

          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 font-bold text-lg px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(153,69,255,0.6)]"
          >
            <Plus className="w-6 h-6 mr-2" />
            Create New Battle
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Swords, label: 'Active Battles', value: '12', color: 'from-[#9945FF] to-purple-600' },
            { icon: Users, label: 'Players Online', value: '247', color: 'from-[#14F195] to-green-600' },
            { icon: Trophy, label: 'Total Prize Pool', value: '45.3 SOL', color: 'from-yellow-500 to-orange-600' },
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
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Active Battles */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-6">Active Battles</h2>
          
          {activeBattles.map((battle, index) => (
            <motion.div
              key={battle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/30 hover:border-[#14F195] rounded-2xl p-6 transition-all"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Player A */}
                <div className="flex items-center gap-4 flex-1">
                  <img 
                    src={battle.playerA.avatar}
                    alt="Player A"
                    className="w-16 h-16 rounded-full border-2 border-[#9945FF]"
                  />
                  <div>
                    <p className="text-white font-bold">{battle.playerA.wallet}</p>
                    <p className="text-[#14F195] text-sm">{battle.playerA.fighter}</p>
                  </div>
                  <img 
                    src={`/icons/${battle.playerA.fighter.toLowerCase()}_icon.png`}
                    alt={battle.playerA.fighter}
                    className="w-12 h-12"
                  />
                </div>

                {/* VS / Wager */}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold px-6 py-2 rounded-full mb-2">
                    VS
                  </div>
                  <p className="text-gray-300 text-sm">Wager: <span className="text-yellow-500 font-bold">{battle.wager} SOL</span></p>
                  <p className="text-gray-400 text-xs">Prize: {(battle.wager * 2 * 0.97).toFixed(2)} SOL</p>
                </div>

                {/* Player B or Join Button */}
                {battle.playerB ? (
                  <div className="flex items-center gap-4 flex-1 justify-end">
                    <img 
                      src={`/icons/${battle.playerB.fighter.toLowerCase()}_icon.png`}
                      alt={battle.playerB.fighter}
                      className="w-12 h-12"
                    />
                    <div className="text-right">
                      <p className="text-white font-bold">{battle.playerB.wallet}</p>
                      <p className="text-[#14F195] text-sm">{battle.playerB.fighter}</p>
                    </div>
                    <img 
                      src={battle.playerB.avatar}
                      alt="Player B"
                      className="w-16 h-16 rounded-full border-2 border-[#14F195]"
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex justify-end">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center mb-2 mx-auto">
                        <Users className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-gray-500 text-sm mb-3">Waiting for opponent...</p>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="md:ml-4">
                  {battle.status === 'waiting' ? (
                    <Button className="bg-[#14F195] hover:bg-[#14F195]/80 text-black font-bold">
                      Join Battle
                    </Button>
                  ) : (
                    <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 font-bold">
                      Watch Live
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game Modes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
          >
            <img 
              src="/ui-assets/banner_airdrop_mode.png"
              alt="Airdrop Mode"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Airdrop Mode</h3>
                <p className="text-gray-300">Battle royale with multiple players</p>
                <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  Coming Soon
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
          >
            <img 
              src="/ui-assets/banner_rug_war_mode.png"
              alt="Rug War Mode"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Rug War Mode</h3>
                <p className="text-gray-300">Team-based battles with special rules</p>
                <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold">
                  Coming Soon
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ArenaPage
