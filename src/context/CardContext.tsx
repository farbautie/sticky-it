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
}>({
    cards: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addCard: (_cardData: CardData) => {},
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

    return (
        <CardContext.Provider value={{ cards, addCard }}>
            {children}
        </CardContext.Provider>
    )
}

export default CardContext
