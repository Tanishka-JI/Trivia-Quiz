import React from 'react'
import { useQuiz } from "../context/QuizContext"
import parse from 'html-react-parser';


export default function ResultsScreen() {
    const { questions, score, handleRestart, userAnswers } = useQuiz()
    
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
            {/* Top Score Card */}
            <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-xl mb-6">
                <h2 className="text-xl font-bold text-slate-400">
                    YOUR FINAL SCORE IS 
                    <span className="text-3xl font-black text-amber-400 block mt-1">
                        {score} / {questions.length}
                         <p>{(score/questions.length)*100===100?" Congratulations,You Win👏👏": "Better Luck Nextime👍"}</p> 
                    </span>
                </h2>
                
                <button 
                    onClick={handleRestart}
                    className="mt-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2.5 px-6 rounded-xl transition cursor-pointer"
                >
                    🔄 Restart Quiz
                </button>
            </div>

            {/* Review Section */}
            <div className="w-full max-w-xl space-y-4">
                <h2 className="text-lg font-bold border-b border-slate-800 pb-2 text-slate-300">
                    📋 Review Section...
                </h2>
                
                {questions.map((question, index) => {
        
                    const isCorrect = userAnswers[index] === question.correct_answer;

                    return (
                        <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 shadow-md">
                            
                            {/* Question Title */}
                            <p className="font-semibold text-slate-200">
                                <span className="text-amber-400 mr-1">Q.{index + 1}</span> 
                                {parse(question.question)}
                            </p>
                            
                            {/* Answers Blocks */}
                            <div className="space-y-2 text-sm">
                              
                                <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-emerald-400">
                                    <span className="font-bold">Correct Answer:</span> {parse(question.correct_answer)}
                                </div>
                                
                                {/* User Answer Box (Sahi hone par Green, Galat hone par Red) */}
                                <div className={`p-3 border rounded-lg ${
                                    isCorrect 
                                        ? "bg-emerald-950/40 border-emerald-900/60 text-emerald-400" 
                                        : "bg-rose-950/40 border-rose-900/60 text-rose-400"
                                }`}>
                                    <span className="font-bold">Your Answer:</span> {userAnswers[index] ? parse(userAnswers[index]) : "Skipped"}
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}