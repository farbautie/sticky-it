import { createContext, useState, useEffect } from 'react'

export interface CardData {
    id: string
    body: string
    position: {
        x: number
        y: number
    }
    colors: {
        header: string
        body: string
        text: string
    }
}

const CardContext = createContext<{
    cards: CardData[]
    createNewCard: (cardData: CardData) => void
    onDeleteCard: (cardId: string) => void
    onUpdateCard: (cardData: Partial<CardData>) => void
}>({
    cards: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createNewCard: (_cardData: CardData) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDeleteCard: (_cardId: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdateCard: (_cardData: Partial<CardData>) => {},
})

export const CardProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[]
}) => {
    const [cards, setCards] = useState<CardData[]>([])

    useEffect(() => {
        const existingCardsString = localStorage.getItem('cards')
        if (existingCardsString) {
            const existingCards = JSON.parse(existingCardsString)
            setCards(existingCards)
        }
    }, [])

    const createNewCard = (cardData: CardData) => {
        const updatedCards = [...cards, cardData]
        setCards(updatedCards)
        localStorage.setItem('cards', JSON.stringify(updatedCards))
    }

    const onDeleteCard = (cardId: string) => {
        const updatedCards = cards.filter((card) => card.id !== cardId)
        setCards(updatedCards)
        localStorage.setItem('cards', JSON.stringify(updatedCards))
    }
    // actualiza estados por separados, la posicion en otra funcion y el body igual

    const onUpdateCard = (cardData: Partial<CardData>) => {
        const updatedCards = cards.map((card) => {
            if (card.id === cardData.id) {
                return cardData
            }
            return card
        })
        localStorage.setItem('cards', JSON.stringify(updatedCards))
    }

    return (
        <CardContext.Provider
            value={{
                cards,
                createNewCard,
                onDeleteCard,
                onUpdateCard,
            }}
        >
            {children}
        </CardContext.Provider>
    )
}

export default CardContext
