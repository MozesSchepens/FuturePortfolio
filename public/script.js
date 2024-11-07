document.getElementById("send-btn").addEventListener("click", async function () {
    const userMessage = document.getElementById("chat-input").value;

    try {
        const response = await fetch('http://localhost:3000/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Controleer of de response een tabel bevat of gewone tekst
        if (data.reply.includes("<table>")) {
            document.getElementById("chat-log").innerHTML += `<div>${data.reply}</div>`;
        } else {
            document.getElementById("chat-log").innerHTML += `<p>${data.reply}</p>`;
        }

        // Clear input field after sending the message
        document.getElementById("chat-input").value = '';
    } catch (error) {
        console.error('Er is een probleem opgetreden:', error);
        document.getElementById("chat-log").innerHTML += `<p>Er is een fout opgetreden: ${error.message}</p>`;
    }
});
