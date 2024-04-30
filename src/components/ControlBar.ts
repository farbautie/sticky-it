import { colors } from '../colors'
import { createCardElement } from '../modules/CardCreator'

class ControlBar extends HTMLElement {
    static name = 'control-bar'
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    static get styles() {
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

    render() {
        const controlsContainer = document.createElement('div')
        controlsContainer.classList.add('controls')

        colors.forEach((color) => {
            const button = document.createElement('button')
            button.classList.add('control-button')
            button.style.backgroundColor = color.button
            button.onclick = () => {
                createCardElement(color)
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
