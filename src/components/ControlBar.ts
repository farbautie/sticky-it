import { nanoid } from 'nanoid'
import { colors } from '../colors'
import { createCardElement } from '../modules/cardCreator'
import { addCardToLocalStorage } from '../modules/storage'

class ControlBar extends HTMLElement {
    static name = 'control-bar'
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback(): void {
        this.render()
    }

    static get styles(): string {
        return /* css */ `
            .controls {
                bottom: 1rem;
                left: 50%;
                z-index: 10;
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                background-color: #21212b;
                padding: 1rem;
                border-radius: 0.75rem;
                transform: translateX(-50%);
            }
            
            .control-button {
                border: none;
                border-radius: 0.375rem;
                width: 2rem;
                height: 2rem;
                cursor: pointer;
                transition: all 0.3s;
            }

            .control-button:hover {
                width: 2.25rem;
                height: 2.25rem;
            }
          `
    }

    render(): void {
        const controlsContainer = document.createElement('div')
        controlsContainer.classList.add('controls')

        const { innerWidth, innerHeight } = window
        const cardWidth = 300
        const cardHeight = 200

        const left = (innerWidth - cardWidth) / 2
        const top = (innerHeight - cardHeight) / 2

        colors.forEach((color) => {
            const button = document.createElement('button')
            button.classList.add('control-button')
            button.style.backgroundColor = color.button
            button.onclick = () => {
                const cardData = {
                    id: nanoid(),
                    body: '',
                    colors: { ...color },
                    position: {
                        left,
                        top,
                    },
                }
                createCardElement(cardData)
                addCardToLocalStorage(cardData)
            }
            controlsContainer.appendChild(button)
        })

        this.shadowRoot!.innerHTML = /* html */ `
            <style>${ControlBar.styles}</style>
        `
        this.shadowRoot!.appendChild(controlsContainer)
    }
}

customElements.define(ControlBar.name, ControlBar)
