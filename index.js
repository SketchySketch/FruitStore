var result = [];

function callProc(func, stack, funcs) {
	function fall() {
		let i = stack[0];
		stack = stack.slice(1);
		return i;
	}

	let map = func.varMap;
	let stmt = "Open the fruit store!\n" + func.stmt.join("\n");
	let param = {};
	for (i of map) param[i] = fall();
	let res = parse(stmt, param, stack, funcs);
	param = res.vars;
	stack = res.stack;
	for (i of map) param[i] = undefined;
	return { vars: param, stack: stack };
}

function parse(string, vars = {}, stack = [], funcs = {}) {
	function append(element) {
		stack = [element].concat(stack);
	}

	function fall() {
		let i = stack[0];
		stack = stack.slice(1);
		return i;
	}

	function store(val, name) {
		vars[name] = val;
	}

	function discard(name) {
		vars[name] = undefined;
	}

	function transform(name, func) {
		vars[name] = func(vars[name]);
	}

	function defFunc(name, stmt, matchGrp) {
		let list = matchGrp.var_list.split(", ");
		funcs[name] = {
			size: list.length,
			stmt: stmt,
			varMap: getMap(list),
		};
	}

	function output(val) {
		result.push(val);
	}

	let stmt = string.toLowerCase().split("\n");
	if (!stmt[0].match(/^[ \t\n]*open the fruit store[.!]$/))
		throw EXC.EXC_ILL_START();

	for (let i = 1; i < stmt.length; i++) {
		// // // // // // VAR DECL
		if (stmt[i].match(REGEX.VAR_DECL)) {
			let grp = stmt[i].match(REGEX.VAR_DECL).groups;
			if (grp.var_name_simp) store(grp.val_val, grp.var_name_simp);
			if (grp.var_name_comp)
				store(
					compValList(grp.val_list, vars),
					grp.var_name_comp
				);
		}

		// // // // // // VAR NEG
		else if (stmt[i].match(REGEX.VAR_NEG)) {
			let grp = stmt[i].match(REGEX.VAR_NEG).groups;
			transform(grp.var_name, (a) => -Math.abs(a));
		}

		// // // // // // VAR POS
		else if (stmt[i].match(REGEX.VAR_POS)) {
			let grp = stmt[i].match(REGEX.VAR_POS).groups;
			transform(grp.var_name, (a) => Math.abs(a));
		}

		// // // // // // VAR DIV
		else if (stmt[i].match(REGEX.VAR_DIV)) {
			let grp = stmt[i].match(REGEX.VAR_DIV).groups;
			transform(grp.var_name, (a) => a / parseInt(grp.divs));
		}

		// // // // // // DEF PROC
		else if (stmt[i].match(REGEX.DEF_PROC)) {
			let grp = stmt[i].match(REGEX.DEF_PROC).groups;
			let proc = getProc(stmt, i);
			defFunc(grp.proc_name, proc.stmt, grp);
			i = proc.index;
		}

		// // // // // // DISCARD
		else if (stmt[i].match(REGEX.DISCARD)) {
			let grp = stmt[i].match(REGEX.DISCARD).groups;
			discard(grp.var_name);
		}

		// // // // // // DISC_ALL
		else if (stmt[i].match(REGEX.DISC_ALL)) {
			vars = {};
		}

		// // // // // // PUSH_STACK
		else if (stmt[i].match(REGEX.PUSH_STACK)) {
			let grp = stmt[i].match(REGEX.PUSH_STACK).groups;
			append(vars[grp.var_name]);
		}

		// // // // // // POP_STACK
		else if (stmt[i].match(REGEX.POP_STACK)) {
			let grp = stmt[i].match(REGEX.POP_STACK).groups;
			store(fall(), grp.var_name);
		}

		// // // // // // !!IMPORTANT!! CALL_PROC
		else if (stmt[i].match(REGEX.CALL_PROC)) {
			let grp = stmt[i].match(REGEX.CALL_PROC).groups;
			let result = callProc(funcs[grp.proc_name], stack);
			vars = result.vars;
			stack = result.stack;
		}

		// // // // // // END_PROG
		else if (stmt[i].match(REGEX.END_PROG)) {
			break;
		}

		// // // // // // ERR_THROW
		else if (stmt[i].match(REGEX.ERR_THROW)) {
			let grp = stmt[i].match(REGEX.ERR_THROW).groups;
			throw new Error(grp.reason);
		}

		// // // // // // OUTPUT
		else if (stmt[i].match(REGEX.OUTPUT)) {
			let grp = stmt[i].match(REGEX.OUTPUT).groups;
			output(vars[grp.var_name]);
		}

		// // // // // // IF_NEG
		else if (stmt[i].match(REGEX.IF_NEG)) {
			let grp = stmt[i].match(REGEX.IF_NEG).groups;
			if (vars[grp.var_name] < 0) callProc(funcs[grp.proc_name], stack, funcs);
		}

		// // // // // // IF_POS
		else if (stmt[i].match(REGEX.IF_POS)) {
			let grp = stmt[i].match(REGEX.IF_POS).groups;
			if (vars[grp.var_name] > 0) callProc(funcs[grp.proc_name], stack, funcs);
		}

		// // // // // // IF_ZERO
		else if (stmt[i].match(REGEX.IF_ZERO)) {
			let grp = stmt[i].match(REGEX.IF_ZERO).groups;
			if (vars[grp.var_name] == 0) callProc(funcs[grp.proc_name], stack, funcs);
		}
	}
	return { vars: vars, stack: stack, funcs: funcs, result: result };
}
