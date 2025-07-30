const API_URL = "http://localhost:3000/api/chat"; // Votre backend local

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    addMessage("user", userMessage);
    userInput.value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [{ role: "user", content: userMessage }]
            })
        });
        const data = await response.json();
        addMessage("bot", data.choices[0].message.content);
    } catch (error) {
        addMessage("bot", "❌ Erreur serveur");
        console.error("Détails:", error);
    }
}