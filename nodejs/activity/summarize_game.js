const fs = require('fs');

fs.readFile('hockey_game.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const gameData = JSON.parse(data);

    const { date, teams, score, events } = gameData.game;

    console.log(`Game Summary: ${teams.home} vs ${teams.away}`);
    console.log(`Date: ${date}`);
    console.log(`Final Score: ${teams.home} ${score.home} - ${score.away} ${teams.away}`);
    console.log('Events:');

    events.forEach(event => {
        console.log(`Period ${event.period}, Time: ${event.time}, Team: ${event.team}, Player: ${event.player}, Event: ${event.event}`);
    });
});
