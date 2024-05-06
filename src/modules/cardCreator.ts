import { Card } from '../types'
import { updateCardFromLocalStorage, deleteCardsFromLocalStorage } from './storage'

const CONTAINER_SELECTOR = '.container'
const CARD_ELEMENT_SELECTOR = 'card-element'
const CARD_CONSTAINER_SELECTOR = '.card-container'
const CARD_HEADER_SELECTOR = '.card-header'
const CARD_BODY_SELECTOR = '.card-body'
const CARD_BODY_TEXTAREA_SELECTOR = '.card-body textarea'
const CARD_SVG_SELECTOR = '.card-header svg'

export function createCardElement(cardData: Card): void {
    const container = document.querySelector<HTMLElement>(CONTAINER_SELECTOR)
    if (!container) throw new Error('No container element found for card element')

    const {
        id,
        body,
        position: { left, top },
        colors,
    } = cardData

    if (container.querySelector(`[data-id="${id}"]`)) {
        return
    }

    const cardElement = document.createElement(CARD_ELEMENT_SELECTOR)
    container.insertAdjacentElement('beforeend', cardElement)

    const cardContainer = cardElement.shadowRoot!.querySelector<HTMLElement>(CARD_CONSTAINER_SELECTOR)!
    cardContainer.style.cssText = `position: absolute; left: ${left}px; top: ${top}px;`
    cardContainer.dataset.id = id

    const { cardHeader, iconTrash, cardBody, cardTextArea } = getCardElements(cardElement)

    applyStyles(cardHeader, { backgroundColor: colors.header })
    applyStyles(cardBody, { backgroundColor: colors.body })

    configureDeleteButton(iconTrash, cardData.id, cardElement)
    configureTextArea(cardTextArea as HTMLTextAreaElement, { id, body })
}

function getCardElements(cardElement: HTMLElement): Record<string, HTMLElement> {
    const shadow = cardElement.shadowRoot!
    return {
        cardHeader: shadow.querySelector<HTMLElement>(CARD_HEADER_SELECTOR)!,
        iconTrash: shadow.querySelector<HTMLElement>(CARD_SVG_SELECTOR)!,
        cardBody: shadow.querySelector<HTMLElement>(CARD_BODY_SELECTOR)!,
        cardTextArea: shadow.querySelector<HTMLTextAreaElement>(CARD_BODY_TEXTAREA_SELECTOR)!,
    }
}

function applyStyles(element: HTMLElement, styles: Record<string, string>): void {
    if (!element) return
    Object.assign(element.style, styles)
}

function configureDeleteButton(iconTrash: HTMLElement, cardId: string, cardElement: HTMLElement): void {
    iconTrash.setAttribute('id', cardId)
    iconTrash.addEventListener('click', () => {
        cardElement.remove()
        deleteCardsFromLocalStorage(cardId)
    })
}

function configureTextArea(textArea: HTMLTextAreaElement, { id, body }: { id: string; body: string }): void {
    textArea.value = body
    textArea.style.color = 'colors.text'
    textArea.style.height = 'auto'
    textArea.style.height = `${textArea.scrollHeight}px`

    textArea.addEventListener('input', () => {
        textArea.style.height = 'auto'
        textArea.style.height = `${textArea.scrollHeight}px`
        updateCardFromLocalStorage({ id, body: textArea.value })
    })

    textArea.addEventListener('mousedown', (e) => {
        e.stopPropagation()
    })
}
