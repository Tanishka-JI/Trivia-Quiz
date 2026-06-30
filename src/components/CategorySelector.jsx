import React from 'react'
import { useState, useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'

export default function CategorySelector() {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("")
    const [numQuestions, setNumQuestions] = useState(10)

    const { startQuiz, loadCategories, categories } = useQuiz()

    function handleStart() {
        startQuiz(selectedCategory, selectedDifficulty, numQuestions)
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-black text-white tracking-tight mb-2">
                      🧠  Trivia <span className="text-amber-400">Master</span>
                    </h1>
                    <h1 className="text-slate-400 text-sm">
                        Pick your battle. Test your brain!!
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-7 space-y-6 shadow-xl shadow-black/40">

                    {/* Category */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            <span>🌍</span> Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                        >
                            <option value="">Any Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            <span>📊</span> Difficulty
                        </label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                        >
                            <option value="">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* Number of Questions */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            <span>🔢</span> Questions
                        </label>
                        <select
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(e.target.value)}
                            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                        >
                            <option value="5">5 Questions</option>
                            <option value="10">10 Questions</option>
                            <option value="15">15 Questions</option>
                             <option value="20">20 Questions</option>
                        </select>
                    </div>

                    {/* Start Button — the signature element */}
                    <button
                        onClick={handleStart}
                        className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold text-base py-4 rounded-lg transition-all duration-150 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 mt-2"
                    >
                        🚀 Start Quiz
                    </button>
                </div>
            </div>
        </div>
    )
}