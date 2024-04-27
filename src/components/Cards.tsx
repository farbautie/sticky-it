import { useEffect, useRef, useState } from 'react'

import { useCardStorage } from '@/hooks/useCardStorage'
import { CardData } from '@/context/CardContext'
import { cn } from '@/utils/cn'

export default function Card({ id, colors, position }: CardData) {
    const [textValue, setTextValue] = useState<string>('')
    const { cards, removeFromLocalStorage, updateInLocalStorage } =
        useCardStorage('cards')
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [currentCard, setCurrentCard] = useState<CardData>()

    useEffect(() => {
        const currentCard = cards.find((card) => card.id === id)
        if (currentCard) {
            setTextValue(currentCard.body)
            setCurrentCard(currentCard)
            setTimeout(onTextareaInput, 0)
        }
    }, [cards, id])

    const onTextareaChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newTextValue = event.target.value
        setTextValue(newTextValue)
        updateInLocalStorage({
            ...currentCard,
            body: newTextValue,
        })
    }

    const onTextareaInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + 'px'
        }
    }
    return (
        <div
            className="absolute w-72 cursor-pointer"
            style={{
                left: position.x + 'px',
                top: position.y + 'px',
            }}
        >
            <div className="flex flex-col justify-center items-center w-full">
                <div
                    className={`${cn(
                        colors.header
                    )} flex justify-end py-1 rounded-t-md w-full`}
                >
                    <svg
                        onClick={() => removeFromLocalStorage(id)}
                        style={{
                            height: '20px',
                        }}
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                        stroke="#000000"
                        fill="none"
                        strokeWidth="1.5"
                    >
                        <path d="m6 8 .668 8.681c.148 1.924.222 2.885.84 3.423.068.06.14.115.217.165.685.449 1.63.26 3.522-.118.36-.072.54-.108.721-.111h.064c.182.003.361.039.72.11 1.892.379 2.838.568 3.523.12.076-.05.15-.106.218-.166.617-.538.691-1.5.84-3.423L18 8"></path>
                        <path
                            strokeLinecap="round"
                            d="m10.151 12.5.245 3.492M13.849 12.5l-.245 3.492M4 8s4.851 1 8 1 8-1 8-1M8 5l.447-.894A2 2 0 0 1 10.237 3h3.527a2 2 0 0 1 1.789 1.106L16 5"
                        ></path>
                    </svg>
                </div>
                <div className={`${cn(colors.body)} rounded-b-md w-full`}>
                    <textarea
                        className={`${cn(
                            colors.text
                        )} bg-inherit focus:bg-inherit px-2 py-2 border-none w-full focus:w-full h-full focus:h-full text-base resize-none focus:outline-none`}
                        ref={textareaRef}
                        value={textValue}
                        onInput={onTextareaInput}
                        onChange={onTextareaChange}
                    />
                </div>
            </div>
        </div>
    )
}
