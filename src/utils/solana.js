import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

// API endpoint
const API_URL = import.meta.env.VITE_API_URL || 'https://memearena-api.onrender.com'

// Solana connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

// API helper
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!response.ok) throw new Error(`API error: ${response.statusText}`)
  return response.json()
}

export async function getAllBattles() {
  try {
    return await apiRequest('/api/battles')
  } catch (error) {
    console.error('Error fetching battles:', error)
    return []
  }
}

export async function createBattle(wallet, fighter, wager) {
  const battle = {
    creatorWallet: wallet.publicKey.toString(),
    fighterA: fighter,
    wager: wager,
    status: 'waiting',
  }
  try {
    return await apiRequest('/api/battles', {
      method: 'POST',
      body: JSON.stringify(battle),
    })
  } catch (error) {
    console.error('Error creating battle:', error)
    throw error
  }
}

export async function joinBattle(battleId, wallet, fighter) {
  const battles = await getAllBattles()
  const battle = battles.find(b => b.id === battleId)
  if (!battle || battle.status !== 'waiting') throw new Error('Battle not available')
  
  const updatedBattle = {
    opponentWallet: wallet.publicKey.toString(),
    fighterB: fighter,
    status: 'active',
  }
  try {
    return await apiRequest(`/api/battles/${battleId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedBattle),
    })
  } catch (error) {
    console.error('Error joining battle:', error)
    throw error
  }
}

export async function resolveBattle(battleId) {
  const battles = await getAllBattles()
  const battle = battles.find(b => b.id === battleId)
  if (!battle || battle.status !== 'active') throw new Error('Battle not active')
  
  const winner = Math.random() < 0.5 ? 'A' : 'B'
  const winnerWallet = winner === 'A' ? battle.creatorWallet : battle.opponentWallet
  const loserWallet = winner === 'A' ? battle.opponentWallet : battle.creatorWallet
  const totalPot = battle.wager * 2
  const winnings = totalPot * 0.97
  
  const updatedBattle = {
    status: 'completed',
    winner: winner,
    winnerWallet: winnerWallet,
    winnings: winnings,
    resolvedAt: new Date().toISOString(),
  }
  
  try {
    const result = await apiRequest(`/api/battles/${battleId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedBattle),
    })
    await updateLeaderboard(winnerWallet, true, winnings, battle.wager, winner === 'A' ? battle.fighterA : battle.fighterB)
    await updateLeaderboard(loserWallet, false, 0, battle.wager, winner === 'A' ? battle.fighterB : battle.fighterA)
    return result
  } catch (error) {
    console.error('Error resolving battle:', error)
    throw error
  }
}

export async function deleteBattle(battleId) {
  try {
    return await apiRequest(`/api/battles/${battleId}`, { method: 'DELETE' })
  } catch (error) {
    console.error('Error deleting battle:', error)
    throw error
  }
}

export async function getLeaderboard() {
  try {
    return await apiRequest('/api/leaderboard')
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}

export async function updateLeaderboard(wallet, win, winnings, wager, champion) {
  try {
    return await apiRequest('/api/leaderboard', {
      method: 'POST',
      body: JSON.stringify({ wallet, win, winnings, wager, champion }),
    })
  } catch (error) {
    console.error('Error updating leaderboard:', error)
    throw error
  }
}

export async function getStats() {
  try {
    return await apiRequest('/api/stats')
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { totalBattles: 0, totalVolume: 0, treasury: 0, activeBattles: 0, totalPlayers: 0 }
  }
}

export async function sendSOL(wallet, toPublicKey, amount) {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(toPublicKey),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    )
    const signature = await wallet.sendTransaction(transaction, connection)
    await connection.confirmTransaction(signature, 'confirmed')
    return signature
  } catch (error) {
    console.error('Error sending SOL:', error)
    throw error
  }
}

export async function getBalance(publicKey) {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey))
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error('Error getting balance:', error)
    return 0
  }
}
