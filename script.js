console.log("Thanks to Frankfurter for this API");

const output = document.querySelector("h2");
const startCurrencyTypeElement = document.getElementById("startCurrency");
const endCurrencyTypeElement = document.getElementById("endCurrency");
const startCurrencyInputBox = document.querySelector("input");

async function getData(currency) {
    try {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}`);

        if (!response.ok) {
            throw new Error("Could not fetch data");
        }

        return response.json();
    }

    catch(error) {
        console.error(error);
    }
}

async function convert() {
    const startCurrency = Number(startCurrencyInputBox.value).toFixed(2);
    const startCurrencyType = startCurrencyTypeElement[startCurrencyTypeElement.selectedIndex].value;
    const endCurrencyType = endCurrencyTypeElement[endCurrencyTypeElement.selectedIndex].value;

    if (0 / startCurrency === 0 && startCurrency < 1000000 && startCurrency > 0 && startCurrency > 0 && startCurrencyType !== endCurrencyType) {
        const data = await getData(startCurrencyType);
        const convRate = data.rates[endCurrencyType];

        const endCurrency = (startCurrency * convRate).toFixed(2);

        output.textContent =  `${startCurrency} ${startCurrencyType} = ${endCurrency} ${endCurrencyType}`;
    }

    else {
        output.textContent = "";
        window.alert("Please enter a positive number less than 1 million and have two different currencies");
    }
}