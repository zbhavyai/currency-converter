/**
 * Populates the dropdown of currencies
 * @param {JSON} currency_json
 */
function populate_currency_list(currency_json) {
    let currency_list = document.getElementsByClassName('currency_list');

    // loop for two dropdowns
    for (let i = 0; i < currency_list.length; i++) {
        // loop for every supported currency
        for (let j = 0; j < currency_json.length; j++) {
            let obj = currency_json[j];
            let newElement = document.createElement('option');
            newElement.appendChild(
                document.createTextNode(obj['currency_name'])
            );

            if (i == 0 && obj['currency_code'] === 'USD') {
                newElement.setAttribute('value', obj['currency_code']);
                newElement.setAttribute('selected', '');
            } else if (i == 1 && obj['currency_code'] === 'CAD') {
                newElement.setAttribute('value', obj['currency_code']);
                newElement.setAttribute('selected', '');
            } else {
                newElement.setAttribute('value', obj['currency_code']);
            }

            currency_list[i].appendChild(newElement);
        }
    }
}

/**
 * Fetches the list of supported currencies for conversion
 */
function fetch_supported_list() {
    var rawFile = new XMLHttpRequest();
    rawFile.open(
        'GET',
        'https://raw.githubusercontent.com/zbhavyai/currency-converter/main/supported_currencies.json',
        true
    );

    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === XMLHttpRequest.DONE) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                populate_currency_list(JSON.parse(rawFile.responseText));
            }
        }
    };

    rawFile.send();
}

fetch_supported_list();
