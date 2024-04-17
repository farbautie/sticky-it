class DraggableElement {
    constructor(element, cardData) {
        this.element = element
        this.cardData = cardData
        this.startY = 0
        this.startX = 0
        this.newCoordinateX = 0
        this.newCoordinateY = 0
        this.isDragging = false

        this.element.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.element.addEventListener(
            'touchstart',
            this.onTouchStart.bind(this)
        )
        this.element
            .querySelector('textarea')
            .addEventListener('mousedown', this.stopPropagation.bind(this))
        this.element
            .querySelector('textarea')
            .addEventListener('touchstart', this.stopPropagation.bind(this))
    }

    onMouseDown(event) {
        event.preventDefault()
        this.startDrag(event.clientX, event.clientY)
        document.addEventListener('mousemove', this.onMouseMove.bind(this))
        document.addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    onTouchStart(event) {
        event.preventDefault()
        const touch = event.touches[0]
        this.startDrag(touch.clientX, touch.clientY)
        document.addEventListener('touchmove', this.onTouchMove.bind(this))
        document.addEventListener('touchend', this.onTouchEnd.bind(this))
    }

    startDrag(clientX, clientY) {
        this.startX = clientX
        this.startY = clientY
        this.isDragging = true
    }

    onMouseMove(event) {
        if (this.isDragging) {
            this.updatePosition(event.clientX, event.clientY)
        }
    }

    onTouchMove(event) {
        if (this.isDragging) {
            const touch = event.touches[0]
            this.updatePosition(touch.clientX, touch.clientY)
        }
    }

    onMouseUp() {
        this.endDrag()
        this.updateCardPositionInLocalStorage()
    }

    onTouchEnd() {
        this.endDrag()
        this.updateCardPositionInLocalStorage()
    }

    endDrag() {
        this.isDragging = false
        document.removeEventListener('mousemove', this.onMouseMove.bind(this))
        document.removeEventListener('mouseup', this.onMouseUp.bind(this))
        document.removeEventListener('touchmove', this.onTouchMove.bind(this))
        document.removeEventListener('touchend', this.onTouchEnd.bind(this))
    }

    updatePosition(clientX, clientY) {
        this.newCoordinateX = this.startX - clientX
        this.newCoordinateY = this.startY - clientY
        this.startX = clientX
        this.startY = clientY
        this.element.style.top =
            this.element.offsetTop - this.newCoordinateY + 'px'
        this.element.style.left =
            this.element.offsetLeft - this.newCoordinateX + 'px'
    }

    stopPropagation(event) {
        event.stopPropagation()
    }

    updateCardPositionInLocalStorage() {
        this.cardData.position.x = parseInt(this.element.style.left)
        this.cardData.position.y = parseInt(this.element.style.top)
        const existingCards = JSON.parse(localStorage.getItem('cards')) || []
        const updatedCards = existingCards.map((card) => {
            if (card.id === this.cardData.id) {
                return this.cardData
            } else {
                return card
            }
        })
        localStorage.setItem('cards', JSON.stringify(updatedCards))
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addCardButton = document.querySelector('#add-card')
    addCardButton.addEventListener('click', () => {
        const cardData = {
            id: Math.round(Math.random() * 100).toString(),
            body: '',
            position: {
                x: 10,
                y: 50,
            },
            colors: {
                colorHeader: '#FFEFBE',
                colorBody: '#FFF5DF',
                colorText: '#18181A',
            },
        }
        addCard(cardData)

        const cardElements = document.querySelectorAll('.card')
        const card = cardElements[cardElements.length - 1]

        new DraggableElement(card, cardData)

        const cardTextArea = card.querySelector('textarea')
        cardTextArea.addEventListener('input', function () {
            cardData.body = this.value
            updateCardInLocalStorage(cardData)
        })

        saveCardToLocalStorage(cardData)
    })

    loadCardsFromLocalStorage()
})

function addCard(cardData) {
    const container = document.querySelector('.container')

    const cardTemplate = `<div class="card" style="left:${cardData.position.x}px;top:${cardData.position.y}px" data-id=${cardData.id}>
        <div class="card-header" style="background-color:${cardData.colors.colorHeader};z-index="998"; data-id=${cardData.$id}">
            <svg id="delete-${cardData.id}" data-id=${cardData.id} class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" stroke="#000000" fill="none" stroke-width="1.5"><path d="m6 8 .668 8.681c.148 1.924.222 2.885.84 3.423.068.06.14.115.217.165.685.449 1.63.26 3.522-.118.36-.072.54-.108.721-.111h.064c.182.003.361.039.72.11 1.892.379 2.838.568 3.523.12.076-.05.15-.106.218-.166.617-.538.691-1.5.84-3.423L18 8"></path><path stroke-linecap="round" d="m10.151 12.5.245 3.492M13.849 12.5l-.245 3.492M4 8s4.851 1 8 1 8-1 8-1M8 5l.447-.894A2 2 0 0 1 10.237 3h3.527a2 2 0 0 1 1.789 1.106L16 5"></path></svg>
        </div>
        <div class="card-body" style="background-color:${cardData.colors.colorBody}">
            <textarea data-id=${cardData.id} style="color:${cardData.colors.colorText}">${cardData.body}</textarea>
        </div>
    </div>`

    container.insertAdjacentHTML('beforeend', cardTemplate)

    const deleteButton = document.querySelector(`#delete-${cardData.id}`)
    deleteButton.addEventListener('click', handleDelete)

    const cardTextArea = container.querySelector(
        `.card[data-id="${cardData.id}"] textarea`
    )
    cardTextArea.addEventListener('input', function () {
        cardData.body = this.value
        updateCardInLocalStorage(cardData)
        autoGrow.call(cardTextArea)
    })
}

async function handleDelete() {
    this.parentElement.parentElement.remove()
    const cardId = this.getAttribute('data-id')
    removeCardFromLocalStorage(cardId)
}

function autoGrow() {
    this.style.height = 'auto' // Reset the height
    this.style.height = this.scrollHeight + 'px' // Set the new height
}

function saveCardToLocalStorage(cardData) {
    const existingCards = JSON.parse(localStorage.getItem('cards')) || []
    existingCards.push(cardData)

    localStorage.setItem('cards', JSON.stringify(existingCards))
}

function loadCardsFromLocalStorage() {
    const existingCards = JSON.parse(localStorage.getItem('cards')) || []
    existingCards.forEach((cardData) => {
        addCard(cardData)
        const cardElement = document.querySelector(
            `.card[data-id="${cardData.id}"]`
        )
        new DraggableElement(cardElement, cardData)
        const cardTextArea = cardElement.querySelector('textarea')
        autoGrow.call(cardTextArea)
    })
}

function removeCardFromLocalStorage(cardId) {
    const existingCards = JSON.parse(localStorage.getItem('cards')) || []
    const updatedCards = existingCards.filter((card) => card.id !== cardId)

    localStorage.setItem('cards', JSON.stringify(updatedCards))
}

function updateCardInLocalStorage(updatedCardData) {
    const existingCards = JSON.parse(localStorage.getItem('cards')) || []
    const updatedCards = existingCards.map((card) => {
        if (card.id === updatedCardData.id) {
            return updatedCardData
        } else {
            return card
        }
    })

    localStorage.setItem('cards', JSON.stringify(updatedCards))
}
