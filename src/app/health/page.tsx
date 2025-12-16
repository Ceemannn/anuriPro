'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Calculator, Scale, Droplets, Heart, Info } from 'lucide-react'

// Ingredient data with calories
const ingredients = {
  bases: [
    { name: 'Red Wine', calories: 125, icon: '🍷' },
    { name: 'White Wine', calories: 121, icon: '🥂' },
    { name: 'Rosé', calories: 120, icon: '🌸' },
    { name: 'Sparkling Wine', calories: 90, icon: '✨' },
    { name: 'Grape Juice', calories: 60, icon: '🍇' },
  ],
  fruits: [
    { name: 'Strawberry', calories: 4, icon: '🍓' },
    { name: 'Lemon', calories: 3, icon: '🍋' },
    { name: 'Orange', calories: 10, icon: '🍊' },
    { name: 'Mango', calories: 15, icon: '🥭' },
    { name: 'Pineapple', calories: 12, icon: '🍍' },
    { name: 'Berries', calories: 8, icon: '🫐' },
  ],
  addons: [
    { name: 'Mint', calories: 1, icon: '🌿' },
    { name: 'Honey', calories: 21, icon: '🍯' },
    { name: 'Ginger', calories: 2, icon: '🫚' },
    { name: 'Soda Water', calories: 0, icon: '💧' },
    { name: 'Tonic', calories: 30, icon: '🧊' },
    { name: 'Simple Syrup', calories: 50, icon: '🧴' },
  ]
}

type IngredientItem = { name: string; calories: number; icon: string }

