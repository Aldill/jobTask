const checkRadio = () => {
    const checkedRadio = document.querySelectorAll('input[name=showAmount');
    checkedRadio.forEach(button => {
        if (button.checked) {
            getItems(button.value);
        }
    })
}

const showMoreAmount = () => {
    document.querySelector('.itemsContainer__showMore ').addEventListener('click', () => {
        checkRadio();
    })
}

const radioButtonsEvent = () => {
    const item = document.querySelectorAll("input[name=showAmount]");
    item.forEach(current => {
        current.addEventListener('click', current => {
            document.querySelector(".itemsContainer__items").innerHTML = '';
            getItems(current.currentTarget.value);
        })
    })
}

const printItems = (data, amount) => {
    const { list } = data; // destructuring list from data object
    const amountGood = parseInt(amount);
    const countDisplayed = document.querySelector(".itemsContainer__items").childElementCount;
    const maxDisplay = countDisplayed + amountGood > list.length ? list.length : countDisplayed + amountGood;  //if add amount is more than list length set end of slice to list length 
    if (countDisplayed < list.length) {
        list.slice(countDisplayed, maxDisplay).map(item => {
            document.querySelector('.itemsContainer__items').innerHTML += `
                    <div class="itemsContainer__item">
                        <div class="itemsContainer__itemInfo itemsContainer__itemInfo--top">
                            <div class="itemsContainer__itemCount">
                            <img src="images/count.png" />
                            <span>sztuk&nbsp;<b>5</b></span>
                            </div>
                            <div class="itemsContainer__itemDiscount">oszczędzasz:&nbsp;<b>${item.price.gross.base_float - item.price.gross.promo_float}zł</b></div>
                        </div>
                        <div class="itemsContainer__itemInfo itemsContainer__itemInfo--image">
                        <img src="https://www.outletmeblowy.pl/environment/cache/images/300_300_productGfx_${item.main_image}.jpg" />
                        </div>
                        <div class="itemsContainer__itemInfo itemsContainer__itemInfo--bottom">
                            <div class="itemsContainer__itemPrice">
                                <div class="itemsContainer__itemActualPrice">${item.price.gross.promo_float} zł</div>
                                <div class="itemsContainer__itemBeforePrice">${item.price.gross.base_float} zł</div >
                             </div >
                            <div class="itemsContainer__itemName">${item.name}</div>
                            <div class="itemsContainer__itemCompany">${item.producer.name}</div >
                        </div >
                    </div >
        `;
            document.querySelector(".itemsContainer__info").innerHTML = ` Wyświetlono ${maxDisplay} na ${list.length} elementów.`;
        })
    }
}

const getItems = (amount) => {
    return fetch('./example.json')
        .then((response) => response.json())
        .then((data) => {
            printItems(data, amount);
        })
        .catch((error) => {
            console.log(error);
        })
}

window.addEventListener('load', () => {
    radioButtonsEvent();
    showMoreAmount();
    checkRadio();
});