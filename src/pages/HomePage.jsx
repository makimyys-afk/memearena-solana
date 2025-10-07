import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Trophy } from 'lucide-react'

const HomePage = () => {
  const featuredFighters = [
    { name: 'BONK', image: '/src/assets/characters/bonk_main.png' },
    { name: 'WIF', image: '/src/assets/characters/wif_main.png' },
    { name: 'POPCAT', image: '/src/assets/characters/popcat_main.png' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/src/assets/ui-assets/homepage_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/src/assets/ui-assets/memearena_logo.png" 
              alt="MemeArena" 
              className="mx-auto w-full max-w-2xl mb-8 drop-shadow-[0_0_50px_rgba(153,69,255,0.8)]"
            />
            
            <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Epic Memecoin Battles on Solana
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Stake SOL, choose your fighter, and battle for glory in the ultimate meme coin showdown. 
              All fighters have equal stats—victory is pure chance!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/arena">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 font-bold text-lg px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(153,69,255,0.6)] hover:shadow-[0_0_50px_rgba(153,69,255,0.9)] transition-all"
                >
                  <Zap className="w-6 h-6 mr-2" />
                  Enter Arena
                </Button>
              </Link>
              
              <Link to="/memedex">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#14F195] text-[#14F195] hover:bg-[#14F195]/10 font-bold text-lg px-8 py-6 rounded-xl"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  View Fighters
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Featured Fighters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {featuredFighters.map((fighter, index) => (
              <motion.div
                key={fighter.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/30 to-[#14F195]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-black/60 backdrop-blur-sm border-2 border-[#9945FF]/50 rounded-2xl p-6 hover:border-[#14F195] transition-all">
                  <img 
                    src={fighter.image} 
                    alt={fighter.name}
                    className="w-full h-64 object-contain mb-4"
                  />
                  <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                    {fighter.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#9945FF]/10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Stake SOL',
                description: 'Create or join battles by staking SOL tokens. All wagers are transparent on-chain.',
              },
              {
                icon: Sparkles,
                title: 'Choose Fighter',
                description: 'Select from 20 unique memecoin fighters. All have equal stats for fair play!',
              },
              {
                icon: Trophy,
                title: 'Win Big',
                description: 'Winner takes all (minus 3% fee). Track your stats on the leaderboard!',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-black/40 backdrop-blur-sm border-2 border-[#9945FF]/30 rounded-2xl p-8 hover:border-[#14F195] transition-all"
                >
                  <Icon className="w-16 h-16 mb-4 text-[#14F195]" />
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#9945FF]/10 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Ready to Battle?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players in the ultimate Solana meme showdown!
            </p>
            <Link to="/arena">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 font-bold text-xl px-12 py-8 rounded-xl shadow-[0_0_40px_rgba(153,69,255,0.7)]"
              >
                Start Fighting Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