export default function HealthPage() {
  // Calorie Calculator State
  const [drinkType, setDrinkType] = useState<'mocktail' | 'cocktail'>('mocktail')
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientItem[]>([])
  const [totalCalories, setTotalCalories] = useState(0)

  // BMI Calculator State
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string; color: string } | null>(null)

  const glassRef = useRef<HTMLDivElement>(null)

  // Calculate total calories
  useEffect(() => {
    const total = selectedIngredients.reduce((sum, ing) => sum + ing.calories, 0)
    setTotalCalories(total)
  }, [selectedIngredients])

  // Animate calorie glass fill
  useEffect(() => {
    if (glassRef.current) {
      const fillPercentage = Math.min((totalCalories / 300) * 100, 100)
      gsap.to('.calorie-liquid', {
        height: `${fillPercentage}%`,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }, [totalCalories])

  const toggleIngredient = (ingredient: IngredientItem) => {
    setSelectedIngredients(prev => {
      const exists = prev.find(i => i.name === ingredient.name)
      if (exists) {
        return prev.filter(i => i.name !== ingredient.name)
      }
      return [...prev, ingredient]
    })
  }

  const calculateBMI = () => {
    const w = parseFloat(weight)
    const hRaw = parseFloat(height)

    if (!Number.isFinite(w) || !Number.isFinite(hRaw)) {
      setBmiResult(null)
      return
    }

    if (w <= 0 || hRaw <= 0) {
      setBmiResult(null)
      return
    }

    const h = hRaw <= 3 ? hRaw : hRaw / 100

    if (h <= 0.5 || h >= 2.5) {
      setBmiResult(null)
      return
    }

    const bmi = w / (h * h)
    let category = ''
    let color = ''

    if (bmi < 18.5) {
      category = 'Underweight'
      color = 'text-blue-400'
    } else if (bmi < 25) {
      category = 'Normal'
      color = 'text-green-400'
    } else if (bmi < 30) {
      category = 'Overweight'
      color = 'text-yellow-400'
    } else {
      category = 'Obese'
      color = 'text-red-400'
    }

    setBmiResult({ value: Math.round(bmi * 10) / 10, category, color })
  }

  const clearCalculator = () => {
    setSelectedIngredients([])
    setTotalCalories(0)
  }

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-wine-primary text-sm uppercase tracking-widest">Wellness Tools</span>
          <h1 className="font-serif text-5xl md:text-6xl text-wine-cream mt-4 mb-4">
            Health & <span className="text-wine-gradient">Wellness</span>
          </h1>
          <p className="text-wine-cream/60 max-w-2xl mx-auto">
            Enjoy responsibly — know your balance. Use our tools to make mindful choices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calorie Calculator */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-wine-primary/20 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-wine-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-wine-cream">Calorie Calculator</h2>
                <p className="text-wine-cream/60 text-sm">Build your drink and see the calories</p>
              </div>
            </div>

            {/* Drink Type Toggle */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setDrinkType('mocktail')}
                className={`flex-1 py-3 rounded-glass text-center transition-all ${
                  drinkType === 'mocktail' 
                    ? 'bg-wine-primary text-white' 
                    : 'bg-wine-accent/30 text-wine-cream/70 hover:bg-wine-accent/50'
                }`}
              >
                🍹 Mocktail
              </button>
              <button
                onClick={() => setDrinkType('cocktail')}
                className={`flex-1 py-3 rounded-glass text-center transition-all ${
                  drinkType === 'cocktail' 
                    ? 'bg-wine-primary text-white' 
                    : 'bg-wine-accent/30 text-wine-cream/70 hover:bg-wine-accent/50'
                }`}
              >
                🍷 Cocktail
              </button>
            </div>

            {/* Ingredient Selection */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {/* Bases */}
              <div>
                <h3 className="text-wine-cream/80 text-sm uppercase tracking-wider mb-2">Base</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ingredients.bases.map((ing) => (
                    <button
                      key={ing.name}
                      onClick={() => toggleIngredient(ing)}
                      className={`p-3 rounded-glass text-left transition-all ${
                        selectedIngredients.find(i => i.name === ing.name)
                          ? 'bg-wine-primary/30 border-wine-primary border'
                          : 'bg-wine-accent/20 hover:bg-wine-accent/40'
                      }`}
                    >
                      <span className="text-xl mr-2">{ing.icon}</span>
                      <span className="text-wine-cream text-sm">{ing.name}</span>
                      <span className="text-wine-cream/50 text-xs ml-1">({ing.calories} cal)</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fruits */}
              <div>
                <h3 className="text-wine-cream/80 text-sm uppercase tracking-wider mb-2">Fruits</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ingredients.fruits.map((ing) => (
                    <button
                      key={ing.name}
                      onClick={() => toggleIngredient(ing)}
                      className={`p-3 rounded-glass text-left transition-all ${
                        selectedIngredients.find(i => i.name === ing.name)
                          ? 'bg-wine-primary/30 border-wine-primary border'
                          : 'bg-wine-accent/20 hover:bg-wine-accent/40'
                      }`}
                    >
                      <span className="text-xl mr-2">{ing.icon}</span>
                      <span className="text-wine-cream text-sm">{ing.name}</span>
                      <span className="text-wine-cream/50 text-xs ml-1">({ing.calories} cal)</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-wine-cream/80 text-sm uppercase tracking-wider mb-2">Add-ons</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ingredients.addons.map((ing) => (
                    <button
                      key={ing.name}
                      onClick={() => toggleIngredient(ing)}
                      className={`p-3 rounded-glass text-left transition-all ${
                        selectedIngredients.find(i => i.name === ing.name)
                          ? 'bg-wine-primary/30 border-wine-primary border'
                          : 'bg-wine-accent/20 hover:bg-wine-accent/40'
                      }`}
                    >
                      <span className="text-xl mr-2">{ing.icon}</span>
                      <span className="text-wine-cream text-sm">{ing.name}</span>
                      <span className="text-wine-cream/50 text-xs ml-1">({ing.calories} cal)</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-6 pt-6 border-t border-wine-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-wine-cream/60 text-sm">Total Calories</p>
                  <p className="font-serif text-4xl text-wine-primary">{totalCalories}</p>
                </div>
                <div ref={glassRef} className="relative w-16 h-24 border-2 border-wine-cream/20 rounded-b-lg overflow-hidden">
                  <div 
                    className="calorie-liquid absolute bottom-0 left-0 right-0 bg-gradient-to-t from-wine-secondary to-wine-primary transition-all"
                    style={{ height: '0%' }}
                  />
                </div>
              </div>
              
              {selectedIngredients.length > 0 && (
                <button
                  onClick={clearCalculator}
                  className="mt-4 w-full py-2 text-wine-cream/60 hover:text-wine-cream border border-wine-accent/30 rounded-glass transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {/* BMI Calculator */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-wine-primary/20 flex items-center justify-center">
                <Scale className="w-6 h-6 text-wine-primary" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-wine-cream">BMI Calculator</h2>
                <p className="text-wine-cream/60 text-sm">Know your body mass index</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Weight */}
              <div>
                <label className="text-wine-cream/80 text-sm block mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                />
              </div>

              {/* Height */}
              <div>
                <label className="text-wine-cream/80 text-sm block mb-2">Height (cm or m)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 176 or 1.76"
                  className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                />
              </div>

              {/* Age (Optional) */}
              <div>
                <label className="text-wine-cream/80 text-sm block mb-2">Age (optional)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  className="w-full bg-wine-accent/20 border border-wine-accent/30 rounded-glass px-4 py-3 text-wine-cream placeholder:text-wine-cream/40 focus:outline-none focus:border-wine-primary transition-colors"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-wine-cream/80 text-sm block mb-2">Gender</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 rounded-glass text-center transition-all ${
                      gender === 'male' 
                        ? 'bg-wine-primary text-white' 
                        : 'bg-wine-accent/30 text-wine-cream/70 hover:bg-wine-accent/50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 rounded-glass text-center transition-all ${
                      gender === 'female' 
                        ? 'bg-wine-primary text-white' 
                        : 'bg-wine-accent/30 text-wine-cream/70 hover:bg-wine-accent/50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <button
                onClick={calculateBMI}
                className="wine-btn w-full mt-4"
              >
                Calculate BMI
              </button>

              {/* BMI Result */}
              {bmiResult && (
                <div className="mt-6 p-6 bg-wine-accent/20 rounded-glass text-center">
                  <p className="text-wine-cream/60 text-sm mb-2">Your BMI</p>
                  <p className="font-serif text-5xl text-wine-cream mb-2">{bmiResult.value}</p>
                  <p className={`text-lg font-medium ${bmiResult.color}`}>{bmiResult.category}</p>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-wine-cream/50 text-sm">
                    <Info className="w-4 h-4" />
                    <span>Enjoy responsibly — know your balance.</span>
                  </div>
                </div>
              )}
            </div>

            {/* BMI Categories */}
            <div className="mt-6 pt-6 border-t border-wine-accent/20">
              <h4 className="text-wine-cream/60 text-sm mb-3">BMI Categories</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-400">Underweight</span>
                  <span className="text-wine-cream/50">&lt; 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-400">Normal</span>
                  <span className="text-wine-cream/50">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400">Overweight</span>
                  <span className="text-wine-cream/50">25 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400">Obese</span>
                  <span className="text-wine-cream/50">&gt; 30</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <div className="mt-12 glass p-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-wine-primary" />
            <h3 className="font-serif text-2xl text-wine-cream">Health Tips</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Droplets className="w-6 h-6 text-wine-primary shrink-0" />
              <div>
                <h4 className="text-wine-cream font-medium mb-1">Stay Hydrated</h4>
                <p className="text-wine-cream/60 text-sm">Alternate alcoholic drinks with water to stay hydrated.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Calculator className="w-6 h-6 text-wine-primary shrink-0" />
              <div>
                <h4 className="text-wine-cream font-medium mb-1">Count Your Calories</h4>
                <p className="text-wine-cream/60 text-sm">Be mindful of liquid calories - they add up quickly!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Scale className="w-6 h-6 text-wine-primary shrink-0" />
              <div>
                <h4 className="text-wine-cream font-medium mb-1">Balance is Key</h4>
                <p className="text-wine-cream/60 text-sm">Enjoy in moderation and pair with nutritious foods.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
