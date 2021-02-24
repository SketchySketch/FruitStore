function getProc(stmt, index) {
	let nest = 0;
	let oIndex = index;
	while (index < stmt.length) {
		if (stmt[index].match(REGEX.DEF_PROC)) nest += 1;
		if (stmt[index].match(REGEX.END_PROC)) nest -= 1;
		if (nest == 0)
			return { stmt: stmt.slice(oIndex + 1, index), index: index - 1 };
		index += 1;
	}
}

function getMap(varList) {
	let varMap = [];
	for (i in varList) varMap[parseInt(i)] = varList[i];
	return varMap;
}
