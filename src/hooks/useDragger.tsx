/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react'
import { useCardStorage } from './useCardStorage'
import { CardData } from '@/context/CardContext'

export const useDragger = () => {
    const { cards, updateInLocalStorage } = useCardStorage('cards')
    const [currentCard, setCurrentCard] = useState<CardData>()

    const isDragging = useRef<boolean>(false)
    const targetRef = useRef<HTMLDivElement>(null)
    const coords = useRef<{
        startX: number
        startY: number
        lastX: number
        lastY: number
    }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
    })

    const onMouseDown = (e: MouseEvent) => {
        if (!e.target || !targetRef.current) return
        isDragging.current = true
        coords.current.startX = e.clientX
        coords.current.startY = e.clientY

        coords.current.lastX = targetRef.current.offsetLeft
        coords.current.lastY = targetRef.current.offsetTop
    }

    const onMouseUp = () => {
        if (!targetRef.current) return

        isDragging.current = false
        const targetId = targetRef.current.id
        const actualCard = cards.find((card) => card.id === targetId)
        if (actualCard) {
            setCurrentCard(actualCard)
            updateInLocalStorage({
                ...currentCard,
                position: {
                    x: coords.current.startX,
                    y: coords.current.startY,
                },
            })
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !targetRef.current) return

        const nextX = e.clientX - coords.current.startX + coords.current.lastX
        const nextY = e.clientY - coords.current.startY + coords.current.lastY

        targetRef.current.style.top = `${nextY}px`
        targetRef.current.style.left = `${nextX}px`
    }

    useEffect(() => {
        if (!targetRef.current) return

        targetRef.current.addEventListener('mousedown', onMouseDown)
        targetRef.current.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)

        return () => {
            if (!targetRef.current) return

            targetRef.current.removeEventListener('mousedown', onMouseDown)
            targetRef.current.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
        }
    }, [onMouseDown, onMouseMove])

    return {
        targetRef,
    }
}
