var REGEX = {
	VAR_DECL: /^[ \t]*(sell (?<var_name_simp>[a-z]+) at price (?<val_val>\d+)|(bundle (?<val_list>((a|\d+) [a-z]+, )+)as a (?<var_name_comp>[a-z]+)))[.!]$/,
	VAR_NEG: /^[ \t]*we buy (?<var_name>[a-z]+)[.!]$/,
	VAR_POS: /^[ \t]*we sell (?<var_name>[a-z]+)[.!]$/,
	VAR_DIV: /^[ \t]*divide (?<var_name>[a-z]+) into (?<divs>\d+) pieces[.!]$/,
	DEF_PROC: /^[ \t]teach how to (?<proc_name>[a-z]+) with (?<var_list>[a-z]+(, [a-z]+)*)[.!]$/,
	END_PROC: /^[ \t]*the procedure ends[.!]$/,
	PUSH_STACK: /^[ \t]*put (?<var_name>[a-z]+) onto the table[.!]$/,
	POP_STACK: /^[ \t]*grab (?<var_name>[a-z]+) from the table[.!]$/,
	DISCARD: /^[ \t]*throw away the (?<var_name>[a-z]+)[.!]$/,
	DISC_ALL: /^[ \t]*discard everything[.!]$/,
	END_PROG: /^[ \t]*close the store please[.!]$/,
	ERR_THROW: /^[ \t]*emergency close! (?<reason>.*)$/,
	CALL_PROC: /^[ \t]*do "(?<proc_name>[a-z]+)" with the things on the table[.!]$/,
	OUTPUT: /^[ \t]*show our (?<var_name>[a-z]+)[.!]$/,
};

module.exports = {
	REGEX: REGEX,
}