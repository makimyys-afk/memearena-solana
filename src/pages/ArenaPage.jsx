import { useState, useEffect } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Swords, Plus, Users, Trophy } from 'lucide-react'
import { CreateBattleModal } from '../components/CreateBattleModal'
import { createBattle, joinBattle, getAllBattles } from '../utils/solana'
import { useNavigate } from 'react-router-dom'

const ArenaPage = () => {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const navigate = useNavigate()
  
  const [battles, setBattles] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load battles
  useEffect(() => {
    loadBattles()
    const interval = setInterval(loadBattles, 3000)
    return () => clearInterval(interval)
  }, [])

  const loadBattles = async () => {
    try {
      setError(null)
      const allBattles = await getAllBattles()
      setBattles(allBattles.filter(b => b.status === 'waiting' || b.status === 'active'))
    } catch (error) {
      console.error('Error loading battles:', error)
      setError('Failed to load battles. Please try again.')
      setBattles([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBattle = async (wager, fighter) => {
    if (!connected) {
      alert('Please connect your wallet first!')
      return
    }

    setLoading(true)
    try {
      const battle = await createBattle({ publicKey }, fighter, wager)
      alert(`Battle created! ID: ${battle.id}`)
      await loadBattles()
      setShowCreateModal(false)
    } catch (error) {
      console.error(error)
      alert('Failed to create battle: ' + error.message)
    }
    setLoading(false)
  }

  const handleJoinBattle = async (battle) => {
    if (!connected) {
      alert('Please connect your wallet first!')
      return
    }

    const fighter = prompt('Enter your fighter name (e.g., WIF, MYRO):')
    if (!fighter) return

    setLoading(true)
    try {
      await joinBattle(battle.id, { publicKey }, fighter)
      alert('Joined battle! Redirecting to live battle...')
      navigate(`/battle/${battle.id}`)
    } catch (error) {
      console.error(error)
      alert('Failed to join battle: ' + error.message)
    }
    setLoading(false)
  }

  const stats = {
    activeBattles: battles.length,
    playersOnline: battles.length * 2,
    totalPrizePool: battles.reduce((sum, b) => sum + (b.wager * 2), 0).toFixed(2),
  }

  return (
    <div 
      className="min-h-screen pt-24 pb-12"
      style={{
        backgroundImage: 'url(/ui-assets/arena_background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#9945FF] via-[#14F195] to-[#9945FF] bg-clip-text text-transparent">
            Battle Arena
          </h1>
          <p className="text-xl text-gray-300">
            Create or join battles. Winner takes all!
          </p>
        </div>

        {/* Create Battle Button */}
        <div className="flex justify-center mb-8">
          {connected ? (
            <Button
              onClick={() => setShowCreateModal(true)}
              disabled={loading}
              className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white px-8 py-6 text-lg font-bold"
            >
              <Plus className="mr-2" />
              Create Battle
            </Button>
          ) : (
            <Button
              onClick={() => {
                alert('Please connect your wallet using the "Select Wallet" button in the top right corner!')
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white px-8 py-6 text-lg font-bold cursor-pointer"
            >
              Connect Wallet to Create Battle
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/20 p-4 rounded-xl">
                <Swords className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Battles</p>
                <p className="text-3xl font-bold text-white">{stats.activeBattles}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-black/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-4 rounded-xl">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Players Online</p>
                <p className="text-3xl font-bold text-white">{stats.playersOnline}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/50 to-black/50 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500/20 p-4 rounded-xl">
                <Trophy className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Prize Pool</p>
                <p className="text-3xl font-bold text-white">{stats.totalPrizePool} SOL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Battles List */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">No Active Battles</h2>
          
          {loading && battles.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading battles...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={loadBattles} className="bg-red-500 hover:bg-red-600">
                Retry
              </Button>
            </div>
          ) : battles.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-12 text-center">
              <Swords className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-6">No battles available. Be the first to create one!</p>
              <Button
                onClick={() => setShowCreateModal(true)}
                disabled={!connected}
                className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white px-6 py-3"
              >
                Create Battle
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {battles.map((battle) => (
                <div
                  key={battle.id}
                  className="bg-gradient-to-br from-purple-900/30 to-black/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Wager</p>
                      <p className="text-2xl font-bold text-white">{battle.wager} SOL</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      battle.status === 'waiting' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {battle.status === 'waiting' ? 'Open' : 'In Progress'}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`/icons/${battle.fighterA.toLowerCase()}_icon.png`}
                        alt={battle.fighterA}
                        className="w-12 h-12 rounded-full border-2 border-purple-500"
                      />
                      <div>
                        <p className="text-white font-semibold">{battle.fighterA}</p>
                        <p className="text-xs text-gray-400">{battle.creatorWallet?.slice(0, 8)}...</p>
                      </div>
                    </div>

                    {battle.fighterB && (
                      <div className="flex items-center gap-3">
                        <img
                          src={`/icons/${battle.fighterB.toLowerCase()}_icon.png`}
                          alt={battle.fighterB}
                          className="w-12 h-12 rounded-full border-2 border-green-500"
                        />
                        <div>
                          <p className="text-white font-semibold">{battle.fighterB}</p>
                          <p className="text-xs text-gray-400">{battle.opponentWallet?.slice(0, 8)}...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {battle.status === 'waiting' && (
                    <Button
                      onClick={() => handleJoinBattle(battle)}
                      disabled={!connected || loading}
                      className="w-full bg-gradient-to-r from-[#14F195] to-[#9945FF] hover:opacity-90 text-white font-bold"
                    >
                      Join Battle
                    </Button>
                  )}

                  {battle.status === 'active' && (
                    <Button
                      onClick={() => navigate(`/battle/${battle.id}`)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white font-bold"
                    >
                      Watch Battle
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Game Modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              backgroundImage: 'url(/ui-assets/banner_airdrop_mode.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '200px',
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all" />
            <div className="relative h-full flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">Airdrop Mode</h3>
            </div>
          </div>

          <div 
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{
              backgroundImage: 'url(/ui-assets/banner_rug_war_mode.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '200px',
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all" />
            <div className="relative h-full flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white">Rug War Mode</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Create Battle Modal */}
      <CreateBattleModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateBattle}
      />
    </div>
  )
}

export default ArenaPage
