// Import the functions you need from the SDKs you need
require('dotenv').config();//ESCONDER MEUS DADOS :D
const { initializeApp } = require("firebase/app");//INICIALIZAR O BANCO DE DADOS
const { format } = require("date-fns");//UTILITÁRIO DE DATAS
const express = require("express");//SERVIDOR WEB
const cors = require("cors");//GERENCIAR CORS
const { v4: uuid } = require("uuid");//GERAR IDS ÚNICOS E ALEATÓRIOS
const { getFirestore, collection, getDocs, query, where, setDoc, doc} = require('firebase/firestore/lite');//UTILITÁRIOS DO FIRESTORE(BANCO DE DADOS)

//CONFIGURAÇÃO DO BANCO DE DADOS
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//HISTÓRICO DE FILMES SORTEADOS
async function getDays() {
    const daysRef = collection(db, 'days');//cria referencia
    const daysSnapshot = await getDocs(daysRef);//captura uma foto da referencia
    const daysList = daysSnapshot.docs.map(doc => doc.data());//percorre a coleção transformando cada documento em um objeto, contendo os dados do documento
    return daysList;
}

//FILMES SORTEADOS DO DIA
async function getDay(day) {
    const q = query(collection(db, "days"), where("day", "==", day));//cria a query de consulta
    const daysSnapshot = await getDocs(q);
    const daysList = daysSnapshot.docs.map(doc => doc.data());
    return daysList[0];
}

async function saveDay(day) {
    const id = uuid();//gerar id único
    const daysRef = collection(db, "days");//referencia de uma coleção
    const docRef = doc(daysRef, id);//referencia de um documento
    await setDoc(docRef, day);
}

/**
 * PEGAR NÚMERO ALEATÓRIO
 * @param {Number} max número máximo gerado
 * @returns {Number} número aleatório
 */
function sortNumber(max) {
    return Math.floor(Math.random() * max);
}

//PEGAR O DIA DE HOJE E FORMATA-LO
function getToday(){
    const pattern = "yyyy-MM-dd";//cria um padrão de data
    const today = new Date();//pega a data atual
    return format(today, pattern);//formata usando o date-fns
}

//VERIFICAR, SORTEAR E CADASTRAR O FILME DO DIA
async function getDailyMovie(max){
    const today = getToday();//pegar data de hoje
    const day = await getDay(today);//verificar o dia
    if(day) return day.id_movie;//se o dia tiver no banco de dados só retornar o valor do dia
    const id_movie = sortNumber(max);//sortear o número do dia
    const newDay = {day: today, id_movie};//configurar um novo documento
    await saveDay(newDay);//salvar/cadastar o dia no banco de dados
    return id_movie;
}

const server = express();//cria servidor web
const port = 5002;//defini uma porta
server.use(express.json());//atribui o formato de resposta geral do servidor como json
server.use(cors());//configura o cors do servidor



//CRIA ENDPOINT DO TIPO GET
server.get('/daily-movie', async(req, res)=>{
    const max = req.query.max ?? 0;
    const id_movie = await getDailyMovie(max);
    res.send({id_movie});
});

//INICIA O SERVIDOR
server.listen(port, ()=>{
    console.log(`Server started on port ${port}! 🚀`);
});