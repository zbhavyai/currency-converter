/**
 * Add event listeners to input fields
 * document.getElementsByClassName returns NodeList, which is Array like, but not an array. So you cannot use map directly
 */
Array.from(document.getElementsByClassName('currency_list')).map((obj) =>
    obj.addEventListener('click', currencyChanged)
);

/**
 * Fetch the conversion rate from the exchangerate-api.com
 * @param {string} sourceCurr
 * @param {string} targetCurr
 * @returns {float}
 */
function get_conversion_rate(sourceCurr, targetCurr) {
    let url = `https://v6.exchangerate-api.com/v6/0a0fe73c79cc22a52d81823a/latest/${sourceCurr}`;

    let resultPromise = fetch(url)
        .then((response) => response.json())
        .then((responseJson) =>
            parseFloat(responseJson['conversion_rates'][targetCurr])
        )
        .catch((error) => console.warn(error));

    return resultPromise;
}

/**
 * Event listener added to select fields
 */
async function currencyChanged() {
    let sourceCurr = document.getElementById('currency_list_1').value;
    let targetCurr = document.getElementById('currency_list_2').value;
    let sourceNum = document.getElementById('currency_amount_1');
    let targetNum = document.getElementById('currency_amount_2');

    if (sourceNum.value === '') {
        targetNum.value = '';
    } else {
        let rate = await get_conversion_rate(sourceCurr, targetCurr);

        console.log(sourceCurr + ' -> ' + targetCurr);
        console.log(rate);
        console.log(sourceNum.value + ' and ' + targetNum.value);

        if (rate === '') {
            targetNum.value = 0;
            console.log('Error');
        } else {
            targetNum.value = rate * sourceNum.value;
            console.log('Final target = ' + targetNum.value);
        }
    }
}

setTimeout(currencyChanged, 1000);
