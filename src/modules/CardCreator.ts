interface IColors {
    id: string
    header: string
    body: string
    text: string
    button: string
}

export function createCardElement(color: IColors): void {
    const container = document.querySelector<HTMLElement>('.container')
    if (!container)
        throw new Error('No container element found for card element')

    const cardElement = document.createElement('card-element')
    container.appendChild(cardElement)

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const cardWidth = 300
    const cardHeight = 200

    const left = (windowWidth - cardWidth) / 2
    const top = (windowHeight - cardHeight) / 2

    Object.assign(cardElement.style, {
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
    })

    const cardHeader =
        cardElement.shadowRoot!.querySelector<HTMLElement>('.card-header')
    const cardBody =
        cardElement.shadowRoot!.querySelector<HTMLElement>('.card-body')
    const cardTextArea =
        cardElement.shadowRoot!.querySelector<HTMLTextAreaElement>(
            '.card-body textarea',
        )

    if (cardHeader) cardHeader.style.backgroundColor = color.header
    if (cardBody) cardBody.style.backgroundColor = color.body
    if (cardTextArea) cardTextArea.style.color = color.text
}
