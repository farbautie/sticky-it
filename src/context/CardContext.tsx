import { createContext, useState } from 'react'

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
    addCard: (cardData: CardData) => void
    onDeleteCard: (cardId: string) => void
}>({
    cards: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addCard: (_cardData: CardData) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDeleteCard: (_cardId: string) => {},
})

export const CardProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[]
}) => {
    const [cards, setCards] = useState<CardData[]>([])

    const addCard = (cardData: CardData) => {
        setCards([...cards, cardData])
    }

    const onDeleteCard = (cardId: string) => {
        const updateCards = cards.filter((card) => card.id !== cardId)
        setCards(updateCards)
    }

    return (
        <CardContext.Provider value={{ cards, addCard, onDeleteCard }}>
            {children}
        </CardContext.Provider>
    )
}

export default CardContext
