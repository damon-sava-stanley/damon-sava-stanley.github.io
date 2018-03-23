var rounds = 100;
var max_bid = 100;

function fix_bid(bid) {
    return Math.min(max_bid, Math.max(1, Math.round(bid)));
}

function play_match(player1, player2, rounds) {
    var name1 = player1.name;
    var name2 = player2.name;

    var points1 = 0;
    var points2 = 0;

    var past_bids = [];
    for (var round = 0; round < rounds; round++) {
        // TODO: copy past_bids to prevent cheese
        var bid1 = fix_bid(player1.strategy(rounds, round, past_bids));
        var bid2 = fix_bid(player2.strategy(rounds, round, past_bids));
        var round_result = {
            name_1: name1,
            bid_1: bid1,
            name_2: name2,
            bid_2: bid2
        };
        past_bids.push(round_result);
        if (bid1 < bid2) {
            points1 += bid1;
        } else if (bid2 < bid1) {
            points2 += bid2;
        }
    }
    return { 
        name_1: name1, 
        name_2: name2, 
        point_1: points1,
        point_2: points2,
        bids: past_bids 
    };
}

function play_set(players, rounds) {
    var names = players.map(p => p.name);
    var results = {};
    var scores = {};
    names.forEach(n => scores[n] = 0);
    names.forEach(n => results[n] = {});
    for (var i = 0; i < players.length - 1; i++) {
        var player1 = players[i];
        for (var j = i + 1; j < players.length; j++) {
            var player2 = players[j];
            var result = play_match(player1, player2, rounds);
            results[player1.name][player2.name] = result;
            results[player2.name][player1.name] = result;
            scores[player1.name] += result.point_1;
            scores[player2.name] += result.point_2;
        }
    }
    var winners = [];
    var winning_score = -Infinity;
    names.forEach(n => {
        if (scores[n] > winning_score) {
            winners = [n];
            winning_score = scores[n];
        } else if (scores[n] == winning_score) {
            winners.push(n);
        }
    });
    return {
        names: names,
        matches: results,
        scores: scores,
        winners: winners
    }
}

/**
 * The constant player `bid` is one that always bids `bid` every single round.
 */
function constant_player(name, bid) {
    return {
        name: name,
        strategy: function (rounds, round, past_bids) {
            return bid;
        }
    };
}

/**
 * The progression player bids according to some set strategy (e.g. counting
 * down) that does not take into account the opponent.
 */
function progression_player(name, progression) {
    return {
        name: name,
        strategy: function (rounds, round, past_bids) {
            return progression(bid);
        }
    };
}

/**
 * The reactive player after making an `initial_bid` afterwards bids according
 * to a function of their opponent's previous bid according to `reaction`.
 */
function reactive_player(name, initial_bid, reaction) {
    return {
        name: name,
        strategy: function (rounds, round, past_bids) {
            if (round == 0) return initial_bid;
            var past_bid = past_bids[round-1];
            var opponent_bid = past_bid.name_1 == name ? past_bid.bid_2 : past_bid.bid_1;
            var self_bid = past_bid.name_1 == name ? past_bid.bid_1 : past_bid.bid_2;
            return reaction(opponent_bid, self_bid);
        }
    };
}

/**
 * The fully reactive player reacts to all previous opponent bids.
 */
function fully_reactive_player(name, initial_bid, reaction) {
    return {
        name: name,
        strategy: function (rounds, round, past_bids) {
            if (round == 0) return initial_bid;
            var opponent_bids = past_bids.map(b => b.name_1 == name ? b.bid_2 : b.bid_1);
            var self_bids = past_bids.map(b => b.name_1 == name ? b.bid_1 : b.bid_2);
            return reaction(opponent_bid, self_bids);
        }
    };
}

/**
 * A count down player is a reactive player who bids their opponents bid minus some increment.
 */
function count_down_player(name, initial_bid, decrement) {
    return reactive_player(name, initial_bid, o => o - decrement);
}

var results = {};
var view = { action: "summary" };

