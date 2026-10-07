var express 	= require("express");
var fs 		= require("fs");
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;
var router 	= express.Router();


router.get("/", (req, res) => {
	res.render("login");
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post('/login', passport.authenticate('ldapauth', {
	successRedirect:"/menu",
	failureRedirect:"/login"
	}), function(req, res) {
});

router.get("/menu", isLoggedIn, (req, res) =>{
	res.render("menu");
});

router.get("/back", isLoggedIn, function(req, res){
    res.render("menu");
})

router.get("/quality", isLoggedIn, (req, res) =>{ 
    res.render("quality");
})

router.get("/procedimentos", isLoggedIn, (req, res) =>{
	var procedimentos = require("../models/ficheiro.js")('Procedimentos', function(errP, procedimentos){
		if(errP){
			console.log(errP)
		}else{
			res.render("procedimentos", {procedimentos:procedimentos})
		}
	})
})

router.get("/guias", isLoggedIn, (req, res) =>{
	var guias = require("../models/ficheiro.js")('Guias', function(errP, guias){
		if(errP){
			console.log(errP)
		}else{
			res.render("guias", {guias:guias})
		}
	})
})

router.get("/modelos", isLoggedIn, (req, res) =>{
	var modelos = require("../models/ficheiro.js")('Modelos', function(errP, modelos){
		if(errP){
			console.log(errP)
		}else{
			res.render("modelos", {modelos:modelos})
		}
	})
})

router.get("/regulamentos", isLoggedIn, (req, res) =>{
	var regulamentos = require("../models/ficheiro.js")('Regulamentos', function(errP, regulamentos){
		if(errP){
			console.log(errP)
		}else{
			res.render("regulamentos", {regulamentos:regulamentos})
		}
	})
})

router.get("/politicas", isLoggedIn, function(req, res){
	var politicas = require("../models/ficheiro.js")('Politica', function(errP, politica){
		if(errP){
			console.log(errP)
		}else{
			res.render("politicas", {politica:politica})
		}
	})
});

router.get("/manuais", isLoggedIn, (req, res) =>{
	var manuais = require("../models/ficheiro.js")('Manuais', function(errP, manuais){
		if(errP){
			console.log(errP)
		}else{
			res.render("manuais", {manuais:manuais})
		}
	})
})

router.get("/ocorrencias", isLoggedIn, (req, res) =>{
	var manuais = require("../models/ficheiro.js")('Ocorrencias', function(errP, ocorrencias){
		if(errP){
			console.log(errP)
		}else{
			res.render("ocorrencias", {ocorrencias:ocorrencias});
		}
	})
})

router.get("/despachos", isLoggedIn, (req, res) =>{
	var despachos = require("../models/ficheiro.js")('Despachos', function(errP, despachos){
		if(errP){
			console.log(errP)
		}else{
			res.render("despachos", {despachos:despachos})
		}
	})

})

router.get("/anoFuc", isLoggedIn, (req, res) =>{
	res.render("anoFuc");
})

router.get("/fuc", isLoggedIn, (req, res) =>{
	var fucs = require("../models/getCursos.js")('E', function(errP, cursos){
		if(errP){
			console.log(errP)
		}else{
			console.log(fucs)
			res.render("fuc", {cursos:cursos})
		}
	})
})

router.get("/fuc/:anoLetivo", isLoggedIn, (req, res) =>{
	console.log(req.params.anoLetivo)
	var fucs = require("../models/getCursos.js")('E', req.params.anoLetivo, function(errP, cursos){
		if(errP){
			console.log(errP)
		}else{
			console.log(fucs)
			res.render("fuc", {cursos:cursos, anoLetivo:req.params.anoLetivo})
		}
	})
})

router.get("/info", isLoggedIn,  (req, res) =>{
	var info = require("../models/ficheiro.js")('Info', function(errP, info){
		if(errP){
			console.log(errP)
		}else{
			res.render("info", {info:info})
		}
	})
})

router.get("/pestudos", isLoggedIn, (req, res) =>{
	var pestudos = require("../models/ficheiro.js")('Pestudos', function(errP, pestudos){
		if(errP){
			console.log(errP)
		}else{
			res.render("pestudos", {pestudos:pestudos})
		}
	})
})

router.get("/institucional", isLoggedIn, (req, res) =>{
	var institucional = require("../models/ficheiro.js")('Institucional', function(errP, institucional){
		if(errP){
			console.log(errP)
		}else{
			res.render("institucional", {institucional:institucional})
		}
	})
})

router.get("/pestudos/:curso", isLoggedIn, (req, res) =>{
	let curso = req.params.curso;
	console.log(curso)
	var pestudo = require("../models/ficheiro.js")(curso, function(errp, pestudo){
		if(errp){
			console.log(errP)
		}else{
			var ce = require('../models/cursos.js')(curso, function(errc, ce){
				if(errc){
					console.log(errc);
				}else{
					res.render("curso", {pestudo:pestudo , ce:ce})
				}
			})
		}
	})
});

router.get("/curso/:id/:ano", isLoggedIn, (req, res) =>{
	let curso = req.params.id;
	let semestre = require("../models/cursos.js")(curso, function (err, sem){
		if(err)
			console.log(err);
		var fuc = require("../models/fucs.js")(curso, req.params.ano, function(errp, fuc){
			if(errp){
				console.log(errp);
			}else{
				if(fuc.length > 0){
					const filtered = fuc.filter(file => file.ano === "1º" && file.semestre === "1º");
					const agrupado = {};
					filtered.forEach(file => {
						const ramo = file.ramo || "Sem Ramo";
						if (!agrupado[ramo]) agrupado[ramo] = [];
						agrupado[ramo].push(file);
					});				
					res.render("dossier", {fuc:fuc, curso:curso, sem:sem[0].nrSemestres})
				}else{
					res.render("semFuc");
				}
				
			}
		})
	})
})

router.get("/fuc/:curso/:uc/:anoLetivo", isLoggedIn, (req, res) =>{
	let uc = req.params.uc;
	let curso = req.params.curso;
	let ano = req.params.anoLetivo.replace('_', '/');
	var fuc = require("../models/fuc.js")(curso, uc, ano, (errp, fuc) => {
		if(errp){
			console.log(errp);
		}else{
			let doc = require("../models/getListaDocs.js")((err, lstDoc) =>{
				if(err){
					console.log(err);
				}else{
					res.render("fucUC", {fuc:fuc, curso:curso, lstDoc:lstDoc});
				}
			})
		}
	})
})

router.get("/pdf/:curso/:uc/:anoLetivo", isLoggedIn, (req, res) =>{
	let curso = req.params.curso;
	let uc = req.params.uc;
	let ano = req.params.anoLetivo.replace('_', '/');
	var fuc = require("../models/fuc.js")(curso, uc, ano, function(errp, fuc){
		if(errp){
			console.log(errp)
		}else{
			let doc = require("../models/getListaDocs.js")((err, lstDoc) =>{
				if(err){
					console.log(err);
				}else{
					res.render("fucPDF", {fuc:fuc, curso:curso, lstDoc:lstDoc});
				}
			})
		}
	})
})



router.get("/multPdf/:curso/:anoLetivo", isLoggedIn, (req, res) => {
	let curso = req.params.curso;
	let ano = req.params.anoLetivo.replace('_', '/');
	let fuc =  require("../models/fucs.js")(curso, ano, function(errp, fuc){
		if(errp)
			console.log(errp);
		else{
			let doc = require("../models/getListaDocs.js")((err, lstDoc) =>{
				if(err)
					console.log(err);
				else{
					let pdf = require("./pdf.js")(curso, fuc, lstDoc, (err, pdf) => {
						if(err){
							console.log(err)
						}else{
							setTimeout(function (){	
								let nomePdf = `${curso}_${ano.replace('/', '-')}.pdf`;
								res.download("output.pdf", nomePdf);
							}, 3000);
						}
					})
				}
			})

			
		}
		
	})
})

router.get("/output.pdf", isLoggedIn, (req, res) => {
	res.sendFile("output.pdf", {root:'.'})
})

router.get("/Documents/:filename",isLoggedIn, (req, res) => {
	console.log('Documents/' + req.params.filename);
	res.sendFile('Documents/' + req.params.filename, {root: '.'});
});
router.get("/pestudos/Documents/:filename",isLoggedIn, (req, res) => {
	console.log('Documents/' + req.params.filename);
	res.sendFile('Documents/' + req.params.filename, {root: '.'});
});

function renderFichaDoc(req, res) {
	const user = req.session.passport.user.sAMAccountName;
	let tipoDocente = require("../models/getTipoDocente.js")(function(errp, tipoDocente){
		if(errp){
			console.log(errp);
		}else{
			let catDocente = require("../models/getCatDocente.js")((err, catDocente) =>{
				if(err){
					console.log(err);
				}else{
					let grauDocente = require("../models/getGrauDocente.js")((err, grauDocente) =>{
						if(err){
							console.log(err);
						}else{
							let areaDoc = require("../models/getAreaDocente.js")((err, areaDoc) =>{
								if(err){
									console.log(err);
								}else{
									let ficha = require("../models/getFichaDoc.js")(user, (err, ficha) => {
										if(err){
											console.log(err);
										}else{
											let forma = require("../models/getFormaDoc.js")(ficha[0].idfichaDoc, (err, forma) =>{
												if(err){
													console.log(err);
												}else{
													let pedag = require("../models/getFormPedag.js")(ficha[0].idfichaDoc, (err, pedag) =>{
														if(err){
															console.log(err);
														}else{
															let invest = require("../models/getInvestigacao")(ficha[0].idfichaDoc, (err, invest) =>{
																if(err){
																	console.log(err);
																}else{
																	let OrgGest = require("../models/getOrgaosGestao.js")((err, orgGest) =>{
																		if(err){
																			console.log(err);
																		}else{
																			try{
																				let auth = false;
																				ficha.forEach(f => {
																					if(f.vinculoIes === "E" && f.ativo === 1){
																						auth = true;
																					}
																				});
																				if(!auth){
																					console.log("teste")
																					res.render("docenteInvalido");
																				}else{
																					res.render("fichadocente", {user:user, tipoDocente:tipoDocente, catDocente:catDocente, grauDocente:grauDocente, areaDoc:areaDoc, ficha:ficha, forma:forma, pedag:pedag, invest:invest,orgGest:orgGest})
																				}
																			}catch{
																				res.render("docenteInvalido");
																			}
																		}
																	})
																}
															})
														}
													})
												}
											})
										}
									})						
								}
							})
						}
					})
				}
			})
		}
	})
}

router.get("/fichadocente", isLoggedIn, renderFichaDoc);

router.get("/getTipoDoc/docTipo", isLoggedIn, (req, res) =>{
	let lstUcs = require("../models/getOpcaoCarreira.js")((err,lstUcs) =>{
		if(err)
			console.log(err);
		else
			res.send(lstUcs);
	})
})

router.get("/getTipoDoc/out", isLoggedIn, (req, res) =>{
	let lstUcs = require("../models/getOpcaoCarreiraOut.js")((err,lstUcs) =>{
		if(err)
			console.log(err);
		else
			res.send(lstUcs);
	})
})

router.get("/getArea2/:cod", isLoggedIn,(req, res) =>{
	let areaDoc = require("../models/getAreaDocente2.js")(req.params.cod, (err, areaDoc) =>{
		if(err)
			console.log(err);
		else
			res.send(areaDoc);
	})
})

router.get("/getFormaDoc/:id", (req, res) =>{
	let docente = require("../models/getFormaDocByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.get("/getFormaPedagDoc/:id", (req, res) =>{
	let docente = require("../models/getFormaPedagDocByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.get("/getInvestigacao/:id", (req, res) =>{
	let docente = require("../models/getInvestigacaoByID.js")(req.params.id, (err,ficha) =>{
		if(err)
			console.log(err);
		else
			res.send(ficha);
	})
})

router.get("/delFormaDoc/:id", (req, res) => {
	const user = req.session.passport.user.sAMAccountName;
	let delForma = require('../models/delFormaDoc')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			res.locals.success = "Apagado";	
			return renderFichaDoc(req, res);
		}
	})
})

router.get("/delFormaPedagDoc/:id", (req, res) => {
	const user = req.session.passport.user.sAMAccountName;
	let delForma = require('../models/delFormaPedagDoc')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			res.locals.success = "Apagado";	
			return renderFichaDoc(req, res);
		}
	})
})

