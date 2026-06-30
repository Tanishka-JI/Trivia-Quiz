import { createContext, useState, useContext, useEffect } from "react"
import { getToken, fetchTriviaQuestions, fetchCategories } from "../utils/api"

const QuizContext = createContext()

export default function QuizProvider({children}) {
    const [quizState, setQuizState] = useState('selecting')
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState([])
    const [isAnswered, setIsAnswered] = useState(false)
    const [categories,setCategories] = useState([])
    const[timeLeft,setTimeLeft]=useState(15)


    const handleAnswer = (answer) => {
        if (isAnswered) {
            return; // Prevent multiple answers
        }
        
        setIsAnswered(true)
        setUserAnswers(prev => [...prev, answer])
    }

    const handleRestart = () => {
        setIsAnswered(false);
        setQuizState('selecting'); 
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
       
    }
    const handleNextQuestion = () => {
        setIsAnswered(false);  // Reset first
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            // Move to the next question
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setQuizState('results');
        }
    }
    const score = userAnswers.filter((answer, index) => 
        answer === questions[index]?.correct_answer
    ).length

    // QuizContext.jsx — uses api.js functions, manages STATE

    const loadCategories = async () => {
        const cats = await fetchCategories()
        setCategories(cats)
    }

const startQuiz = async (category, difficulty, amount) => {
    setQuizState('loading')
    
    const token = await getToken()                          // ← calls api.js
    const data = await fetchTriviaQuestions(category, difficulty, amount, token)  // ← calls api.js
    
    if (data.response_code === 0) {
        setQuestions(data.results)      // ← React state update, stays HERE
        setQuizState('playing')          // ← React state update, stays HERE
    }
}


   // EFFECT 1 — Reset timer ONLY when question changes
useEffect(() => {
    if (quizState === 'playing') {
        setTimeLeft(15)
    }
}, [currentQuestionIndex, quizState])


// EFFECT 2 — Run the COUNTDOWN, stop if answered
useEffect(() => {
    if (quizState !== 'playing' || isAnswered) return

    const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
}, [currentQuestionIndex, quizState, isAnswered])
    
useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
        setUserAnswers(prev => [...prev, ""])   // record BLANK answer
        handleNextQuestion()
    }
}, [timeLeft])

    return (
        <QuizContext.Provider value={{
             quizState, setQuizState, questions, setQuestions, currentQuestionIndex,
              setCurrentQuestionIndex, userAnswers, setUserAnswers, isAnswered, setIsAnswered,
              categories, score, startQuiz, loadCategories, handleAnswer, handleRestart, handleNextQuestion,
              timeLeft,setTimeLeft}}>
            {children}
        </QuizContext.Provider>
    )
}

export function useQuiz() {
    return useContext(QuizContext)
}