function viewResults(view, results, container) {
    container.empty();
    var header = $("<h2>");
    container.append(header);
    if (view.action == "summary") {
        var summary = $("<span>");
        summary.text("Summary");
        header.append(summary);

        var table = $("<div>", {id: "summary-table", class: "col"});
        var names = results.names.slice(0);
        var scores = results.scores;
        var winners = results.winners;
        names.sort((n1, n2) => scores[n2]-scores[n1]);
        names.forEach(n => {
            var nclass = winners.includes(n) ? "winner" : "";
            var nlink = $("<a>", {id: n+"-link", class: "link " + nclass});
            nlink.text(n);
            nlink.click(e => viewResults({action: "player", player: n}, results, container));
            var nscore = $("<span>", {id: n+"-score", class: nclass});
            nscore.text(scores[n].toString());
            var row = $("<div>", {class: "row"});
            row.append($("<div>", {class: "col"}).append(nlink));
            row.append($("<div>", {class: "col"}).append(nscore));
            table.append(row);
        });
        container.append(table);
    }
    if (view.action == "player") {
        var summary = $("<span>", {class: "link"});
        summary.click(e => viewResults({action: "summary"}, results, container));
        summary.text("Summary");
        header.append(summary);

        var interspace = $("<span>");
        interspace.text(" > ");
        header.append(interspace);

        var name = view.player;
        var nameLine = $("<span>");
        nameLine.text(name);
        header.append(nameLine);

        var score =  results.scores[name];
        var scoreLine = $("<span>");
        scoreLine.text(" (" + score.toString() + ") ");
        header.append(scoreLine);

        var table = $("<div>", {id: "summary-table", class: "col"});
        var names = results.names.filter(n => n != name);
        var n_scores = {};
        var other_scores = {};
        names.forEach(n => {
            var match = results.matches[name][n];
            if (match.name_1 == name) {
                n_scores[n] = match.point_1;
                other_scores[n] = match.point_2;
            } else {
                n_scores[n] = match.point_2;
                other_scores[n] = match.point_1;                
            }
        });
        names.sort((n1, n2) => (n_scores[n2]-other_scores[n2])-(n_scores[n1]-other_scores[n1]));
        names.forEach(n => {
            var this_score = n_scores[n];
            var other_score = other_scores[n];
            var winner = this_score > other_score;

            var nclass = winner ? "winner" : "";
            var nlink = $("<a>", {id: n+"-link", class: "link " + nclass});
            nlink.text(n);
            nlink.click(e => viewResults({action: "versus", player: name, other: n}, results, container));
            
            var nscore = $("<span>", {id: n+"-score", class: nclass});
            var otherscore = $("<span>", {id: n+"-other-score", class: nclass});
            nscore.text(this_score.toString());
            otherscore.text(other_score.toString());
            var row = $("<div>", {class: "row"});
            row.append($("<div>", {class: "col"}).append(nlink));
            row.append($("<div>", {class: "col"}).append(nscore));
            row.append($("<div>", {class: "col"}).append(otherscore));
            table.append(row);
        });
        container.append(table);
    }
    if (view.action == "versus") {
        var summary = $("<span>", {class: "link"});
        summary.click(e => viewResults({action: "summary"}, results, container));
        summary.text("Summary");
        header.append(summary);

        var interspace = $("<span>");
        interspace.text(" > ");
        header.append(interspace);

        var this_name = view.player;
        var other_name = view.other;

        var match = results.matches[this_name][other_name];
        var this_name_1 = match.name_1 == this_name;

        var this_nameLine = $("<span>", {class: "link"});
        this_nameLine.click(e => viewResults({action: "player", player: this_name}, results, container));
        this_nameLine.text(this_name);
        header.append(this_nameLine);

        var this_score = this_name_1 ? match.point_1 : match.point_2;
        var this_scoreLine = $("<span>");
        this_scoreLine.text(" (" + this_score.toString() + ") ");
        header.append(this_scoreLine);

        var intervs = $("<span>");
        intervs.text(" vs ");
        header.append(intervs);

        var other_nameLine = $("<span>", {class: "link"});
        other_nameLine.click(e => viewResults({action: "player", player: other_name}, results, container));
        other_nameLine.text(other_name);
        header.append(other_nameLine);

        var other_score = this_name_1 ? match.point_2 : match.point_1;
        var other_scoreLine = $("<span>");
        other_scoreLine.text(" (" + other_score.toString() + ") ");
        header.append(other_scoreLine);

        var table = $("<div>", {id: "summary-table", class: "col"});

        for (var i = 0; i < match.bids.length; i++) {
            var bid = match.bids[i];
            var this_bid = this_name_1 ? bid.bid_1 : bid.bid_2;
            var other_bid = this_name_1 ? bid.bid_2 : bid.bid_1;
            var winner = this_bid < other_bid;

            var nclass = winner ? "winner" : "";
            var nscore = $("<span>", {id: i+"-score", class: nclass});
            var otherscore = $("<span>", {id: i+"-other-score", class: nclass});
            nscore.text(this_bid.toString());
            otherscore.text(other_bid.toString());
            var row = $("<div>", {class: "row"});
            row.append($("<div>", {class: "col"}).append(nscore));
            row.append($("<div>", {class: "col"}).append(otherscore));
            table.append(row);
        }
        container.append(table);
    }

    return false;
}

function shmeval(obj){
    return eval(obj);
}

function handleForm() {
    var playerCode = $("#bidding-code").val();
    $("#bidding-code").removeClass('code-error');
    try {
        var players = shmeval(playerCode);
    } catch (err) {
        $("#bidding-code").addClass('code-error');
        return false;
    }
    var result = play_set(players, rounds);
    
    Cookies.set('bidding-code', playerCode, { expires: 7 });

    var container= $("#container");
    return viewResults({action: "summary"}, result, container);
}

function main() {
    var code = Cookies.get('bidding-code');
    if (code) $("#bidding-code").val(code)
}
main();