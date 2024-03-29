const url = new URL(window.location.href)
const searchParams = new URLSearchParams(location.search)

const amount = url.searchParams.get('price')
const checkIn = (url.searchParams.get('dateArrive'))
const checkOut = (url.searchParams.get('dateLater'))
const totalDate = parseInt(url.searchParams.get('daylength'))
const roomType = url.searchParams.get('roomType')
const ref = url.searchParams.get('ref')
const amount10 = amount / 100

document.querySelector("#checkinDate1").value = checkIn;
document.querySelector("#checkoutDate1").value = checkOut;
document.querySelector("#totalDay").textContent = totalDate;
document.querySelector("#amount").textContent = amount10;
document.querySelector(".choosetype").textContent = roomType;

// getDetail()

// async function getDetail() {
//     await fetch("/details", {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({ ref })

//     })
//     res.json()
// }

// toString(checkIn)
// toString(checkOut)
// console.log(amount);

// ======================oldes========================
// const paymentSubmit = document.getElementById("payment-form")
// paymentSubmit.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     console.log("clicked")
//     await fetch('/create-checkout-session', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             items: [
//                 { id: 1, quantity: 3 },
//                 { id: 2, quantity: 1 },
//             ]
//         })
//     })

//         .then(res => {
//             if (res.ok) return res.json()
//             return res.json().then(json => Promise.reject(json))
//         })
//         .then(({ url }) => {
//             console.log(url)
//             window.location = url
//         }).catch(e => {
//             console.error(e.error)
//         })
// })


// ======================test========================
// This is your test publishable API key.
const stripe = Stripe("pk_test_51IxvCvAcUj5oPjUgoHNF5W3eWnn541otOmO1K10MrNFLD0GQw6tWO6ZzUIGG3mr6tppc8s2DDVX0x8oTvn6OzNZw00qb58QrQJ");

// The items the customer wants to buy
const items = [{ /*checkIn, checkOut, totalDate, roomType*/ ref }];

let elements;

initialize();
checkStatus();

document
    .querySelector("#payment-form")
    .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {

    const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, amount }),
    });
    const { clientSecret } = await response.json();

    const appearance = {
        theme: 'stripe',
    };

    elements = stripe.elements({ appearance, clientSecret }); // error

    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");
}

const paymentForm = document.querySelector("#payment-form")
async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // fetch

    let formObj = {};
    formObj["email"] = paymentForm.email.value;
    formObj['name'] = paymentForm.username.value;
    formObj["ref"] = ref;
    console.log("formObj:", formObj)
    // formObj["name"] = paymentForm.name.value;;

    const createPayment = await fetch("/create-pre-payment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
    })

    let result = await createPayment.json();

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `http://localhost:8030/paymemt-success.html?refid=${ref}`,
            receipt_email: document.getElementById("emailAddress").value

        },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
    } else {
        showMessage("An unexpected error occurred.");
    }

    setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
    );

    if (!clientSecret) {
        return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
        case "succeeded":
            showMessage("Payment succeeded!");
            break;
        case "processing":
            showMessage("Your payment is processing.");
            break;
        case "requires_payment_method":
            showMessage("Your payment was not successful, please try again.");
            break;
        default:
            showMessage("Something went wrong.");
            break;
    }
}

// ------- UI helpers -------

function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");

    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageText.textContent = "";
    }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
}

// Reemo
// let myPayment = document.getElementById("myPayment")
// myPayment.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const response = await fetch("/create-payment-intent-layout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ items: "77777777" }),
//     });

//     const { clientSecret } = await response.json();


// })





