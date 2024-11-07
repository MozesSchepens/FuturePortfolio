const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { SessionsClient } = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');
const app = express();

app.use(bodyParser.json());

// Zorg ervoor dat je de statische bestanden (zoals HTML, CSS en JavaScript) kunt serveren
app.use(express.static(path.join(__dirname, 'public')));

const sessionClient = new SessionsClient({
    keyFilename: path.join(__dirname, 'config/my-chatbot-project-2024-849aed20c9e3.json')
});

// API-sleutel voor Football-Data.org
const FOOTBALL_API_KEY = '7cee8f4ff6864f4a9319b2448440816c';

// Functie om Premier League-statistieken op te halen via Football-Data API
async function getPremierLeagueStats() {
    const apiUrl = `https://api.football-data.org/v4/competitions/2021/standings`;  // Premier League ID = 2021

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Auth-Token': FOOTBALL_API_KEY
            }
        });

        const standings = response.data.standings[0].table;
        let standingsTable = `
        <table border="1">
            <tr>
                <th>Positie</th>
                <th>Team</th>
                <th>Punten</th>
                <th>Gespeeld</th>
                <th>Gewonnen</th>
                <th>Gelijk</th>
                <th>Verloren</th>
            </tr>`;

        standings.forEach((team, index) => {
            standingsTable += `
            <tr>
                <td>${index + 1}</td>
                <td>${team.team.name}</td>
                <td>${team.points}</td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
            </tr>`;
        });

        standingsTable += `</table>`;
        return standingsTable;
    } catch (error) {
        console.error('Error fetching Premier League data:', error);
        throw error;
    }
}

// Functie om aankomende Premier League wedstrijden op te halen
async function getUpcomingMatches() {
    const apiUrl = `https://api.football-data.org/v4/competitions/2021/matches?status=SCHEDULED`;

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
    const apiUrl = `https://api.football-data.org/v4/competitions/2021/scorers`;

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

// Functie om berichten naar Dialogflow te sturen en intent te verwerken
async function sendToDialogflow(message) {
    const sessionId = uuid.v4();
    const sessionPath = sessionClient.projectAgentSessionPath('my-chatbot-project-2024', sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'nl',
            },
        },
    };

    try {
        const [response] = await sessionClient.detectIntent(request);
        const queryResult = response.queryResult;

        // Verwerk intenties voor statistieken, topscorers en aankomende wedstrijden
        if (queryResult.intent.displayName === 'PremierLeagueStanden') {
            return await getPremierLeagueStats();
        } else if (queryResult.intent.displayName === 'PremierLeagueUpcomingMatches') {
            return await getUpcomingMatches();
        } else if (queryResult.intent.displayName === 'TopSpelers') {
            return await getTopScorers();
        }

        return queryResult.fulfillmentText;
    } catch (error) {
        console.error('Error processing message:', error);
        throw error;
    }
}

// Voeg een route toe om de 'index.html' te serveren
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint voor de frontend om berichten te versturen
app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const dialogflowResponse = await sendToDialogflow(userMessage);
        res.json({ reply: dialogflowResponse });
    } catch (error) {
        res.status(500).send(`Error processing message: ${error.message}`);
    }
});

// Start de server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
