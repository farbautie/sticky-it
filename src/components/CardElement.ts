class CardElement extends HTMLElement {
    static name = 'card-element'
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render()
    }

    static get styles() {
        return /* css */ `
            .card-container {
                width: 18rem;
                border-radius: 5px;
                cursor: pointer;
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

    render() {
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
