import { useContext } from 'react'

import CardContext from '@/context/CardContext'
import Card from '@/components/Card'

export default function Container() {
    const { cards } = useContext(CardContext)

    return (
        <div className="container">
            {cards.map((card) => {
                return <Card key={card.id} {...card} />
            })}
        </div>
    )
}
