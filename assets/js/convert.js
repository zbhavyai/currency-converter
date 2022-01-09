/**
 * Add event listeners to select fields
 * document.getElementsByClassName returns NodeList, which is Array like, but not an array. So you cannot use map directly
 */
Array.from(document.getElementsByClassName('currency_list')).map((obj) =>
    obj.addEventListener('click', currencyChanged)
);

/**
 * Add event listeners to input fields
 */
Array.from(document.getElementsByClassName('currency_amount')).map((obj) =>
    obj.addEventListener('input', amountChanged)
);

/**
 * Fetch the conversion rate from the exchangerate-api.com
 */
function get_conversion_rate(sourceCurr, targetCurr) {
    let url = `https://v6.exchangerate-api.com/v6/0a0fe73c79cc22a52d81823a/latest/${sourceCurr}`;

    let resultPromise = fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            document.getElementById('last_update').innerHTML =
                'Last updated: ' +
                String(responseJson['time_last_update_utc']).substring(0, 25);
            return parseFloat(responseJson['conversion_rates'][targetCurr]);
        })
        .catch((error) => console.warn(error));

    return resultPromise;
}

/**
 * Fetch and set result currency when source and target currencies are changed
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

        if (rate === '') {
            targetNum.value = 0;
            console.log('Error');
        } else {
            // targetNum.value = rate * sourceNum.value;
            targetNum.value = parseFloat((rate * sourceNum.value).toFixed(2));
        }
    }
}

/**
 * Fetch and set result currency when any currency amount is changed
 */
async function amountChanged(event) {
    let sourceCurr = '';
    let targetCurr = '';
    let sourceNum = '';
    let targetNum = '';

    if (event.srcElement.id === 'currency_amount_1') {
        sourceCurr = document.getElementById('currency_list_1').value;
        targetCurr = document.getElementById('currency_list_2').value;
        sourceNum = document.getElementById('currency_amount_1');
        targetNum = document.getElementById('currency_amount_2');
    } else {
        sourceCurr = document.getElementById('currency_list_2').value;
        targetCurr = document.getElementById('currency_list_1').value;
        sourceNum = document.getElementById('currency_amount_2');
        targetNum = document.getElementById('currency_amount_1');
    }

    let rate = await get_conversion_rate(sourceCurr, targetCurr);

    if (rate === '') {
        targetNum.value = 0;
        console.log('Error');
    } else {
        targetNum.value = parseFloat((rate * sourceNum.value).toFixed(2));
    }
}

setTimeout(currencyChanged, 1000);
