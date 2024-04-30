interface IColors {
    id: string
    header: string
    body: string
    text: string
    button: string
}

export function createCardElement(color: IColors): void {
    const container = document.querySelector<HTMLElement>('.container')
    if (!container) throw new Error('No container element found for card element')

    const cardElement = document.createElement('card-element')
    container.insertAdjacentElement('beforeend', cardElement)

    const cardContainer = cardElement.shadowRoot!.querySelector<HTMLElement>('.card-container')!

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const cardWidth = 300
    const cardHeight = 200

    const left = (windowWidth - cardWidth) / 2
    const top = (windowHeight - cardHeight) / 2

    cardContainer.setAttribute('style', `position: absolute; left: ${left}px; top: ${top}px;`)
    const cardHeader = cardElement.shadowRoot!.querySelector<HTMLElement>('.card-header')
    const cardBody = cardElement.shadowRoot!.querySelector<HTMLElement>('.card-body')
    const cardTextArea = cardElement.shadowRoot!.querySelector<HTMLTextAreaElement>('.card-body textarea')

    if (cardHeader) cardHeader.style.backgroundColor = color.header
    if (cardBody) cardBody.style.backgroundColor = color.body
    if (cardTextArea) {
        cardTextArea.style.color = color.text
        cardTextArea.addEventListener('input', () => {
            cardTextArea.style.height = 'auto'
            cardTextArea.style.height = `${cardTextArea.scrollHeight}px`
        })

        cardTextArea.addEventListener('mousedown', (e) => {
            e.stopPropagation()
        })
    }
}
