import { updateCardData } from '../modules/storage'

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
            cursor: pointer;
            position: absolute; /* Make the card draggable */
            }
        
            .card-header {
            background-color: #9bd1de;
            height: 1.7rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            border-radius: 5px 5px 0 0;
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

        updateCardData({
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
          <div class="card-header"></div>
          <div class="card-body">
            <textarea></textarea>
          </div>
        </div>
      `
    }
}

customElements.define(CardElement.name, CardElement)
