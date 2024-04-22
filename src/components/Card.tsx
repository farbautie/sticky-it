import React, { useRef } from 'react'

export default function Card() {
    const cardRef = useRef<HTMLDivElement>(null)
    const isDraggingRef = useRef<boolean>(false)
    const offsetRef = useRef<{ offsetX: number; offsetY: number } | null>(null)

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
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
        if (isDraggingRef.current && cardRef.current && offsetRef.current) {
            const newLeft = event.clientX - offsetRef.current.offsetX
            const newTop = event.clientY - offsetRef.current.offsetY
            cardRef.current.style.left = `${newLeft}px`
            cardRef.current.style.top = `${newTop}px`
        }
    }

    function handleMouseUp() {
        isDraggingRef.current = false
        offsetRef.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    return (
        <div
            className="card"
            style={{
                position: 'absolute',
            }}
            ref={cardRef}
            onMouseDown={handleMouseDown}
        >
            <div className="card-header">
                <svg
                    id={''}
                    data-id={''}
                    className="delete"
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
            <div className="card-body">
                <textarea
                    onMouseDown={(e) => e.stopPropagation()}
                    onMouseUp={(e) => e.stopPropagation()}
                ></textarea>
            </div>
        </div>
    )
}
