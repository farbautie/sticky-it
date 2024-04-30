import { Card } from '../types'
import { updateCardData } from './storage'

export function createCardElement(cardData: Card): void {
    const container = document.querySelector<HTMLElement>('.container')
    if (!container) throw new Error('No container element found for card element')

    const {
        id,
        body,
        position: { left, top },
        colors,
    } = cardData

    const existingCard = container.querySelector(`[data-id="${id}"]`)
    if (existingCard) return

    const cardElement = document.createElement('card-element')
    container.insertAdjacentElement('beforeend', cardElement)

    const cardContainer = cardElement.shadowRoot!.querySelector<HTMLElement>('.card-container')!

    cardContainer.setAttribute('style', `position: absolute; left: ${left}px; top: ${top}px;`)
    cardContainer.setAttribute('data-id', `${id}`)

    const cardHeader = cardElement.shadowRoot!.querySelector<HTMLElement>('.card-header')
    const cardBody = cardElement.shadowRoot!.querySelector<HTMLElement>('.card-body')
    const cardTextArea = cardElement.shadowRoot!.querySelector<HTMLTextAreaElement>('.card-body textarea')

    if (cardHeader) cardHeader.style.backgroundColor = colors.header
    if (cardBody) cardBody.style.backgroundColor = colors.body
    if (cardTextArea) {
        cardTextArea.style.color = colors.text
        cardTextArea.value = body
        cardTextArea.style.height = 'auto'
        cardTextArea.style.height = `${cardTextArea.scrollHeight}px`
        cardTextArea.addEventListener('input', () => {
            cardTextArea.style.height = 'auto'
            cardTextArea.style.height = `${cardTextArea.scrollHeight}px`
            updateCardData({ id, body: cardTextArea.value })
        })

        cardTextArea.addEventListener('mousedown', (e) => {
            e.stopPropagation()
        })
    }
}
