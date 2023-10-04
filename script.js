document.getElementById('generateButton').addEventListener('click', generatePrompt);

async function generatePrompt() {
    let intencion = document.getElementById('intencion').value;
    let objetivo = document.getElementById('objetivo').value;
    let ideaCentral = document.getElementById('ideaCentral').value;
    let tema = document.getElementById('tema').value;
    let contexto = document.getElementById('contexto').value;
    let audiencia = document.getElementById('audiencia').value;

    let prompt = `Generar un plan de escritura/oralidad con la siguiente información para facilitar el desarrollo del pensamiento científico en niños y niñas ente 5 y 10 años: \nTema: ${tema} \nContexto: ${contexto} \nIntención Comunicativa: ${intencion} \nObjetivo o meta: ${objetivo} \nIdea central: ${ideaCentral} \nAuditorio / audiencia: ${audiencia}`;
    console.log(prompt);
    let response = await fetch("/get-response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt
        })
    });

    if (response.ok) {
        let data = await response.json();
        console.log(data);
        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
            let generatedText = data.choices[0].message.content.trim();
            document.getElementById('gptResult').innerText = generatedText;
        } else {
            alert('La respuesta no tiene la estructura esperada.');
        }
    } else {
        alert('Error al obtener respuesta del servidor.');
    }
    
}