router.get("/delInvestigDoc/:id", (req, res) => {
	const user = req.session.passport.user.sAMAccountName;
	let delForma = require('../models/delInvestDoc')(req.params.id, (err, delFicha) => {
		if(err)
			console.log(err);
		else{
			res.locals.success = "Apagado";	
			return renderFichaDoc(req, res);
		}
	})
})

router.post("/setFichaDoc", isLoggedIn, (req, res) =>{
	let id = req.body.idDoc;
	let auth = req.body.autoriza ? 1 : 0 ;
	let nomeDoc = req.body.tbNome;
	let emailDoc = req.body.tbEmail;
	if (emailDoc.includes('@')) {
		emailDoc = emailDoc.split('@')[0];
	}
	let vinculoIes = req.body.cbVinvulo;
	let anoVinc = req.body.tbAnoVinc ? req.body.tbAnoVinc : 0;
	let tipoDoc = req.body.cbTipo;
	let tipoDoc2 = req.body.cbTipo2;
	let catDoc = req.body.cbCatDocente;
	let grauDoc = req.body.cbGrauDocente;
	let areaCientDoc = req.body.cbAreaDocente;
	let areCient2Doc = req.body.cbAreaDocente2;
	let anoGrauDoc = req.body.tbAnoGrau;
	let iesGrauDoc = req.body.tbIesGrau;
	let grauEstrangDoc = req.body.grauEstrang ? 1 : 0;
	let grauNivelDoc = req.body.optionsGrau;
	let dataRegEst = req.body.tbDataGrauEstrang;
	let equivGraduEst = req.body.tbnotaEstrang;
	let especialDoc = req.body.tituloEsp ? 1 : 0;
	let nomeTitEspec = req.body.tbNomeTituloEdsp;
	let nomeTitEspecEng = req.body.tbNomeTituloEdspEst;
	let areaCientEsp = req.body.cbAreaDocenteEsp;
	let areaCient2Esp = req.body.cbAreaDocente2Esp;
	let anoTitEspec = req.body.tbAnoEsp;
	let iesTitEspec = req.body.tbIesEsp;
	let iesTitEspecEng = req.body.tbIesEspEst;
	let percIes = req.body.tbPercDedic;
	let ciencVitae = req.body.tbCienciaVitae;
	let orcid = req.body.tbOrcid;
	let doutorando = req.body.doutorando ? 1 : 0;
	let anoDoutorando = req.body.tbAnoDoutorando ? req.body.tbAnoDoutorando : 0;
    let nomeIES = req.body.nomeIES;

	console.log(req.body)
	let ficha = require("../models/setFichaDoc.js")(id, auth,nomeDoc,emailDoc,vinculoIes,anoVinc,tipoDoc,tipoDoc2,vinculoIes,catDoc,grauDoc,areaCientDoc,areCient2Doc,anoGrauDoc,iesGrauDoc,grauEstrangDoc,grauNivelDoc,dataRegEst,equivGraduEst,especialDoc,nomeTitEspec,nomeTitEspecEng,areaCientEsp,areaCient2Esp,anoTitEspec,iesTitEspec,iesTitEspecEng,percIes,ciencVitae,orcid,doutorando,anoDoutorando,(err, fic) => {
		if(err){
				console.log(err);
			}else{
				res.locals.success = "Enviado";	
				return renderFichaDoc(req, res);
				//res.redirect("https://qualidade.essatla.pt/fichadocente");
			}
	})
})
router.post("/setFormacao", (req, res) =>{
	let idDoc = req.body.idDocTitulo;
	let idForma = req.body.idFormaDoc;
	let ano = req.body.tbAnoTitulo ? req.body.tbAnoTitulo : 0;
	let nome = req.body.tbnomeTitulo;
	let nomeEng = req.body.tbnomeTituloEng;
	let area = req.body.cbAreaTituloModal;
	let area2 = req.body.cbAreaTituloModal2;
	let ies = req.body.tbIesTitulo;
	let iesEng = req.body.tbIesTituloEng;
	let classif = req.body.tbGrauTitulo;
	let classifEng = req.body.tbGrauTituloEng;
	let tituloEstrang = req.body.grauEstrangTitulo ? 1 : 0;
	let GrauTitulo = req.body.optionsGrauTitulo;
	let dataReg = req.body.tbDataGrauEstrangTitulo;
	let equivGrau = req.body.tbnotaEstrangTitulo;
	let iesEstrang = req.body.tbIesEstrangTitulo;


	console.log("--req.body--")
	let ficha = require("../models/setTituloDoc.js")(idDoc,idForma,ano,nome,nomeEng,area,area2,ies,iesEng,classif,classifEng,tituloEstrang,GrauTitulo,dataReg,equivGrau,iesEstrang,(err, fic) => {
		if(err){
				console.log(err);
			}else{
				res.locals.success = "Enviado";	
				return renderFichaDoc(req, res);
				//res.redirect("https://qualidade.essatla.pt/fichadocente");
			}
	})
})

