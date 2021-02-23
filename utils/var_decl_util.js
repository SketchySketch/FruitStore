function compValList(valList, vars) {
	let res = 0;
	let arr = valList.split(", ")
	arr.pop()
	for (let i of arr) {
		let j = i.split(" ");
		if (j[0] == "a") j[0] = "1";
		j[0] = parseInt(j[0]);
		res += vars[j[1]] * j[0];
	}
	return res;
}

module.exports = {
	compValList: compValList,
}
