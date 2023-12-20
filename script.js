document.getElementById('generateButton').addEventListener('click', generatePrompt);

async function generatePrompt() {
    let tema = document.getElementById('tema').value;
    let ideaCentral = document.getElementById('ideaCentral').value;

    let prompt = `Con la siguiente idea central genera el esquema del plan de escritura para facilitar el desarrollo del pensamiento científico en niños y niñas entre 9 y 10 años, en un nivel básico de concepto de ciencias naturales.: \nTema: ${tema} \nIdea central: ${ideaCentral}`;
    let response = await fetch("/get-response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt
        })
    });
    // ... Resto del código de generatePrompt
    saveGeneratedPrompt(prompt);

    if (response.ok) {
        let data = await response.json();
        
        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            let generatedText = data.choices[0].message.content.trim();
            document.getElementById('gptResult').innerText = generatedText;
        } else {
            alert('La respuesta no tiene la estructura esperada.');
        }
    } else {
        console.error('Error al obtener respuesta del servidor:', response.statusText);
        alert('Error al obtener respuesta del servidor.');
    }
    
}
async function saveGeneratedPrompt(promptValue) {
    let response = await fetch("/save-prompt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: promptValue
        })
    });

    if (response.ok) {
        console.log("Prompt saved successfully!");
        
    } else {
        console.error("Error saving prompt.");
    }
}


