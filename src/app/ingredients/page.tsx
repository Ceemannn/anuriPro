'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Wine, Trash2, Share2, Save, Send, Sparkles, X, Check } from 'lucide-react'

type Ingredient = {
  id: string
  name: string
  calories: number
  category: 'base' | 'fruit' | 'addon'
  icon: string
}

const allIngredients: Ingredient[] = [
  // Bases
  { id: 'red-wine', name: 'Red Wine', calories: 125, category: 'base', icon: '🍷' },
  { id: 'white-wine', name: 'White Wine', calories: 121, category: 'base', icon: '🥂' },
  { id: 'rose', name: 'Rosé', calories: 120, category: 'base', icon: '🌸' },
  { id: 'sparkling', name: 'Sparkling Wine', calories: 90, category: 'base', icon: '✨' },
  { id: 'grape-juice', name: 'Grape Juice', calories: 60, category: 'base', icon: '🍇' },
  // Fruits
  { id: 'strawberry', name: 'Strawberry', calories: 4, category: 'fruit', icon: '🍓' },
  { id: 'lemon', name: 'Lemon', calories: 3, category: 'fruit', icon: '🍋' },
  { id: 'orange', name: 'Orange', calories: 10, category: 'fruit', icon: '🍊' },
  { id: 'mango', name: 'Mango', calories: 15, category: 'fruit', icon: '🥭' },
  { id: 'pineapple', name: 'Pineapple', calories: 12, category: 'fruit', icon: '🍍' },
  { id: 'berries', name: 'Mixed Berries', calories: 8, category: 'fruit', icon: '🫐' },
  { id: 'peach', name: 'Peach', calories: 10, category: 'fruit', icon: '🍑' },
  { id: 'apple', name: 'Apple', calories: 14, category: 'fruit', icon: '🍎' },
  // Add-ons
  { id: 'mint', name: 'Fresh Mint', calories: 1, category: 'addon', icon: '🌿' },
  { id: 'honey', name: 'Honey', calories: 21, category: 'addon', icon: '🍯' },
  { id: 'ginger', name: 'Ginger', calories: 2, category: 'addon', icon: '🫚' },
  { id: 'soda', name: 'Soda Water', calories: 0, category: 'addon', icon: '💧' },
  { id: 'tonic', name: 'Tonic Water', calories: 30, category: 'addon', icon: '🧊' },
  { id: 'syrup', name: 'Simple Syrup', calories: 50, category: 'addon', icon: '🧴' },
  { id: 'basil', name: 'Basil', calories: 1, category: 'addon', icon: '🌱' },
  { id: 'cinnamon', name: 'Cinnamon', calories: 2, category: 'addon', icon: '🪵' },
]

