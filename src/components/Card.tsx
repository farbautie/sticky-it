import React, { useRef } from 'react'

import { CardData } from '@/context/CardContext'

export default function Card({ colors, position }: CardData) {
    const cardRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const offsetRef = useRef<{ offsetX: number; offsetY: number } | null>(null)

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if (event.button !== 0 || !cardRef.current) return
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            offsetRef.current = {
                offsetX: event.clientX - rect.left,
                offsetY: event.clientY - rect.top,
            }
            isDraggingRef.current = true
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }
    }

    function handleMouseMove(event: MouseEvent) {
        if (!isDraggingRef.current || !cardRef.current || !offsetRef.current)
            return
        const newLeft = event.clientX - offsetRef.current.offsetX
        const newTop = event.clientY - offsetRef.current.offsetY

        const { clientWidth, clientHeight } = document.documentElement
        const cardWidth = cardRef.current.clientWidth
        const cardHeight = cardRef.current.clientHeight
        // Limiting movement within the window boundaries

        const boundedLeft = Math.min(
            Math.max(newLeft, 0),
            clientWidth - cardWidth
        )
        const boundedTop = Math.min(
            Math.max(newTop, 0),
            clientHeight - cardHeight
        )

        cardRef.current.style.left = `${boundedLeft}px`
        cardRef.current.style.top = `${boundedTop}px`
    }

    function handleMouseUp() {
        isDraggingRef.current = false
        offsetRef.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    function handleDelete() {
        if (cardRef.current) {
            cardRef.current.remove()
        }
    }

    function handleTextareaInput() {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + 'px'
        }
    }

    return (
        <div
            className="card"
            style={{
                left: position.x + 'px',
                top: position.y + 'px',
            }}
            ref={cardRef}
            onMouseDown={handleMouseDown}
        >
            <div
                className="card-header"
                style={{ backgroundColor: colors.header }}
            >
                <svg
                    onClick={handleDelete}
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
            <div
                className="card-body"
                style={{
                    backgroundColor: colors.body,
                }}
            >
                <textarea
                    style={{
                        color: colors.text,
                    }}
                    ref={textareaRef}
                    onInput={handleTextareaInput}
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    )
}
