import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

// Platform fee: 3%
export const PLATFORM_FEE_PERCENT = 0.03

// Platform wallet (replace with your actual wallet)
export const PLATFORM_WALLET = new PublicKey('22trTKc9zkNmEvTdipMzV4NyzqZDf8aAusHkmN7ECZda')

/**
 * Create a battle by staking SOL
 */
export const createBattle = async (connection, wallet, wager, fighter) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected')

  const battle = {
    id: Date.now().toString(),
    playerA: wallet.publicKey.toString(),
    fighterA: fighter,
    playerB: null,
    fighterB: null,
    wager: wager,
    status: 'waiting',
    createdAt: Date.now(),
  }

  // Save to localStorage
  const battles = JSON.parse(localStorage.getItem('battles') || '[]')
  battles.push(battle)
  localStorage.setItem('battles', JSON.stringify(battles))

  return battle
}

/**
 * Join an existing battle
 */
export const joinBattle = async (connection, wallet, battleId, fighter, wager) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected')

  const battles = JSON.parse(localStorage.getItem('battles') || '[]')
  const battleIndex = battles.findIndex(b => b.id === battleId)
  
  if (battleIndex === -1) throw new Error('Battle not found')
  
  const battle = battles[battleIndex]
  
  if (battle.status !== 'waiting') throw new Error('Battle already started')
  if (battle.playerA === wallet.publicKey.toString()) throw new Error('Cannot join your own battle')

  // Update battle
  battle.playerB = wallet.publicKey.toString()
  battle.fighterB = fighter
  battle.status = 'active'

  battles[battleIndex] = battle
  localStorage.setItem('battles', JSON.stringify(battles))

  return battle
}

/**
 * Resolve battle and transfer SOL
 */
export const resolveBattle = async (connection, wallet, battleId) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected')

  const battles = JSON.parse(localStorage.getItem('battles') || '[]')
  const battleIndex = battles.findIndex(b => b.id === battleId)
  
  if (battleIndex === -1) throw new Error('Battle not found')
  
  const battle = battles[battleIndex]
  
  if (battle.status !== 'active') throw new Error('Battle not active')

  // Determine winner (50/50 chance)
  const randomValue = Math.random()
  const winner = randomValue > 0.5 ? battle.playerA : battle.playerB
  const loser = winner === battle.playerA ? battle.playerB : battle.playerA

  // Calculate amounts
  const totalPot = battle.wager * 2
  const platformFee = totalPot * PLATFORM_FEE_PERCENT
  const winnerPrize = totalPot - platformFee

  // Create transaction
  const transaction = new Transaction()

  // Transfer from loser to winner
  const winnerPubkey = new PublicKey(winner)
  const loserPubkey = new PublicKey(loser)

  // In real implementation, loser would need to sign
  // For demo, we'll just simulate the transfer
  
  // Platform fee transfer
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: loserPubkey,
      toPubkey: PLATFORM_WALLET,
      lamports: platformFee * LAMPORTS_PER_SOL,
    })
  )

  // Winner prize transfer
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: loserPubkey,
      toPubkey: winnerPubkey,
      lamports: (battle.wager * 0.97) * LAMPORTS_PER_SOL,
    })
  )

  // Update battle
  battle.status = 'resolved'
  battle.winner = winner
  battle.winnerPrize = winnerPrize
  battle.resolvedAt = Date.now()
  battle.randomValue = randomValue

  battles[battleIndex] = battle
  localStorage.setItem('battles', JSON.stringify(battles))

  // Update leaderboard
  updateLeaderboard(winner, loser, winnerPrize)

  return battle
}

/**
 * Get all battles
 */
export const getAllBattles = () => {
  return JSON.parse(localStorage.getItem('battles') || '[]')
}

/**
 * Get battle by ID
 */
export const getBattleById = (battleId) => {
  const battles = getAllBattles()
  return battles.find(b => b.id === battleId)
}

/**
 * Update leaderboard
 */
const updateLeaderboard = (winner, loser, prize) => {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}')

  // Update winner stats
  if (!leaderboard[winner]) {
    leaderboard[winner] = { wins: 0, losses: 0, earnedSol: 0 }
  }
  leaderboard[winner].wins++
  leaderboard[winner].earnedSol += prize

  // Update loser stats
  if (!leaderboard[loser]) {
    leaderboard[loser] = { wins: 0, losses: 0, earnedSol: 0 }
  }
  leaderboard[loser].losses++

  localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
}

/**
 * Get leaderboard
 */
export const getLeaderboard = () => {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '{}')
  
  return Object.entries(leaderboard)
    .map(([wallet, stats]) => ({
      wallet: wallet.slice(0, 8) + '...' + wallet.slice(-4),
      fullWallet: wallet,
      ...stats,
    }))
    .sort((a, b) => b.wins - a.wins)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))
}

/**
 * Transfer SOL between wallets
 */
export const transferSOL = async (connection, wallet, toPublicKey, amount) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected')

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
}

/**
 * Get SOL balance
 */
export const getBalance = async (connection, publicKey) => {
  const balance = await connection.getBalance(new PublicKey(publicKey))
  return balance / LAMPORTS_PER_SOL
}