export default function IngredientsPage() {
  const router = useRouter()
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([])
  const [drinkName, setDrinkName] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'base' | 'fruit' | 'addon'>('all')
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const mixingGlassRef = useRef<HTMLDivElement>(null)

  // Load recipe from URL params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const sp = new URLSearchParams(window.location.search)
    const recipeName = sp.get('recipe')
    const ingredientIds = sp.get('ingredients')
    
    if (recipeName) {
      setDrinkName(recipeName)
    }
    
    if (ingredientIds) {
      const ids = ingredientIds.split(',')
      const preselected = allIngredients.filter(ing => ids.includes(ing.id))
      if (preselected.length > 0) {
        setSelectedIngredients(preselected)
      }
    }
  }, [])

  const totalCalories = selectedIngredients.reduce((sum, ing) => sum + ing.calories, 0)
  const fillPercentage = Math.min((totalCalories / 300) * 100, 100)

  const filteredIngredients = activeCategory === 'all' 
    ? allIngredients 
    : allIngredients.filter(ing => ing.category === activeCategory)

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => {
      const exists = prev.find(i => i.id === ingredient.id)
      if (exists) {
        return prev.filter(i => i.id !== ingredient.id)
      }
      return [...prev, ingredient]
    })
  }

  const removeIngredient = (id: string) => {
    setSelectedIngredients(prev => prev.filter(i => i.id !== id))
  }

  const clearAll = () => {
    setSelectedIngredients([])
    setDrinkName('')
  }

  // Animate ingredient drop
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      gsap.fromTo('.mixing-ingredient:last-child',
        { y: -50, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'bounce.out' }
      )
    }
  }, [selectedIngredients.length])

  // Animate glass fill
  useEffect(() => {
    gsap.to('.glass-fill', {
      height: `${fillPercentage}%`,
      duration: 0.5,
      ease: 'power2.out'
    })
  }, [fillPercentage])

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-wine-primary text-sm uppercase tracking-widest">Create Your Blend</span>
          <h1 className="font-serif text-5xl md:text-6xl text-wine-cream mt-4 mb-4">
            Mix <span className="text-wine-gradient">Builder</span>
          </h1>
          <p className="text-wine-cream/60 max-w-2xl mx-auto">
            Select your ingredients and watch your custom creation come to life
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ingredient Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Ingredients' },
                { key: 'base', label: '🍷 Bases' },
                { key: 'fruit', label: '🍓 Fruits' },
                { key: 'addon', label: '🌿 Add-ons' },
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key as typeof activeCategory)}
                  className={`px-4 py-2 rounded-glass transition-all ${
                    activeCategory === cat.key
                      ? 'bg-wine-primary text-white'
                      : 'bg-wine-accent/30 text-wine-cream/70 hover:bg-wine-accent/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredIngredients.map((ingredient) => {
                const isSelected = selectedIngredients.some(i => i.id === ingredient.id)
                return (
                  <button
                    key={ingredient.id}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`ingredient-card p-4 rounded-glass text-center transition-all ${
                      isSelected
                        ? 'bg-wine-primary/30 border-2 border-wine-primary shadow-wine'
                        : 'glass hover:bg-wine-accent/40'
                    }`}
                  >
                    <span className="text-4xl block mb-2">{ingredient.icon}</span>
                    <span className="text-wine-cream text-sm font-medium block">{ingredient.name}</span>
                    <span className="text-wine-cream/50 text-xs">{ingredient.calories} cal</span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-wine-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mixing Tray */}
          <div className="lg:col-span-1">
            <div className="glass p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl text-wine-cream flex items-center gap-2">
                  <Wine className="w-6 h-6 text-wine-primary" />
                  Your Mix
                </h3>
                {selectedIngredients.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-wine-cream/50 hover:text-wine-primary transition-colors"
                    title="Clear all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Visual Glass */}
              <div ref={mixingGlassRef} className="relative mx-auto mb-6" style={{ width: '120px', height: '180px' }}>
                <svg width="120" height="180" viewBox="0 0 120 180" className="absolute inset-0">
                  <defs>
                    <linearGradient id="mixFillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#631b23" />
                      <stop offset="50%" stopColor="#722F37" />
                      <stop offset="100%" stopColor="#c9632b" />
                    </linearGradient>
                    <clipPath id="glassClipPath">
                      <path d="M20 10 L100 10 L100 80 C100 110 80 130 60 140 C40 130 20 110 20 80 Z" />
                    </clipPath>
                  </defs>
                  
                  {/* Glass outline */}
                  <path
                    d="M20 10 L100 10 L100 80 C100 110 80 130 60 140 C40 130 20 110 20 80 Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                  
                  {/* Liquid fill */}
                  <g clipPath="url(#glassClipPath)">
                    <rect
                      className="glass-fill"
                      x="20"
                      y={140 - (130 * fillPercentage / 100)}
                      width="80"
                      height={130 * fillPercentage / 100}
                      fill="url(#mixFillGradient)"
                    />
                  </g>
                  
                  {/* Stem */}
                  <rect x="55" y="140" width="10" height="25" fill="rgba(255,255,255,0.1)" />
                  
                  {/* Base */}
                  <ellipse cx="60" cy="170" rx="30" ry="8" fill="rgba(255,255,255,0.1)" />
                </svg>

                {/* Floating ingredients in glass */}
                <div className="absolute inset-0 flex flex-wrap items-end justify-center pb-12 px-4 overflow-hidden">
                  {selectedIngredients.slice(-6).map((ing, i) => (
                    <span 
                      key={ing.id} 
                      className="mixing-ingredient text-xl animate-float"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      {ing.icon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selected Ingredients List */}
              <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                {selectedIngredients.length === 0 ? (
                  <p className="text-wine-cream/40 text-center text-sm py-4">
                    Select ingredients to start mixing
                  </p>
                ) : (
                  selectedIngredients.map(ing => (
                    <div key={ing.id} className="flex items-center justify-between bg-wine-accent/20 rounded-glass px-3 py-2">
                      <span className="flex items-center gap-2 text-wine-cream text-sm">
                        <span>{ing.icon}</span>
                        {ing.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-wine-cream/50 text-xs">{ing.calories} cal</span>
                        <button
                          onClick={() => removeIngredient(ing.id)}
                          className="text-wine-cream/40 hover:text-wine-primary"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Totals */}
              <div className="border-t border-wine-accent/20 pt-4 mb-4">
                <div className="flex justify-between text-wine-cream mb-2">
                  <span>Total Calories</span>
                  <span className="font-bold text-wine-primary">{totalCalories}</span>
                </div>
                <div className="flex justify-between text-wine-cream/60 text-sm">
                  <span>Ingredients</span>
                  <span>{selectedIngredients.length}</span>
                </div>
              </div>

              {/* Drink Name */}
              {selectedIngredients.length > 0 && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={drinkName}
                    onChange={(e) => setDrinkName(e.target.value)}
                    placeholder="Name your creation..."
                    className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors text-center font-serif"
                  />
                </div>
              )}

              {/* Actions */}
              {selectedIngredients.length > 0 && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="wine-btn w-full flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Save My Mix
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => {
                        const ingredientIds = selectedIngredients.map(i => i.id).join(',')
                        const shareUrl = `${window.location.origin}/ingredients?recipe=${encodeURIComponent(drinkName || 'My Mix')}&ingredients=${ingredientIds}`
                        navigator.clipboard.writeText(shareUrl)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="py-2 px-4 rounded-glass border border-wine-cream/20 text-wine-cream/70 hover:bg-wine-cream/5 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Share'}
                    </button>
                    <button 
                      onClick={async () => {
                        setIsCheckingOut(true)
                        try {
                          const response = await fetch('/api/checkout', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              mixName: drinkName || 'Custom Mix',
                              ingredients: selectedIngredients.map(i => i.name),
                              totalCalories: totalCalories,
                            }),
                          })
                          
                          const data = await response.json()
                          
                          if (data.url) {
                            window.location.href = data.url
                          } else {
                            alert('Failed to create checkout session. Please try again.')
                          }
                        } catch (error) {
                          console.error('Checkout error:', error)
                          alert('Something went wrong. Please try again.')
                        } finally {
                          setIsCheckingOut(false)
                        }
                      }}
                      disabled={isCheckingOut}
                      className="py-2 px-4 rounded-glass border border-wine-cream/20 text-wine-cream/70 hover:bg-wine-cream/5 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isCheckingOut ? 'Processing...' : 'Order'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-dark/80 backdrop-blur-sm">
          <div className="glass-light p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4 text-wine-cream/50 hover:text-wine-cream"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-serif text-2xl text-wine-cream mb-2">
                {drinkName || 'Your Custom Mix'}
              </h3>
              <p className="text-wine-cream/60">
                {selectedIngredients.length} ingredients • {totalCalories} calories
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedIngredients.map(ing => (
                  <span key={ing.id} className="px-3 py-1 bg-wine-accent/30 rounded-full text-wine-cream text-sm">
                    {ing.icon} {ing.name}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  // Here you would save to backend
                  alert('Mix saved! In a real app, this would save to your account.')
                  setShowSaveModal(false)
                }}
                className="wine-btn w-full flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save to My Collection
              </button>

              <button
                onClick={() => setShowSaveModal(false)}
                className="w-full py-2 text-wine-cream/60 hover:text-wine-cream transition-colors"
              >
                Continue Mixing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
