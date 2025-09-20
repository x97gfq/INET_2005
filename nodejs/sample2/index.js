const fs = require('fs');

// Read the JSON file
fs.readFile('player_stats.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const players = JSON.parse(data).players;

  // Example: Calculate total passing yards for all quarterbacks
  const totalPassingYards = players
    .filter(player => player.position === 'Quarterback')
    .reduce((sum, player) => sum + player.passing_yards, 0);
  /*
  var total;
  for(var i = 0; i < players.length; i++) {
    var p = players[i];
    if (p.position === 'Quarterback') {
      total += p.passing_yards;
    }
  }
  */

  console.log(`Total Passing Yards for all Quarterbacks: ${totalPassingYards}`);

  //Identify the player with the most rushing yards.
  const yardsCount = {};

  players.forEach(player => {
    if (player.rushing_yards) {
      yardsCount[player.name] = player.rushing_yards;
    }
  })

  console.log("rushing yards", yardsCount);

  let sortedRushingYards = Object.entries(yardsCount).sort((a,b) => b[1] - a[1]);

  let topRushingYardsPlayer = sortedRushingYards[0];

  console.log(`The top rushing yards player is ${topRushingYardsPlayer[0]}: ${topRushingYardsPlayer[1]}`);

  //Touchdown Leaders:​
  //Find the player with the most total touchdowns (combining rushing and receiving touchdowns).
  let touchDownCounts = {};
  players.forEach(player => {
    if (player.rushing_touchdowns || player.receiving_touchdowns) {
      touchDownCounts[player.name] = ( (player.rushing_touchdowns ? player.rushing_touchdowns : 0) +
                                          (player.receiving_touchdowns ? player.receiving_touchdowns : 0 )   );
    }
  })
  let sortedTouchdowns = Object.entries(touchDownCounts).sort((a,b) => (b[1] - a[1]));
  //console.log("touchDownCounts", sortedTouchdowns);

  let topTouchDowns = sortedTouchdowns[0];
  console.log(`The top touchdowns player is ${topTouchDowns[0]}: ${topTouchDowns[1]}`);
});





