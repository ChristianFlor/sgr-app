document.getElementById('generateButton').addEventListener('click', generatePrompt);

async function generatePrompt() {
    let intencion = document.getElementById('intencion').value;
    let objetivo = document.getElementById('objetivo').value;
    let ideaCentral = document.getElementById('ideaCentral').value;
    let tema = document.getElementById('tema').value;
    let contexto = document.getElementById('contexto').value;
    let audiencia = document.getElementById('audiencia').value;

    let prompt = `Generar un plan de escritura/oralidad con la siguiente información: \nTema: ${tema} \nContexto: ${contexto} \nIntención Comunicativa: ${intencion} \nObjetivo o meta: ${objetivo} \nIdea central: ${ideaCentral} \nAuditorio / audiencia: ${audiencia}`;
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
        if (data && data.choices && data.choices.length > 0) {
            let generatedText = data.choices[0].text.trim();
            alert(generatedText);
        } else {
            alert('La respuesta no tiene la estructura esperada.');
        }
    } else {
        alert('Error al obtener respuesta del servidor.');
    }
    
}

