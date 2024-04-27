import { useCardStorage } from '@/hooks/useCardStorage'
import Card from './Cards'

export const Board = () => {
    // const { cards } = useContext(CardContext)
    const { cards } = useCardStorage('cards')

    return (
        <div className="top-0 z-[-2] absolute bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00000d_1px)] bg-[size:20px_20px] w-screen h-screen overflow-hidden">
            {cards.map((card) => (
                <Card key={card.id} {...card} />
            ))}
        </div>
    )
}