router.post("/setFormacaoPedag", (req, res) =>{
	let idDoc = req.body.idDocPedag;
	let idForma = req.body.idFormaPedagDoc;
	let formPedag = req.body.tbFormPedag;

	let form = require("../models/setFormPedag.js")(idDoc, idForma, formPedag, (err, form) =>{
		if(err){
			console.log(err);
		}else{
			res.locals.success = "Enviado";
			return renderFichaDoc(req, res);
			//res.redirect("https://qualidade.essatla.pt/fichadocente");
		}
	})
})

router.post("/setInvestigacao", (req, res) =>{
	let idDoc = req.body.idDocInvest;
	let idForma = req.body.idAfiliacaoDoc;
	let unidade = req.body.tbUniInvest;
	let iesInvest = req.body.tbIesInvest;
	let classInvest = req.body.cbClassInvest;
	let investInteg = req.body.cbIntegradoInvest;
	let tipoInvest = req.body.cbTipoInvest;

	let form = require("../models/setInvest.js")(idDoc, idForma, unidade, iesInvest, classInvest, investInteg, tipoInvest, (err, form) =>{
		if(err){
			console.log(err);
		}else{
			res.locals.success = "Enviado";
			return renderFichaDoc(req, res);
			//res.redirect("https://qualidade.essatla.pt/fichadocente");
		}
	})
})


