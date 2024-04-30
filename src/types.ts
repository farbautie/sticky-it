type CardColors = {
    id: string
    header: string
    body: string
    text: string
    button: string
}

type CardPosition = {
    left: number
    top: number
}

type Card = {
    id: string
    body: string
    position: CardPosition
    colors: CardColors
}

export type { Card, CardColors }
