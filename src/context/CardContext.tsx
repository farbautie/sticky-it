import { createContext, SetStateAction, useState } from 'react'

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

export const CardContext = createContext<{
    cards: CardData[]
    setCards: React.Dispatch<React.SetStateAction<CardData[]>>
}>({
    cards: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCards: function (_value: SetStateAction<CardData[]>): void {
        throw new Error('Function not implemented.')
    },
})

export const CardProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[]
}) => {
    const [cards, setCards] = useState<CardData[]>([])

    return (
        <CardContext.Provider
            value={{
                cards,
                setCards,
            }}
        >
            {children}
        </CardContext.Provider>
    )
}
