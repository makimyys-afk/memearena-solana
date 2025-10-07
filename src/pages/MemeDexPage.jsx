import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import fightersData from '../assets/meme-data.json'

const MemeDexPage = () => {
  const [selectedFighter, setSelectedFighter] = useState(null)
  const fighters = fightersData.fighters

  const typeColors = {
    'Canine': 'from-orange-500 to-amber-500',
    'Cat': 'from-pink-500 to-purple-500',
    'Token Lord': 'from-yellow-500 to-green-500',
    'AI Entity': 'from-cyan-500 to-blue-500',
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
            MemeDex
          </h1>
          <p className="text-xl text-gray-300">
            Choose your champion from 20 legendary memecoin fighters
          </p>
        </motion.div>

        {/* Fighters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fighters.map((fighter, index) => (
            <motion.div
              key={fighter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedFighter(fighter)}
              className="cursor-pointer group"
            >
              <div 
                className="relative rounded-2xl overflow-hidden border-2 border-[#9945FF]/30 hover:border-[#14F195] transition-all"
                style={{
                  backgroundImage: `url(/src/assets/backgrounds/${fighter.symbol.toLowerCase()}_bg.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Fighter Image */}
                  <div className="mb-4">
                    <img 
                      src={`/src/assets/characters/${fighter.symbol.toLowerCase()}_main.png`}
                      alt={fighter.name}
                      className="w-full h-48 object-contain drop-shadow-[0_0_20px_rgba(153,69,255,0.6)]"
                    />
                  </div>

                  {/* Fighter Info */}
                  <div className="text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 bg-gradient-to-r ${typeColors[fighter.type] || 'from-gray-500 to-gray-600'}`}>
                      {fighter.type}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 text-white">
                      {fighter.name}
                    </h3>
                    
                    <p className="text-sm text-[#14F195] font-bold mb-3">
                      ${fighter.symbol}
                    </p>

                    <div className="text-xs

 text-gray-400 italic mb-4">
                      "{fighter.ability}"
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(fighter.stats).map(([stat, value]) => (
                        <div key={stat} className="bg-black/40 rounded px-2 py-1">
                          <span className="text-gray-400">{stat}:</span>
                          <span className="text-[#14F195] font-bold ml-1">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fighter Detail Modal */}
        {selectedFighter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedFighter(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-black to-[#9945FF]/20 border-2 border-[#9945FF] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}
                <div className="flex-1">
                  <img 
                    src={`/src/assets/characters/${selectedFighter.symbol.toLowerCase()}_main.png`}
                    alt={selectedFighter.name}
                    className="w-full h-auto drop-shadow-[0_0_30px_rgba(153,69,255,0.8)]"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 bg-gradient-to-r ${typeColors[selectedFighter.type]}`}>
                    {selectedFighter.type}
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-2 text-white">
                    {selectedFighter.name}
                  </h2>
                  
                  <p className="text-2xl text-[#14F195] font-bold mb-4">
                    ${selectedFighter.symbol}
                  </p>

                  <p className="text-gray-300 mb-6">
                    {selectedFighter.description}
                  </p>

                  <div className="bg-black/40 rounded-xl p-4 mb-6">
                    <h3 className="text-lg font-bold mb-3 text-[#14F195]">Special Ability</h3>
                    <p className="text-white italic">"{selectedFighter.ability}"</p>
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 mb-6">
                    <h3 className="text-lg font-bold mb-3 text-[#14F195]">Stats</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedFighter.stats).map(([stat, value]) => (
                        <div key={stat} className="flex justify-between items-center">
                          <span className="text-gray-300">{stat}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-2 bg-black/60 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#9945FF] to-[#14F195]"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                            <span className="text-white font-bold w-8">{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedFighter(null)}
                    className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 font-bold"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MemeDexPage