// routes/colaborador.js
const InsertColaborador = require('../models/colaborador');
const GetColaboradorByNumero = require('../models/getColaboradorByNumero');
let pool = require('../models/dbconnection.js');
const query = (sql) => new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => err ? reject(err) : resolve(results));
});

async function carregarOpcoes() {
    const [regimes, niveisQNQ, funcoes, areasFunc, catColab, cnaef] = await Promise.all([
        query('SELECT idtbOpcaoRegimeColab, nome FROM Qualidade.tbOpcaoRegimeColab ORDER BY nome'),
        query('SELECT idtbOpcaoNiveisQNQ, nome, nivel FROM Qualidade.tbOpcaoNiveisQNQ ORDER BY nivel'),
        query('SELECT idtbOpcaoFuncaoColab, nome FROM Qualidade.tbOpcaoFuncaoColab ORDER BY nome'),
        query('SELECT idtbOpcaoAreasFunc, nome, sigla FROM Qualidade.tbOpcaoAreasFunc ORDER BY nome'),
        query('SELECT idtrOpcaoCatColab, nome FROM Qualidade.trOpcaoCatColab WHERE ativo = 1 ORDER BY nome'),
		query('SELECT idtbOpcaoAreaCient3Niv, nomeAreaCient FROM Qualidade.tbOpcaoAreaCient3Niv ORDER BY nomeAreaCient')
    ]);
    return { regimes, niveisQNQ, funcoes, areasFunc, catColab, cnaef };
}

