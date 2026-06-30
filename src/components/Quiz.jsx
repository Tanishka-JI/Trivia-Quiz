import { useQuiz } from "../context/QuizContext"
import CategorySelector from "./CategorySelector"
import Question from "./Question"
import LoadingScreen from "./LoadingScreen"
import ResultsScreen from "./ResultsScreen"



export default function Quiz() {
   
    const { score,numQuestions,quizState, questions, currentQuestionIndex, isAnswered, handleAnswer } = useQuiz()

    return (
        <>
           


            {quizState === 'selecting' &&<CategorySelector/>}
            {quizState === 'loading' && <LoadingScreen />}
            {quizState === 'playing' && questions && questions.length > 0 && (
                
                    <Question 
                        questionData={questions[currentQuestionIndex]} 
                        handleAnswer={handleAnswer} 
                        isAnswered={isAnswered}
                    />
                )}
                {quizState === 'results' && (
                    <div>
                    <ResultsScreen/>
                  
            </div>
                    
            )}
        </>
    )
}