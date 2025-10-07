import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const LiveBattlePage = () => {
  const { id } = useParams()
  const [battlePhase, setBattlePhase] = useState('intro') // intro, fighting, result
  const [winner, setWinner] = useState(null)

  const battle = {
    playerA: { wallet: 'So1ana...King', fighter: 'BONK' },
    playerB: { wallet: 'Wif...Doge', fighter: 'WIF' },
    wager: 1.0,
  }

  useEffect(() => {
    // Simulate battle sequence
    const timer1 = setTimeout(() => setBattlePhase('fighting'), 2000)
    const timer2 = setTimeout(() => {
      setWinner(Math.random() > 0.5 ? 'A' : 'B')
      setBattlePhase('result')
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/ui-assets/arena_battle_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative container mx-auto px-4">
        {/* Battle Arena */}
        <div className="max-w-6xl mx-auto">
          {/* Intro Phase */}
          {battlePhase === 'intro' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                BATTLE STARTING
              </h1>
              <div className="flex items-center justify-center gap-12">
                <motion.div
                  animate={{ x: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-center"
                >
                  <img 
                    src={`/characters/${battle.playerA.fighter.toLowerCase()}_main.png`}
                    alt={battle.playerA.fighter}
                    className="w-64 h-64 object-contain mb-4 drop-shadow-[0_0_30px_rgba(153,69,255,0.8)]"
                  />
                  <p className="text-2xl font-bold text-white">{battle.playerA.wallet}</p>
                  <p className="text-xl text-[#9945FF]">{battle.playerA.fighter}</p>
                </motion.div>

                <div className="text-6xl font-bold text-white">VS</div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-center"
                >
                  <img 
                    src={`/characters/${battle.playerB.fighter.toLowerCase()}_main.png`}
                    alt={battle.playerB.fighter}
                    className="w-64 h-64 object-contain mb-4 drop-shadow-[0_0_30px_rgba(20,241,149,0.8)]"
                  />
                  <p className="text-2xl font-bold text-white">{battle.playerB.wallet}</p>
                  <p className="text-xl text-[#14F195]">{battle.playerB.fighter}</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Fighting Phase */}
          {battlePhase === 'fighting' && (
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src="/effects/energy_collision.png"
                  alt="Energy Collision"
                  className="w-full h-auto"
                />
              </motion.div>

              <div className="flex items-center justify-between relative z-10">
                <motion.img 
                  src={`/characters/${battle.playerA.fighter.toLowerCase()}_main.png`}
                  alt={battle.playerA.fighter}
                  animate={{ 
                    x: [0, 50, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(153,69,255,1)]"
                />

                <motion.img 
                  src={`/characters/${battle.playerB.fighter.toLowerCase()}_main.png`}
                  alt={battle.playerB.fighter}
                  animate={{ 
                    x: [0, -50, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(20,241,149,1)]"
                />
              </div>

              {/* Battle Effects */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src="/effects/effect_pump_it.png"
                  alt="Pump It"
                  className="w-96 h-auto"
                />
              </motion.div>
            </div>
          )}

          {/* Result Phase */}
          {battlePhase === 'result' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {/* Victory/Defeat Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={`/effects/${winner ? 'victory_flash' : 'defeat_scene'}.png`}
                  alt="Result"
                  className="w-full h-auto opacity-50"
                />
              </div>

              <div className="relative z-10">
                <motion.h1
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-7xl font-bold mb-8 text-yellow-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.8)]"
                >
                  {winner === 'A' ? battle.playerA.wallet : battle.playerB.wallet} WINS!
                </motion.h1>

                <motion.img 
                  src={`/characters/${winner === 'A' ? battle.playerA.fighter.toLowerCase() : battle.playerB.fighter.toLowerCase()}_main.png`}
                  alt="Winner"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-96 h-96 object-contain mx-auto mb-8 drop-shadow-[0_0_50px_rgba(255,215,0,1)]"
                />

                <div className="bg-black/80 backdrop-blur-sm border-2 border-yellow-500 rounded-2xl p-8 max-w-md mx-auto">
                  <p className="text-2xl text-gray-300 mb-4">Prize Won</p>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <img src="/ui-assets/sol_coin_icon.png" alt="SOL" className="w-12 h-12" />
                    <p className="text-5xl font-bold text-yellow-500">
                      {(battle.wager * 2 * 0.97).toFixed(2)} SOL
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Original Wager: {battle.wager} SOL × 2 = {battle.wager * 2} SOL<br />
                    Platform Fee (3%): {(battle.wager * 2 * 0.03).toFixed(2)} SOL
                  </p>
                </div>

                {/* Token Scatter Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <img 
                    src="/effects/token_scatter.png"
                    alt="Tokens"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Battle Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm border-2 border-[#9945FF]/50 rounded-2xl px-8 py-4"
        >
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Battle ID</p>
              <p className="text-white font-bold">#{id}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Wager</p>
              <p className="text-yellow-500 font-bold">{battle.wager} SOL</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-[#14F195] font-bold capitalize">{battlePhase}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LiveBattlePage
