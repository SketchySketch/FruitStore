var func = {
	arrToPos: (arr) => `ln ${arr[0]} col ${arr[1]}`,
};
var EXC = {
	EXC_ILL_START: (pos = "ln 0 col 0") =>
		new SyntaxError(`Illegal starting line at ${pos}`),
	EXC_ILL_SYN: (pos) => new SyntaxError(`Illegal syntax at ${pos}`),
	EXC_PLU: (pos) => new SyntaxError(`You shouldn't use plural at ${pos}`),
	EXC_SING: (pos) => new SyntaxError(`You shouldn't use single at ${pos}`),
};
