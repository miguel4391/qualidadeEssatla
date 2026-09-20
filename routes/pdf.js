var pdf = function getPdf(curso,fuc, lstDoc, callback){
    const PDFDocument = require('pdfkit');
    const fs = require('fs');

    function createSlug(input){
            if(input != null && input.length > 0){
            return input
                .replace(/[\x00-\x1F\x7F-\x9F]/g, "")  // remove caracteres de controlo invisíveis
                .replace(/\s+/g, " ")                  // colapsa espaços múltiplos
                .replace(/\t/g, "")
                .replace("à", "à")
                .replace("é", "é")
                .replace("á", "á")
                .replace("ç", "ç")
                .replace("ã", "ã")
                .replace("ção", "ção")
                .replace("ó", "ó")
                .replace("í", "í")
                .replace("ú", "ú")
                .replace("á́", "á")
                .replace("\“", "\"")
                .replace("\”", "\"")
                .replace("á́", "á")
                .replace("â", "â")
                .replace("ê", "ê")
                .replace("‑", "-")
                .replace("á", "á")
                .replace("à", "à")
                .replace("â", "â")
                .replace("−", "-")
                .replace("&", "e")
                .replace("‑", "-")
                .replace("\"", "\"")
                //.replace(/[^\p{L}\d]+/u, ' ')
                .trim();
        }else{
            return "";
        }
    }

    function docs(fuc){
        if(fuc.doc10nome != null && fuc.doc10nome != ""){

            let grau2 = fuc[0].doc2Grau;

            const docente2 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc2Nome);

            if (docente2 && docente2.especialDoc === 1) {
                grau2 = (docente2.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            let grau3 = fuc[0].doc3Grau;

            const docente3 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc3Nome);

            if (docente3 && docente3.especialDoc === 1) {
                grau3 = (docente3.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau4 = fuc[0].doc4Grau;

            const docente4 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc4Nome);

            if (docente4 && docente4.especialDoc === 1) {
                grau4 = (docente4.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau5 = fuc[0].doc5Grau;

            const docente5 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc5Nome);

            if (docente5 && docente5.especialDoc === 1) {
                grau5 = (docente5.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau6 = fuc[0].doc6Grau;

            const docente6 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc6Nome);

            if (docente6 && docente6.especialDoc === 1) {
                grau6 = (docente6.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau7 = fuc[0].doc7Grau;

            const docente7 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc7Nome);

            if (docente7 && docente7.especialDoc === 1) {
                grau7 = (docente7.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau8 = fuc[0].doc8Grau;

            const docente8 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc8Nome);

            if (docente8 && docente8.especialDoc === 1) {
                grau8 = (docente8.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau9 = fuc[0].doc9Grau;

            const docente9 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc9Nome);

            if (docente9 && docente9.especialDoc === 1) {
                grau9 = (docente9.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau10 = fuc[0].doc10Grau;

            const docente10 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc10Nome);

            if (docente10 && docente10.especialDoc === 1) {
                grau10 = (docente10.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau2), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau3), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau4), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)],   
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc5Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau5), "Categoria profissional: " + createSlug(fuc[j].doc5Cat), "Carga letiva: " + createSlug(fuc[j].doc5Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc6Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau6), "Categoria profissional: " + createSlug(fuc[j].doc6Cat), "Carga letiva: " + createSlug(fuc[j].doc6Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc7Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau7), "Categoria profissional: " + createSlug(fuc[j].doc7Cat), "Carga letiva: " + createSlug(fuc[j].doc7Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc8Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau8), "Categoria profissional: " + createSlug(fuc[j].doc8Cat), "Carga letiva: " + createSlug(fuc[j].doc8Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc9Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau9), "Categoria profissional: " + createSlug(fuc[j].doc9Cat), "Carga letiva: " + createSlug(fuc[j].doc9Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc10Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau10), "Categoria profissional: " + createSlug(fuc[j].doc10Cat), "Carga letiva: " + createSlug(fuc[j].doc10Carga)]
                ]
            }
        } else if(fuc.doc9nome != null && fuc.doc9nome != ""){

            let grau2 = fuc[0].doc2Grau;

            const docente2 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc2Nome);

            if (docente2 && docente2.especialDoc === 1) {
                grau2 = (docente2.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            let grau3 = fuc[0].doc3Grau;

            const docente3 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc3Nome);

            if (docente3 && docente3.especialDoc === 1) {
                grau3 = (docente3.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau4 = fuc[0].doc4Grau;

            const docente4 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc4Nome);

            if (docente4 && docente4.especialDoc === 1) {
                grau4 = (docente4.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau5 = fuc[0].doc5Grau;

            const docente5 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc5Nome);

            if (docente5 && docente5.especialDoc === 1) {
                grau5 = (docente5.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            console.log ('Grau5', grau5);
            let grau6 = fuc[0].doc6Grau;

            const docente6 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc6Nome);

            if (docente6 && docente6.especialDoc === 1) {
                grau6 = (docente6.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau7 = fuc[0].doc7Grau;

            const docente7 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc7Nome);

            if (docente7 && docente7.especialDoc === 1) {
                grau7 = (docente7.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau8 = fuc[0].doc8Grau;

            const docente8 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc8Nome);

            if (docente8 && docente8.especialDoc === 1) {
                grau8 = (docente8.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau9 = fuc[0].doc9Grau;

            const docente9 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc9Nome);

            if (docente9 && docente9.especialDoc === 1) {
                grau9 = (docente9.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau2), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau3), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau4), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)],   
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc5Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau5), "Categoria profissional: " + createSlug(fuc[j].doc5Cat), "Carga letiva: " + createSlug(fuc[j].doc5Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc6Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau6), "Categoria profissional: " + createSlug(fuc[j].doc6Cat), "Carga letiva: " + createSlug(fuc[j].doc6Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc7Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau7), "Categoria profissional: " + createSlug(fuc[j].doc7Cat), "Carga letiva: " + createSlug(fuc[j].doc7Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc8Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau8), "Categoria profissional: " + createSlug(fuc[j].doc8Cat), "Carga letiva: " + createSlug(fuc[j].doc8Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc9Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau9), "Categoria profissional: " + createSlug(fuc[j].doc9Cat), "Carga letiva: " + createSlug(fuc[j].doc9Carga)]
                ]
            }
        }else if(fuc.doc8nome != null && fuc.doc8nome != ""){
            let grau2 = fuc[0].doc2Grau;

            const docente2 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc2Nome);

            if (docente2 && docente2.especialDoc === 1) {
                grau2 = (docente2.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            let grau3 = fuc[0].doc3Grau;

            const docente3 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc3Nome);

            if (docente3 && docente3.especialDoc === 1) {
                grau3 = (docente3.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau4 = fuc[0].doc4Grau;

            const docente4 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc4Nome);

            if (docente4 && docente4.especialDoc === 1) {
                grau4 = (docente4.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau5 = fuc[0].doc5Grau;

            const docente5 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc5Nome);

            if (docente5 && docente5.especialDoc === 1) {
                grau5 = (docente5.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            console.log ('Grau5', grau5);
            let grau6 = fuc[0].doc6Grau;

            const docente6 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc6Nome);

            if (docente6 && docente6.especialDoc === 1) {
                grau6 = (docente6.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau7 = fuc[0].doc7Grau;

            const docente7 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc7Nome);

            if (docente7 && docente7.especialDoc === 1) {
                grau7 = (docente7.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            let grau8 = fuc[0].doc8Grau;

            const docente8 = lstDoc.find(doc => doc.nomeDoc === fuc[0].doc8Nome);

            if (docente8 && docente8.especialDoc === 1) {
                grau8 = (docente8.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau2), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau3), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau4), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)],   
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc5Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau5), "Categoria profissional: " + createSlug(fuc[j].doc5Cat), "Carga letiva: " + createSlug(fuc[j].doc5Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc6Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau6), "Categoria profissional: " + createSlug(fuc[j].doc6Cat), "Carga letiva: " + createSlug(fuc[j].doc6Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc7Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau7), "Categoria profissional: " + createSlug(fuc[j].doc7Cat), "Carga letiva: " + createSlug(fuc[j].doc7Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc8Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(grau8), "Categoria profissional: " + createSlug(fuc[j].doc8Cat), "Carga letiva: " + createSlug(fuc[j].doc8Carga)]
                ]
            }
        }else if(fuc.doc7nome != null && fuc.doc7nome != ""){
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc2Grau), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc3Grau), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc4Grau), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)],   
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc5Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc5Grau), "Categoria profissional: " + createSlug(fuc[j].doc5Cat), "Carga letiva: " + createSlug(fuc[j].doc5Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc6Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc6Grau), "Categoria profissional: " + createSlug(fuc[j].doc6Cat), "Carga letiva: " + createSlug(fuc[j].doc6Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc7Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc7Grau), "Categoria profissional: " + createSlug(fuc[j].doc7Cat), "Carga letiva: " + createSlug(fuc[j].doc7Carga)]
                ]
            }
        } else if(fuc.doc6nome != null && fuc.doc6nome != ""){
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc2Grau), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc3Grau), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc4Grau), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)],   
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc5Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc5Grau), "Categoria profissional: " + createSlug(fuc[j].doc5Cat), "Carga letiva: " + createSlug(fuc[j].doc5Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc6Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc6Grau), "Categoria profissional: " + createSlug(fuc[j].doc6Cat), "Carga letiva: " + createSlug(fuc[j].doc6Carga)]
                ]
            }
        } else if(fuc.doc5nome != null && fuc.doc5nome != ""){
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc2Grau), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc3Grau), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc4Grau), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)],   
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc5Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc5Grau), "Categoria profissional: " + createSlug(fuc[j].doc5Cat), "Carga letiva: " + createSlug(fuc[j].doc5Carga)]
                ]
            }
        } else if(fuc.doc4nome != null && fuc.doc4nome != ""){
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc2Grau), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc3Grau), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc4Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc4Grau), "Categoria profissional: " + createSlug(fuc[j].doc4Cat), "Carga letiva: " + createSlug(fuc[j].doc4Carga)]
                ]
            }
        } else if(fuc.doc3nome != null && fuc.doc4nome != ""){
            return {

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", colSpan:"3" };
                },
                
                data:[
                    ['Outros docentes e respetivas cargas letivas na unidade curricular'],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc2Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc2Grau), "Categoria profissional: " + createSlug(fuc[j].doc2Cat), "Carga letiva: " + createSlug(fuc[j].doc2Carga)],
                    [{ text: "Nome completo: " + createSlug(fuc[j].doc3Nome), colSpan: 3 }],
                    ["Grau: " + createSlug(fuc[j].doc3Grau), "Categoria profissional: " + createSlug(fuc[j].doc3Cat), "Carga letiva: " + createSlug(fuc[j].doc3Carga)]
                ]
            }
        }
        
    }
    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream('output.pdf'));

    function footer(counter) {
        doc.text(String(counter), doc.page.width / 2, doc.page.height - 50, {
            lineBreak: false,
            align: 'center'
        });
        doc.text(createSlug(String(fuc[0].nomeCE)), doc.page.width / 6, doc.page.height - 770,{
            lineBreak: false,
            align: 'left'
        })
    }

    let pageCounter = 2;
    doc.on('pageAdded', () => {
        footer(pageCounter - 1);
        pageCounter += 1;
        doc.text(' ', 72, 72-12); // empty line for resetting x & y
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = String(today.getHours()).padStart(2, 0)
    var mm = String(today.getMinutes()).padStart(2, 0)
    var ss = String(today.getSeconds()).padStart(2, 0)

    today = dd + '/' + MM + '/' + yyyy + " - " + hh + ":" + mm + ":" + ss;

    // Embed a font, set the font size, and render some text
    doc
    .font('Helvetica')
    .fontSize(10)
    .text('Fichas de Unidade Curricular do Ciclo de Estudos \n' + createSlug(fuc[0].nomeCE) + 
            '\n \n \n \nCoordenador do Ciclo de Estudos \n'+ createSlug(fuc[0].coordCe) +"\n \n \n \n__________________________________ \n \n \n \n"+ today, 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('./public/img/logo.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
    });
    

    for (var j =0; j<fuc.length; j++)
    {

        let grau = fuc[0].doc1Grau;
        console.log("Before:", grau);
        const docente = lstDoc.find(doc => doc.nomeDoc === fuc[j].doc1Nome);

        if (docente && docente.especialDoc === 1) {

            console.log("Inside IF");
            console.log("Comparison:", docente.grauDoc == 5);
            grau = (docente.grauDoc == 5)
                ? "Doutoramento - Especialista"
                : "Especialista";

            console.log("After assignment:", grau);
        }
        console.log("Final:", grau);

        let data = [
            ['OUTROS DOCENTES E RESPETIVAS CARGAS LETIVAS NA UNIDADE CURRICULAR']
        ];

        // Docentes 2 e 3 aparecem sempre
        for (let i = 2; i <= 3; i++) {
            let grau2 = fuc[j].doc2Grau;

            const docente2 = lstDoc.find(doc => doc.nomeDoc === fuc[j].doc2Nome);

            if (docente2 && docente2.especialDoc === 1) {
                grau2 = (docente2.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            data.push(
                [{ text: "Nome completo: " + createSlug(fuc[j]["doc" + i + "Nome"] || ""), colSpan: 3 }],
                [
                    "Grau: " + createSlug(grau2),
                    "Categoria profissional: " + createSlug(fuc[j]["doc" + i + "Cat"]),
                    "Carga letiva: " + createSlug(fuc[j]["doc" + i + "Carga"])
                ]
            );
        }

        // Docentes 4 a 10 apenas se tiverem nome
        for (let i = 4; i <= 10; i++) {
            
            const nome = (fuc[j]["doc" + i + "Nome"] || "").trim();

            let grau3 = fuc[j]["doc" + i + "Grau"];

            const docente3 = lstDoc.find(doc => doc.nomeDoc === nome);

            if (docente3 && docente3.especialDoc === 1) {
                grau3 = (docente3.grauDoc == 5)
                    ? "Doutoramento - Especialista"
                    : "Especialista";
            }

            if (nome !== "" && nome !== "------------------------------") {

                data.push(
                    [{ text: "Nome completo: " + createSlug(nome), colSpan: 3 }],
                    [
                        "Grau: " + createSlug(grau3),
                        "Categoria profissional: " + createSlug(fuc[j]["doc" + i + "Cat"]),
                        "Carga letiva: " + createSlug(fuc[j]["doc" + i + "Carga"])
                    ]
                );

            }
        }


        doc
        .addPage()
        .fontSize(10)
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold" };
            },
            data:[
                ['Designação da Unidade Curricular'.toUpperCase()],
                ['PT: ' + createSlug(fuc[j].nomeUCPt) + '\nEN: ' + createSlug(fuc[j].noemUCEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Designação do Ciclo de Estudos'.toUpperCase()],
                [createSlug(fuc[j].nomeCE)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold" };
            },
            data:[
                ['Código UC'.toUpperCase(), 'Sigla da área científica'.toUpperCase(), 'Ano'.toUpperCase(), 'Semestre'.toUpperCase(), 'Regime'.toUpperCase()],
                ["Não preencher",fuc[j].areaCienc,fuc[j].ano,fuc[j].semestre,fuc[j].regime]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold" };
            },
            data:[
                ['Duração'.toUpperCase(), 'Nº horas de trabalho'.toUpperCase(), 'Nº de horas de contato'.toUpperCase(), 'ECTS'.toUpperCase()],
                [fuc[j].duracao,fuc[j].horasTrab,fuc[j].horasContac,fuc[j].ECTS]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Horas de contacto: tipologia'.toUpperCase(), 'Nº horas de contacto'.toUpperCase(), 'Nº horas assíncrono à distância'.toUpperCase(), 'Nº horas sincronas à distância'.toUpperCase()],
                ["Teórico (T)",fuc[j].T_horasC,fuc[j].T_horasAAsss,fuc[j].T_horasSinc],
                ["Teórico-Práticas (TP)",fuc[j].TP_horasC,fuc[j].TP_horasAAsss,fuc[j].TP_horasSinc],
                ["Prático e laboratorial (PL)",fuc[j].PL_horasC,fuc[j].PL_horasAAsss,fuc[j].PL_horasSinc],
                ["Trabalho de campo (TC)",fuc[j].TC_horasC,fuc[j].TC_horasAAsss,fuc[j].TC_horasSinc],
                ["Seminário (S)",fuc[j].S_horasC,fuc[j].S_horasAAsss,fuc[j].S_horasSinc],
                ["Estágio (E)",fuc[j].E_horasC,fuc[j].E_horasAAsss,fuc[j].E_horasSinc],
                ["Orientação toturial (OT)",fuc[j].OT_horasC,fuc[j].OT_horasAAsss,fuc[j].OT_horasSinc],
                ["Outra (O)",fuc[j].O_horasC,fuc[j].O_orasAAsss,fuc[j].O_horasSinc],
                ["Total de nº de horas",fuc[j].total_horasC,fuc[j].total_horasAAsss,fuc[j].total_horasSinc]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff", colSpan :"2" ,font: "Helvetica-Bold"};
            },
            data:[
                ['Horas de contato (%)'.toUpperCase()],
                ["Presenciais: " + fuc[j].percPresent,"À distância: " +fuc[j].perDist]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff", colSpan:"3",font: "Helvetica-Bold"};
            },
            data:[
                ['Docente responsável e respetiva carga letiva na unidade curricular'.toUpperCase()],
                [{ text: "Nome completo: " + createSlug(fuc[j].doc1Nome === '------------------------------' ? '' : fuc[j].doc1Nome), colSpan: 3 }],
                ["Grau: " + createSlug(grau), "Categoria profissional: " + createSlug(fuc[j].doc1Cat), "Carga letiva: " + createSlug(fuc[j].doc1Carga)]
            ]
        })
        .moveDown()
        .table({

                rowStyles: (i) => {
                    if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff", colSpan:"3",font: "Helvetica-Bold" };
                },

                
                
                data: data
            })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Objetivos de aprendizagem e a sua compatibilidade com o método (conhecimentos, aptidões e competências a desenvolver pelos estudantes)'.toUpperCase()],
                [createSlug(fuc[j].conteudos)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Learning outcomes and its compatibility with teaching methods (Knowledge, skills and competences to be developed by students)'.toUpperCase()],
                [createSlug(fuc[j].conteudosEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Conteúdos programáticos'.toUpperCase()],
                [createSlug(fuc[j].obetivos)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Syllabus'.toUpperCase()],
                [createSlug(fuc[j].obetivosEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Demonstração da coerência dos conteúdos programáticos com os objetivos de aprendizagem da unidade curricular'.toUpperCase()],
                [createSlug(fuc[j].demoConte)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Demonstration of the syllabus coherence with the curricular unit’s intended learning outcomes'.toUpperCase()],
                [createSlug(fuc[j].demoConteEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Metodologias de ensino e de aprendizagem específicas da unidade curricular articuladas com o modelo pedagógico'.toUpperCase()],
                [createSlug(fuc[j].metodos)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Specific teaching and learning methodologies of the curricular unit in articulation with the pedagogic model'.toUpperCase()],
                [createSlug(fuc[j].metodosEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Avaliação'.toUpperCase()],
                [createSlug(fuc[j].avaliacao)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Evaluation'.toUpperCase()],
                [createSlug(fuc[j].avaliacaoEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Demonstração da coerência das metodologias de ensino e avaliação com os objetivos de aprendizagem da unidade curricular'.toUpperCase()],
                [createSlug(fuc[j].demoMetodo)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Demonstration of the teaching and evaluation methodologies in articulation with the curricular unit’s intended learning outcomes'.toUpperCase()],
                [createSlug(fuc[j].demoMetodoEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Bibliografia de consulta/ existência obrigatória (norma APA, 7.ª Edição)'.toUpperCase()],
                [createSlug(fuc[j].biblio)],[createSlug(fuc[j].biblio2)],[createSlug(fuc[j].biblio3)],[createSlug(fuc[j].biblio4)],[createSlug(fuc[j].biblio5)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Observações'.toUpperCase()],
                [createSlug(fuc[j].obs)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i===0) return { backgroundColor: "#f8bb00", textColor:"#fff",font: "Helvetica-Bold"};
            },
            data:[
                ['Observations'.toUpperCase()],
                [createSlug(fuc[j].obsEn)]
            ]
        })
        .moveDown()
        .table({

            rowStyles: (i) => {
                if (i === 0 || i=== 1) return { colSpan:"3"};
            },
            data:[
                ['Docente da UC Responsável pela Revisão desta FUC: ' + fuc[j].docRespFuc],
                ['Coordenador do CE Responsável pela Validação: ' + fuc[j].coordCe],
                ['Ano Letivo ' + fuc[j].anoLetivoFuc, 'Data da Revisão desta FUC: ' + fuc[j].dtaRevFuc, 'Data da Validação desta FUC: ' + fuc[j].dtaConfFuc]
            ]
        })
        
    }
    // Finalize PDF file
    doc.end();

    callback(null, doc)
}

module.exports = pdf