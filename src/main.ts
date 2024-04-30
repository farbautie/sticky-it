import './components/CardElement'
import './components/ControlBar'
import { createCardElement } from './modules/cardCreator'
import { loadCardsFromLocalStorage } from './modules/storage'

document.addEventListener('DOMContentLoaded', () => {
    loadCardsFromLocalStorage(createCardElement)
})
