// api.js — PURE fetch logic, no React/state involved

export async function getToken() {
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
    const data = await response.json()
    return data.token
}

export async function fetchTriviaQuestions(category, difficulty, amount, token) {
    let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple&token=${token}`
    if (category) url += `&category=${category}`
    if (difficulty) url += `&difficulty=${difficulty}`

    const response = await fetch(url)
    const data = await response.json()
    return data
}

export async function fetchCategories() {
    const response = await fetch('https://opentdb.com/api_category.php')
    const data = await response.json()
    return data.trivia_categories
}
