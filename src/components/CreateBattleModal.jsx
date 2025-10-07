import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import fightersData from '../assets/meme-data.json'

export const CreateBattleModal = ({ open, onClose, onCreate }) => {
  const [wager, setWager] = useState(0.1)
  const [selectedFighter, setSelectedFighter] = useState(null)

  const handleCreate = () => {
    if (!selectedFighter) {
      alert('Please select a fighter!')
      return
    }
    if (wager < 0.01) {
      alert('Minimum wager is 0.01 SOL')
      return
    }
    onCreate(wager, selectedFighter)
    onClose()
    setSelectedFighter(null)
    setWager(0.1)
  }

  return (
    <AnimatePresence>
      {open && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-black to-[#9945FF]/20 border-2 border-[#9945FF] rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Create Battle</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Wager Input */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-semibold">Wager Amount (SOL)</label>
              <input 
                type="number" 
                value={wager} 
                onChange={(e) => setWager(parseFloat(e.target.value) || 0)}
                step={0.01}
                min={0.01}
                className="w-full bg-black/60 border-2 border-[#9945FF]/30 rounded-xl px-4 py-3 text-white text-xl font-bold focus:border-[#14F195] focus:outline-none"
                placeholder="0.1"
              />
              <p className="text-gray-400 text-sm mt-2">
                Winner receives: <span className="text-[#14F195] font-bold">{(wager * 2 * 0.97).toFixed(3)} SOL</span> (3% platform fee)
              </p>
            </div>

            {/* Fighter Selection */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-4 font-semibold">Choose Your Fighter</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {fightersData.fighters.map(fighter => (
                  <motion.div 
                    key={fighter.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedFighter(fighter.symbol)}
                    className={`cursor-pointer border-2 rounded-xl p-3 transition-all ${
                      selectedFighter === fighter.symbol 
                        ? 'border-[#14F195] bg-[#14F195]/20' 
                        : 'border-gray-700 hover:border-[#9945FF]'
                    }`}
                  >
                    <img 
                      src={`/src/assets/icons/${fighter.symbol.toLowerCase()}_icon.png`} 
                      alt={fighter.symbol}
                      className="w-full h-auto mb-2"
                    />
                    <p className="text-xs text-center text-white font-bold">{fighter.symbol}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Fighter Info */}
            {selectedFighter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/60 border-2 border-[#14F195]/30 rounded-xl p-4 mb-6"
              >
                <p className="text-gray-300 mb-2">Selected Fighter:</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={`/src/assets/icons/${selectedFighter.toLowerCase()}_icon.png`} 
                    alt={selectedFighter}
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="text-xl font-bold text-[#14F195]">{selectedFighter}</p>
                    <p className="text-sm text-gray-400">
                      {fightersData.fighters.find(f => f.symbol === selectedFighter)?.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Create Button */}
            <Button 
              onClick={handleCreate}
              disabled={!selectedFighter || wager < 0.01}
              className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 font-bold text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Battle for {wager} SOL
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
