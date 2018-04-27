var LSystem = (function() {
	function compileRule(rule) {
		var target = rule[0];
		var transformation = rule[1];
		if (Array.isArray(transformation)) {
			return function(input) {
				if (input !== target) {
					return null;
				}
				for (var i = 0; i < transformation.length - 1; i++) {
					var output = transformation[i];
					if (Math.random() < output.chance) {
						return output.result;
					}
				}
				return transformation[transformation.length - 1].result;
			}
		} else {
			return function(input) {
				if (input !== target) {
					return null;
				}
				return transformation;
			}		
		}
	}

	function LSystemI(other) {
		this.axiom = other.axiom;
		this.rules = [];
		for (var i = 0; i < other.rules.length; i++) {
			this.rules.push(compileRule(other.rules[i]));
		}
		if (other.final) {
			this.final = other.final;
		} else {
			this.final = function (x) { return x; }
		}
	}

	LSystemI.prototype.generate = function(generations) {
		var current = this.axiom;
		for (var n = 0; n < generations; n++) {
			var next = "";
			for (var i = 0; i < current.length; i++) {
				var char = current[i];
				for (var j = 0; j < this.rules.length; j++) {
					var rule = this.rules[j];
					var future = rule(char);
					if (future !== null) {
						char = future;
						break;
					}
				}
				next += char;
			}
			current = next;
		}
		return this.final(current);
	};

	return LSystemI;
})();