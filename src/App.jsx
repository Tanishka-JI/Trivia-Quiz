import Quiz from './components/Quiz'
import QuizProvider from './context/QuizContext'

export default function App() {
    return (
        <QuizProvider>
            <Quiz />
        </QuizProvider>
    )
}
