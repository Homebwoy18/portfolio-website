document.addEventListener('DOMContentLoaded', () => {
    const gbInput = document.getElementById('input');
    const packageList = document.getElementById('package-list');
    const priceList = document.getElementById('price-list');
    const totalPriceElem = document.getElementById('total-price');
    const button = document.getElementById('btn');
    const greeting = document.getElementById('greeting');
    const copyMessage = document.getElementById('copy-message');
    const inputOutputDiv = document.getElementById('input-output');
    const dateElem = document.getElementById('date');

    gbInput.addEventListener('input', handleCalculate);
    button.addEventListener('click', handleCopy);

    displayGreeting();
    displayDate();
    setTimeout(() => {
        inputOutputDiv.classList.add('visible');
        setTimeout(() => {
            document.body.style.overflow = 'auto'; // Restore scrollbar after animation
        }, 1000);
    }, 100);

    function handleCalculate() {
        const inputValue = gbInput.value;
        const gbValues = inputValue.split('+');
        const totalPrice = calculateTotal(gbValues);

        packageList.innerHTML = gbValues.map(gb => `<li class="list-group-item">${gb.trim()}GB</li>`).join('');
        priceList.innerHTML = gbValues.map(gb => `<li class="list-group-item">${prices[gb.trim().replace('GB', '')] || 0} cedis</li>`).join('');
        totalPriceElem.innerHTML = `Total Price: ${totalPrice} cedis`;
    }

    function calculateTotal(gbArray) {
        let totalPrice = 0;
        gbArray.forEach(gb => {
            const packagePrice = prices[gb.trim().replace('GB', '')];
            if (packagePrice) {
                totalPrice += packagePrice;
            } else {
                console.error(`Package not found: ${gb.trim()}GB`);
            }
        });
        return totalPrice;
    }

    function handleCopy() {
        const packageItems = Array.from(packageList.children).map(item => item.innerText.trim());
        const priceItems = Array.from(priceList.children).map(item => item.innerText.trim());
        const totalPriceText = totalPriceElem.innerText;
        const currentDate = dateElem.innerText;

        let outputText = `${currentDate}\n\nPackages\t\tPrices\n`;
        packageItems.forEach((pkg, index) => {
            outputText += `${pkg}\t\t${priceItems[index]}\n`;
        });
        outputText += `\n${totalPriceText}\n\nMake payment to: Fawuzan Masahudu [0543650011]`;

        navigator.clipboard.writeText(outputText).then(() => {
            copyMessage.style.display = 'block';
            setTimeout(() => copyMessage.style.display = 'none', 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    function displayGreeting() {
        const currentHour = new Date().getHours();
        let greetingText = '';

        if (currentHour < 12) {
            greetingText = 'Good Morning!';
        } else if (currentHour < 18) {
            greetingText = 'Good Afternoon!';
        } else {
            greetingText = 'Good Evening!';
        }

        greeting.innerText = greetingText;
    }

    function displayDate() {
        const today = new Date();
        const dateString = today.toDateString();
        dateElem.innerText = `Date: ${dateString}`;
    }

    const prices = {
        '1': 7,
        '2': 12.50,
        '3': 17.50,
        '4': 23.50,
        '5': 28.50,
        '6': 33.50,
        '7': 36.50,
        '8': 41.50,
        '9': 45.50,
        '10': 48.50,
        '11': 53.50,
        '12': 57.50,
        '15': 68.50,
        '20': 92,
        '25': 116,
        '30': 145,
        '35': 155,
        '40': 180,
        '45': 200,
        '50': 220,
        '80': 365,
        '100': 450,
    };
});
