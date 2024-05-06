import { updateCardFromLocalStorage } from '../modules/storage'

class CardElement extends HTMLElement {
    static name = 'card-element'

    cardContainer: HTMLElement | undefined
    isDragging: boolean = false
    initialX: number = 0
    initialY: number = 0

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback(): void {
        this.render()
        this.cardContainer = this.shadowRoot!.querySelector<HTMLElement>('.card-container')!
        this.cardContainer.addEventListener('mousedown', this.onMouseDown.bind(this))
        document.addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    static get styles(): string {
        return /* css */ `
            .card-container {
                width: 18rem;
                border-radius: 5px;
                cursor: grab;
                position: absolute; /* Make the card draggable */
            }
        
            .card-header {
                background-color: #9bd1de;
                height: 1.7rem;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                border-radius: 5px 5px 0 0;
                overflow: hidden;
            }

            .card-header svg {
                cursor: pointer;
                padding: 0.5rem;
                background-color: inherit;
                height: 20px;
                width: 20px;

            }

            .card-body {
                padding: 1rem .5rem;
                background-color: #a6dce9;
                border-radius: 0 0 5px 5px;
            }
        
            .card-body textarea {
                background-color: inherit;
                border: none;
                width: 100%;
                height: 100%;
                resize: none;
                font-size: 16px;
            }
        
            .card-body textarea:focus {
                background-color: inherit;
                outline: none;
                width: 100%;
                height: 100%;
            }
      `
    }

    onMouseDown(event: MouseEvent): void {
        this.isDragging = true
        this.initialX = event.clientX
        this.initialY = event.clientY
        document.addEventListener('mousemove', this.onMouseMove.bind(this))
    }

    onMouseUp(): void {
        this.isDragging = false
        document.removeEventListener('mousemove', this.onMouseMove.bind(this))

        updateCardFromLocalStorage({
            id: this.cardContainer!.dataset.id as string,
            position: { left: this.cardContainer!.offsetLeft, top: this.cardContainer!.offsetTop },
        })
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.isDragging) return

        const deltaX = event.clientX - this.initialX
        const deltaY = event.clientY - this.initialY

        this.cardContainer!.style.left = `${this.cardContainer!.offsetLeft + deltaX}px`
        this.cardContainer!.style.top = `${this.cardContainer!.offsetTop + deltaY}px`

        this.initialX = event.clientX
        this.initialY = event.clientY
    }

    disconnectedCallback(): void {
        this.cardContainer!.removeEventListener('mousedown', this.onMouseDown)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    render(): void {
        this.shadowRoot!.innerHTML = /* html */ `
        <style>${CardElement.styles}</style>
        <div class="card-container">
          <div class="card-header">
            <svg viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2"  
                    stroke-linecap="round"  
                    stroke-linejoin="round"  
                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
          <div class="card-body">
            <textarea></textarea>
          </div>
        </div>
      `
    }
}

customElements.define(CardElement.name, CardElement)
