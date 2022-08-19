importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {
    if (event.tag === 'post-data') {
        // call method
        event.waitUntil(getDataAndSend());
    }
});

function getDataAndSend() {
    //indexDb
    let obj = {
        name: 'anurag',
    };
    fetch('https://food-delivery-app-c7b21-default-rtdb.firebaseio.com/order.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
        .then(() => Promise.resolve())
        .catch(() => Promise.reject());
}