async function carregarColaborador(req) {
    const user = req.session.passport.user.sAMAccountName;

    try {
        const resultado = await query(
            "SELECT numero FROM Qualidade.Colaborador WHERE email LIKE '" + user + "%' and ativo = 1 LIMIT 1"
        );

        if (!resultado || resultado.length === 0) {
            return null;
        }

        return resultado[0].numero;

    } catch (err) {
        console.error('Erro ao carregar colaborador:', err);
        throw err;
    }
}

// Editar colaborador existente -> form preenchido (colab = registo encontrado)
router.get('/fichaColab', isLoggedIn, async (req, res) => {
    try {
		const opcoes = await carregarOpcoes();

		const numeroColaborador = await carregarColaborador(req);

		console.log('Número colaborador ->', numeroColaborador);

		if (!numeroColaborador) {
			res.render('colabInvalido');
		}

		GetColaboradorByNumero(numeroColaborador, (err, colab) => {
			if (err) {
				console.error('Erro ao procurar colaborador:', err);
				res.render('colabInvalido');
			}

			if (!colab) {
				res.render('colabInvalido');
			}

			res.render('fichaColab', { ...opcoes, colab });
		});

	} catch (err) {
		console.error('Erro ao carregar dados da fichaColab:', err);
		res.status(500).send('Erro ao carregar dados');
	}
});

