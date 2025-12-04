'use client'

import Image from 'next/image'
import { Star, Flame } from 'lucide-react'

const featuredMix = {
  name: "Sunset Boulevard",
  description: "A refreshing blend of rosé, fresh strawberries, mint, and a hint of elderflower. Perfect for summer evenings.",
  ingredients: ["Rosé Wine", "Strawberries", "Fresh Mint", "Elderflower Syrup", "Sparkling Water"],
  calories: 145,
  rating: 4.8,
  type: "Mocktail"
}

export default function MixOfTheWeek() {
  return (
    <div className="glass p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Visual */}
        <div className="relative flex justify-center">
          {/* Product Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            {/* 
              NOTE: Please save your uploaded image as 'mix-of-week.jpg' 
              in the 'public/images' folder of your project.
            */}
            <div className="absolute inset-0 bg-wine-primary/20 animate-pulse" /> {/* Loading placeholder background */}
            <Image
              src="/images/mix-of-week.jpg"
              alt={featuredMix.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
          </div>

          {/* Flame badge */}
          <div className="absolute top-6 right-6 lg:right-auto lg:left-full lg:-ml-6 glass px-3 py-1 flex items-center gap-1 z-10 transform -translate-y-1/2 lg:translate-y-0">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-wine-cream text-sm font-medium">Trending</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <span className="text-wine-primary text-sm uppercase tracking-wider">{featuredMix.type}</span>
            <h3 className="font-serif text-4xl text-wine-cream mt-2">{featuredMix.name}</h3>
          </div>

          <p className="text-wine-cream/70 leading-relaxed">
            {featuredMix.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(featuredMix.rating) ? 'text-wine-primary fill-wine-primary' : 'text-wine-accent'}`}
                />
              ))}
            </div>
            <span className="text-wine-cream font-medium">{featuredMix.rating}</span>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="text-wine-cream/80 text-sm uppercase tracking-wider mb-3">Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {featuredMix.ingredients.map((ingredient, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-wine-primary/20 text-wine-cream/80 text-sm border border-wine-primary/30"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2">
              <span className="text-wine-cream/60 text-xs uppercase">Calories</span>
              <p className="text-wine-primary text-2xl font-serif">{featuredMix.calories}</p>
            </div>
            <button className="wine-btn flex-1">
              Try This Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
