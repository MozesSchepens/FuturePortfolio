const dialogflow = require('@google-cloud/dialogflow');
const axios = require('axios');
const uuid = require('uuid');
const path = require('path');

// Football-Data API-sleutel
const FOOTBALL_API_KEY = '7cee8f4ff6864f4a9319b2448440816c';

// Maak een sessieclient voor Dialogflow
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: path.join(__dirname, 'config/my-chatbot-project-2024-849aed20c9e3.json')  // Zorg ervoor dat dit pad correct is
});

// Functie om Premier League-standen op te halen
async function getPremierLeagueStats() {
    const apiUrl = `https://api.football-data.org/v4/competitions/2021/standings`;  // Premier League ID = 2021

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Auth-Token': FOOTBALL_API_KEY
            }
        });

        const standings = response.data.standings[0].table;
        let standingsText = 'Premier League Standen:\n';
        standings.forEach((team, index) => {
            standingsText += `${index + 1}. ${team.team.name} - Punten: ${team.points}, Gespeeld: ${team.playedGames}, Gewonnen: ${team.won}, Gelijk: ${team.draw}, Verloren: ${team.lost}\n`;
        });

        return standingsText;
    } catch (error) {
        console.error('Error fetching Premier League data:', error);
        throw error;
    }
}

// Functie om aankomende wedstrijden op te halen
async function getUpcomingMatches() {
    const apiUrl = `https://api.football-data.org/v4/competitions/2021/matches?status=SCHEDULED`;  // Voor aankomende wedstrijden

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Auth-Token': FOOTBALL_API_KEY
            }
        });

        const matches = response.data.matches;
        let matchesText = 'Aankomende Premier League Wedstrijden:\n';
        matches.forEach((match) => {
            const homeTeam = match.homeTeam.name;
            const awayTeam = match.awayTeam.name;
            const date = match.utcDate.split('T')[0]; // Alleen de datum
            matchesText += `${homeTeam} vs ${awayTeam} - Datum: ${date}\n`;
        });

        return matchesText;
    } catch (error) {
        console.error('Error fetching upcoming matches:', error);
        throw error;
    }
}

// Functie om topscorers op te halen
async function getTopScorers() {
    const apiUrl = `https://api.football-data.org/v4/competitions/2021/scorers`;  // Voor topscorers

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Auth-Token': FOOTBALL_API_KEY
            }
        });

        const scorers = response.data.scorers;
        let scorersText = 'Premier League Topscorers:\n';
        scorers.forEach((scorer, index) => {
            const playerName = scorer.player.name;
            const teamName = scorer.team.name;
            const goals = scorer.numberOfGoals;
            scorersText += `${index + 1}. ${playerName} (${teamName}) - Doelpunten: ${goals}\n`;
        });

        return scorersText;
    } catch (error) {
        console.error('Error fetching top scorers:', error);
        throw error;
    }
}

// Functie om berichten naar Dialogflow te sturen via de Node.js client
async function sendToDialogflow(message) {
    const sessionId = uuid.v4();  // Genereer een unieke sessie-ID
    const sessionPath = sessionClient.projectAgentSessionPath('my-chatbot-project-2024', sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'nl',  // Vervang met de gewenste taalcode
            },
        },
    };

    try {
        const [response] = await sessionClient.detectIntent(request);
        const queryResult = response.queryResult;

        // Check welke intent is geactiveerd en voer de juiste actie uit
        if (queryResult.intent.displayName === 'PremierLeagueStanden') {
            return await getPremierLeagueStats();
        } else if (queryResult.intent.displayName === 'PremierLeagueUpcomingMatches') {
            return await getUpcomingMatches();
        } else if (queryResult.intent.displayName === ' TopSpelers') {
            return await getTopSpelers();
        }

        return queryResult.fulfillmentText;
    } catch (error) {
        console.error('Error processing message:', error);
        throw error;
    }
}

module.exports = { sendToDialogflow };