router.post('/enviarColab', (req, res) => {
    const b = req.body;
 
    // Validação dos campos "required" no form
    if (!b.tbNumero || !b.tbNome || !b.tbDataAdmissao || !b.tbEmail) {
        return res.status(400).send('Preenche os campos obrigatórios: Nº, Nome, Data de Admissão e Email.');
    }
 
    // Validação do email institucional: formato válido e domínio @uatlantica.pt
    const emailRegex = /^[^\s@]+@uatlantica\.pt$/i;
    if (!emailRegex.test(b.tbEmail.trim())) {
        return res.status(400).send('Email inválido. Tem de ser um endereço @uatlantica.pt.');
    }
 
    const v = (val) => (val === undefined || val === null || val === '' ? null : val);
 
    // CORREÇÃO: cbDepartamento agora é um <select multiple>. Se o utilizador
    // escolher só UMA opção, o Express entrega uma string; se escolher VÁRIAS,
    // entrega um array. Normalizamos sempre para array antes de gravar.
    const idsAreaFunc = Array.isArray(b.cbDepartamento)
        ? b.cbDepartamento
        : (b.cbDepartamento ? [b.cbDepartamento] : []);
 
    InsertColaborador(
        b.tbNumero,
        b.tbNome,
        b.tbDataAdmissao,
        b.tbEmail,
 
        v(b.cbCatProfissional),// idCatColab
        v(b.cbCargo),          // idFuncao
        v(b.cbTipoContrato),   // idRegime
        v(b.tbCargaHoraria),   // cargaHoraria
        v(b.cbQNQ),            // idNivelQNQ
        v(b.tbAreaForma),      // areaFormacao
        v(b.tbOutForma),       // outrasFormacoes
        idsAreaFunc,           // array de idAreaFunc selecionados
 
        (err, result) => {
            if (err) {
                console.error('Erro ao gravar Colaborador:', err);
                // erro típico: numero duplicado (chave única) -> código ER_DUP_ENTRY
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Já existe um colaborador com esse número.');
                }
                return res.status(500).send('Erro ao gravar os dados do colaborador.');
            }
            // Ajusta o redirecionamento ao fluxo real da aplicação
            res.redirect('/menu?ok=1');
        }
    );
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	//res.redirect("/");
}


module.exports = router;
