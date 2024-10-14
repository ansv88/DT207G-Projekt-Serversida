# Webbtjänst (API) för menyhantering och användarautentisering
Det här repot innehåller kod för ett REST API byggt med Express. APIet är byggt för att kunna registrera användare, logga in till en skyddad sida samt hantering av en meny med rätter och spara takeaway-beställningar. Endast inloggade användare kan lägga till, uppdatera eller ta bort menyobjekt.

## Länk
En liveversion av APIet finns tillgänglig på följande URL:
[https://dt207g-projekt-serversida.onrender.com]

## Installation, databas
APIet använder en MongoDB-databas. Alla id:n för objekten automatgenereras av MongoDB.
Klona källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. 

## Miljövariabler
För att APIet ska fungera korrekt krävs följande miljövariabler i en `.env`-fil:

- `PORT`: Portnumret där servern körs (t.ex., 3000)
- `DATABASE`: MongoDB-anslutningssträngen (t.ex., `mongodb://localhost:27017/databasnamn`)
- `JWT_SECRET_KEY`: Hemlig nyckel för att signera JSON Web Tokens (JWT) för användarautentisering

## Körning
Efter installation av alla npm-paket kan du starta servern med kommando:
npm run start

## Användning
Nedan finns beskrivet hur man når APIet med olika ändpunkter:

|Metod  |Ändpunkt                     |Beskrivning                                                                       |
|-------|------------------------- ---|----------------------------------------------------------------------------------|
|POST   |/api/register                |Registrerar en ny användare (skickar username och password som JSON).             |
|POST   |/api/login                   |Loggar in en registrerad användare (skickar username och password som JSON).      |
|GET    |/projektdt207g/menuitems     |Hämtar alla menyobjekt.                                                           |
|GET	  |/projektdt207g/menuitems/_id |Hämtar ett specifikt menyobjekt baserat på dess ID.                               |
|POST	  |/projektdt207g/menuitems	    |Lägger till ett nytt menyobjekt (kräver autentisering).                           |
|PUT	  |/projektdt207g/menuitems/_id |Uppdaterar ett befintligt menyobjekt baserat på ID (kräver autentisering).        |
|DELETE	|/projektdt207g/menuitems/_id |Tar bort ett specifikt menyobjekt baserat på ID (kräver autentisering).           |
|POST	  |/projektdt207g/orders   	    |Skapar en ny take away-beställning                                                |
|GET	  |/projektdt207g/orders   	    |Hämta alla beställningar (kräver autentisering)                                   |
|DELETE |/projektdt207g/orders/_id    |Ta bort en beställning (kräver autentisering)                                     |

Ett menyobjekt returneras/skickas som JSON med följande struktur:
```
  {
  "_id": "60d5fbbf4c8b5f34d8e9b75f",
  "dishName": "Pizza Margherita",
  "ingredients": "Tomat, Mozzarella, Basilika",
  "price": 120,
  "__v": 0
  }
```

Ett användarobjekt returneras/skickas som JSON med följande struktur:
```
  {
  "_id": "66ce5fcbe00d276d229ce1e2",
  "username": "Tomten",
  "password": "$2b$10$NMUQlug9rMd4gkvT4YhL.eaB1pM2OlAcusFQhm/yEdLn5VJdEqBQ2",
  "created": "2024-08-27T23:22:51.298+00:00"
  }
```

## Autentisering
För att kunna komma åt skyddade resurser måste en giltig JWT-token skickas i request-header på klientsidan. Token fås genom att logga in med rätt användaruppgifter (se `/api/login` för att hämta en token). Exempel:
Authorization: Bearer <din-token-här>