# Bidding Game

Basic game:

- 2 players.
- Each round each player picks an amount to bid.
- The player who picked the lowest amount wins that number of points.
    + Hence you want to bid *just below* the other player.
    + Ties go to no one.
- Fixed number of rounds, whoever has the highest sum at the end of the round
  wins.

Round robin:

- Many players.
- Each set composed of matches in which players paired against each other.
    + Each match you play the basic game against opponent.
    + Points summed across *all* matches in sets.

## Program

A player is

~~~
BID := card[1, 100];
POINTS := card;
ROUND := { name_1: string, bid_1: BID, name_2: string, bid_2: BID };
PLAYER := {
    name: string,
    strategy: (rounds: card, round: ord[rounds], past_bids: (round -> ROUND)) -> BID
} ;
MATCH_RESULT := { 
    name_1: string, 
    name_2: string, 
    point_1: POINTS,
    point_2: POINTS,
    bids: [ROUND] 
};
SET_RESULT := {
    names: [string],
    matches: (names, names) -> MATCH_RESULT,
    scores: names -> POINTS,
    winners: [names]
}
~~~

# Strategies

The most basic kind of strategy one could have is a *constant* strategy, i.e. one that always bids the same amount. In a competition among constant strategies, the one with the lowest bid wins all the points. Nevertheless, in a set the winner is not in general the lowest bidder as higher bidders can make up for their losses with higher payouts on their wins. In a set with $r$ rounds among constant bidders, the bidder of value $v$ will win $rvh$ points where $h$ is the number of players with a higher bid. Holding other players fixed, $h$ is a function of $v$, so in such a competition one wants to maximize $vh(v)$ where $h(v)$ is a monotonically decreasing function. Suppose for concreteness $h(v) = 100 - v$, i.e. the players are evenly distributed. Then we have $e(v) = 100v - v^2$. Then the best payout is at $50$. 