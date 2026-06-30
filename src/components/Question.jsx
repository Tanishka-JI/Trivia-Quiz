import parse from 'html-react-parser';
import { useState, useEffect } from 'react';
import { useQuiz } from "../context/QuizContext"

export default function Question({ questionData }) {
    const [answers, setAnswers] = useState([]);
    const { isAnswered, handleAnswer, handleNextQuestion, questions, currentQuestionIndex, timeLeft, userAnswers } = useQuiz()

    useEffect(() => {
        const shuffledAnswers = [
            questionData.correct_answer,
            ...questionData.incorrect_answers
        ].sort(() => Math.random() - 0.5);
        setAnswers(shuffledAnswers);
    }, [questionData]);

    
    const getAnswerClass = (answer) => {
        if (!isAnswered) {
            
            return "w-full text-left px-4 py-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl hover:bg-slate-800 transition cursor-pointer";
        }

        const userAnswer = userAnswers[currentQuestionIndex];

        if (answer === questionData.correct_answer) {
        
            return "w-full text-left px-4 py-3 bg-emerald-950 border border-emerald-500 text-emerald-400 font-bold rounded-xl";
        }

        if (answer === userAnswer && answer !== questionData.correct_answer) {
            
            return "w-full text-left px-4 py-3 bg-rose-950 border border-rose-500 text-rose-400 font-bold rounded-xl";
        }

       
        return "w-full text-left px-4 py-3 bg-slate-950 border border-slate-900 text-slate-600 rounded-xl opacity-50";
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                
                {/* Top Section: Category & Question Status */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-450/10 px-2.5 py-1 rounded">
                        {questionData.category}
                    </span>
                    <span className="text-sm text-slate-400">
                        Q. {currentQuestionIndex + 1} / {questions.length}
                    </span>
                </div>

                {/* Question Text & Timer */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>Question Text:</span>
                        <span className="bg-slate-800 text-white font-bold px-2 py-0.5 rounded">
                            ⏱️ {timeLeft}s
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-white leading-snug">
                        {parse(questionData.question)}
                    </h2>
                </div>

                {/* Option Buttons */}
                <div className="space-y-3">
                    {answers.map((answer, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleAnswer(answer)} 
                            disabled={isAnswered} 
                            className={getAnswerClass(answer)}
                        >
                            {parse(answer)}
                        </button>
                    ))}
                </div>

                {/* Next / Finish Button */}
                <div className="pt-2">
                    <button 
                        onClick={handleNextQuestion} 
                        disabled={!isAnswered}
                        className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold py-3 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz 🎉' : 'Next Question ➡️'}
                    </button>
                </div>

            </div>
        </div>
    )
}