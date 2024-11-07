# AI Chatbot voor Voetbalinformatie

## Overzicht

Dit project is een AI-chatbot die klanten kan voorzien van voetbalgerelateerde informatie, zoals spelersstatistieken, ratings en teaminformatie. De chatbot is bedoeld om routinematige vragen te automatiseren en real-time informatie te bieden. De kern van de chatbot bestaat uit Dialogflow voor natuurlijke taalverwerking (NLP) en de Football-Data API voor actuele voetbalgegevens. Dit README-bestand legt uit waarom de gekozen technologieën zijn gebruikt en hoe het project is gestructureerd.

## Projectdoelen

1. **Automatiseren van veelvoorkomende vragen**: Het doel van deze chatbot is om klanten snel antwoord te geven op vragen over voetbalstatistieken, zodat menselijke klantenservicemedewerkers zich kunnen richten op complexere vragen.
2. **Gebruik van AI voor natuurlijk taalbegrip**: De chatbot maakt gebruik van AI via Dialogflow om vragen in natuurlijke taal te begrijpen en te interpreteren.
3. **Realtime gegevens ophalen**: Door integratie met de Football-Data API kan de chatbot actuele statistieken over spelers en teams verstrekken.

## Gekozen Technologieën en Waarom

### 1. Dialogflow voor Natuurlijke Taalverwerking (NLP)
Dialogflow, een AI-oplossing van Google, is gekozen vanwege zijn krachtige NLP-mogelijkheden:
- **Natuurlijke taalbegrip**: Dialogflow kan complexe vragen begrijpen en interpreteren, zelfs als klanten verschillende manieren gebruiken om dezelfde vraag te stellen.
- **Parameterherkenning**: Dialogflow biedt de mogelijkheid om entiteiten zoals spelersnamen te herkennen. Hierdoor kan de chatbot specifieke vragen beantwoorden, zoals "Wat is de rating van Messi?" waarbij de spelersnaam automatisch als parameter wordt verwerkt.
- **Gebruiksgemak en schaalbaarheid**: Dialogflow maakt het eenvoudig om intents en entiteiten te definiëren, wat de chatbot schaalbaar en aanpasbaar maakt voor verschillende soorten vragen. 

### 2. Football-Data API voor Real-time Voetbalinformatie
De Football-Data API biedt actuele en gedetailleerde gegevens over spelers, teams, standen en wedstrijden.
- **Actuele gegevens**: Voor een project dat voetbalstatistieken verstrekt, is het cruciaal om betrouwbare en actuele gegevens te gebruiken. De Football-Data API maakt dit mogelijk.
- **Flexibiliteit en volledigheid**: De API biedt uitgebreide informatie over verschillende competities, wat de chatbot geschikt maakt voor een breed scala aan vragen. 
- **Efficiëntie**: Door een betrouwbare externe bron te gebruiken, kan de chatbot actuele gegevens verstrekken zonder dat gegevens handmatig bijgewerkt moeten worden.

### 3. Node.js voor de Backend
Node.js wordt gebruikt om de backend van de chatbot te beheren. Het zorgt voor de communicatie met zowel Dialogflow als de Football-Data API.
- **Snelheid en efficiëntie**: Node.js staat bekend om zijn snelheid en schaalbaarheid, waardoor het goed geschikt is voor API-aanroepen en server-side verwerking.
- **Makkelijk te integreren**: Node.js maakt het eenvoudig om de nodige API-aanroepen te doen naar Dialogflow en de Football-Data API, wat een efficiënte gegevensverwerking mogelijk maakt.

### 4. Frontend met HTML, CSS en JavaScript
De frontend van de chatbot is gebouwd met HTML en CSS, terwijl JavaScript de interactie tussen de gebruiker en de chatbot beheert.
- **Gebruiksvriendelijkheid**: HTML en CSS zorgen voor een eenvoudige en intuïtieve gebruikersinterface, terwijl JavaScript dynamische interacties mogelijk maakt.
- **Responsiviteit**: De combinatie van deze technologieën zorgt ervoor dat de chatbot goed functioneert op verschillende apparaten, wat essentieel is voor de toegankelijkheid.

## Structuur van het Project

- **`server.js`**: Dit bestand bevat de Node.js backend, die de communicatie met Dialogflow en de Football-Data API beheert. Hier worden de API-aanroepen verwerkt, de gegevens opgehaald en geformatteerd, en teruggestuurd naar de frontend.
- **`dialogflow.js`**: Dit bestand bevat de functie om berichten naar Dialogflow te sturen en de juiste intenten te verwerken. Afhankelijk van de intent wordt een specifieke API-functie aangeroepen.
- **`script.js`**: Het frontend-script dat gebruikersinput naar de server stuurt en de chatbotreacties terugstuurt naar de interface.
- **`index.html` en `styles.css`**: Deze bestanden zorgen voor de basisstructuur en styling van de gebruikersinterface van de chatbot.

## Conclusie

Dit project toont aan dat AI-chatbots een groot potentieel hebben voor het vervangen of aanvullen van klantenservicefuncties, vooral voor routinematige vragen. De integratie van Dialogflow en de Football-Data API bewijst dat AI-chatbots effectief kunnen worden ingezet om real-time gegevens te verstrekken, wat de klantenservice ontlast. Hoewel de chatbot momenteel operationeel is, zal verdere optimalisatie de nauwkeurigheid en efficiëntie verbeteren.

Door het gebruik van Dialogflow en API’s kunnen bedrijven niet alleen de efficiëntie verhogen, maar ook een gepersonaliseerde klantenservice bieden die 24/7 beschikbaar is. Toch blijft het toevoegen van menselijke agenten belangrijk voor complexere vragen, wat een toekomstgerichte hybride oplossing vormt.

