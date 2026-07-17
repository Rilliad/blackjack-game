let player = {
    name: "Player",
    chips: 1000
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let card = {
        suit: "",
        name: "",
        value: 0,
        url: ``
    }
    
    let suits = ["Club", "Diamond", "Heart", "Spade"]
    let names = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
    
    let cardSuitIndex = Math.floor( Math.random()*4 )
    card.suit = suits[cardSuitIndex]
    
    let cardNameIndex = Math.floor( Math.random()*13 )
    card.name = names[cardNameIndex]
    if (cardNameIndex >= 10) {
        card.value = 10
        let upperCaseUrlPart = `${card.suit}-${cardNameIndex+1}-${card.name}`
        card.url = `./Cards/${upperCaseUrlPart.toUpperCase()}.svg`
    } else if (cardNameIndex === 0) {
        card.value = 11
        let upperCaseUrlPart = `${card.suit}`
        card.url = `./Cards/${upperCaseUrlPart.toUpperCase()}-1.svg`
    } else {
        card.value = cardNameIndex + 1
        let upperCaseUrlPart = `${card.suit}`
        card.url = `./Cards/${upperCaseUrlPart.toUpperCase()}-${card.name}.svg`
    }
    
    return card
}

function startGame() {
    document.getElementById("card-img-container").innerHTML = ""
    cards = []
    if (player.chips >= 45) {
        player.chips -= 45
        isAlive = true
        hasBlackJack = false
        sum = 0
        newCard()
        newCard()
    } else if (player.chips > 0) {
        player.chips = 0
        isAlive = true
        hasBlackJack = false
        sum = 0
        newCard()
        newCard()
    } else { 
        messageEl.textContent = "Sorry, you are out of money. Better luck next time."
    }
}

function renderGame() {
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack! Do you want to go again?"
        hasBlackJack = true
        player.chips += 250
    } else {
        message = "You busted! Want to try again?"
        isAlive = false
    }
    messageEl.textContent = message
    
    playerEl.textContent = player.name + ": $" + player.chips
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        addCardImg(card)
        cards.push(card)
        sum += card.value
        
        if (sum > 21) {
            if (cards.find(softAce) !== undefined) {
                cards.find(softAce).value = 1
                sum -= 10
            }
        }
        renderGame()
    }
}


function addCardImg(card) {
    let cardImg = document.createElement("img")
    cardImg.src = card.url
    cardImg.alt = `${card.name} of ${card.suit}s`
    cardImg.title = `${card.name} of ${card.suit}s`
    cardImg.className = "card-img"
    document.getElementById("card-img-container").appendChild(cardImg)
}

function softAce(currentCard) {
    return (currentCard.name === "Ace" && currentCard.value === 11)
}

// isAlive = true 
// hasBlackJack = false

// let card = {
//     name: "Ace",
//     value: 11,
// }

// cards.push(card)

function softAce(currentCard) {
    return (currentCard.name === "Ace" && currentCard.value === 11)
}
