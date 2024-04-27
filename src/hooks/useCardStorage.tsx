import { useContext, useEffect } from 'react'
import { CardContext, CardData } from '@/context/CardContext'

export const useCardStorage = (key: string) => {
    const { cards, setCards } = useContext(CardContext)

    useEffect(() => {
        const existingCards = localStorage.getItem(key)
        if (!existingCards) return

        setCards(JSON.parse(existingCards) as unknown as CardData[])
    }, [key, setCards])

    const saveToLocalStorage = (cardData: CardData) => {
        const updatedCards = [...cards, cardData]
        setCards(updatedCards)
        localStorage.setItem(key, JSON.stringify(updatedCards))
    }

    const updateInLocalStorage = (updatedCardData: Partial<CardData>) => {
        const existingCards = localStorage.getItem(key)
        if (!existingCards) return

        const updatedCards = JSON.parse(existingCards).map((card: CardData) => {
            if (card.id === updatedCardData.id) {
                return updatedCardData
            } else {
                return card
            }
        })

        localStorage.setItem(key, JSON.stringify(updatedCards))
    }

    const removeFromLocalStorage = (cardId: string) => {
        const updatedCards = cards.filter((card) => card.id !== cardId)
        setCards(updatedCards)
        localStorage.setItem(key, JSON.stringify(updatedCards))
    }

    return {
        cards,
        saveToLocalStorage,
        updateInLocalStorage,
        removeFromLocalStorage,
    }
}
