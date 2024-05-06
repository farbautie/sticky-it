import { Card } from '../types'

export function addCardToLocalStorage(cardData: Card): void {
    const existingCards = JSON.parse(localStorage.getItem('cards') || '[]')
    existingCards.push(cardData)
    localStorage.setItem('cards', JSON.stringify(existingCards))
}

export function updateCardFromLocalStorage(updatedData: {
    id: string
    body?: string
    position?: { top: number; left: number }
}): void {
    const cardsInStorage = localStorage.getItem('cards')
    if (cardsInStorage) {
        const existingCards: Card[] = JSON.parse(cardsInStorage)
        const updatedCards = existingCards.map((card) => {
            if (card.id === updatedData.id) {
                return {
                    ...card,
                    body: updatedData.body ?? card.body,
                    position: updatedData.position ?? card.position,
                }
            }
            return card
        })
        localStorage.setItem('cards', JSON.stringify(updatedCards))
    }
}

export function loadCardsFromLocalStorage(createCardElement: (cardData: Card) => void): void {
    const cardsInStorage = localStorage.getItem('cards')
    if (cardsInStorage) {
        const existingCards: Card[] = JSON.parse(cardsInStorage)
        existingCards.forEach((card) => {
            createCardElement(card)
        })
    }
}

export function deleteCardsFromLocalStorage(cardId: string): void {
    const cardsInStorage = localStorage.getItem('cards')
    if (cardsInStorage) {
        const existingCards: Card[] = JSON.parse(cardsInStorage)
        const updatedCards = existingCards.filter((card) => card.id !== cardId)
        localStorage.setItem('cards', JSON.stringify(updatedCards))
    }
}
