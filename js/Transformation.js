var Transformation = (function (){
	function Single(target, output) {
		this.target = target;
		this.output = output;
	}

	Single.prototype.match = function (input) {
		if (input.startsWith(this.target)) {
			return this.target.length;
		}
		return 0;
	}

	function Transformation(singles) {
		this.singles = [];
		for (var i = 0; i < singles.length; i++) {
			this.singles.push(new Single(singles[i][0], singles[i][1]));
		}
	}

	Transformation.prototype.matches = function(input) {
		var matches = [];
		for (var i = 0; i < this.singles.length; i++) {
			var single = this.singles[i];
			var match = single.match(input);
			if (match) {
				matches.push({
					take: match,
					replace: single.output
				});
			}
		}
		return matches;
	}

	Transformation.prototype.execute = function(input) {
		var output = "";
		while (input.length > 0) {
			var matches = this.matches(input);
			if (matches.length > 0) {
				var match = matches[Math.floor(Math.random() * matches.length)];
				input = input.slice(match.take);
				output += match.replace;
			} else {
				input = input.slice(1);
			}
		}
		return output;
	}

	return Transformation; 
})();