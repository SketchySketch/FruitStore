# Get Started

Ugly online compiler can be found [here](https://fruit-store-lang.vercel.app). Open it and start coding!

OK, ready to open the fruit store? Run this one:

```
Open the fruit store!
Sell cherry at price 15.
Show our cherry!
Close the store please!
```

And hit _RUN_... Yay! Your first program in Fruit Store!

# Syntax

This language is case-insensitive.

A valid Fruit Store program should always start with `Open the fruit store!`.

A valid statement should always be in only 1 line, and end with `.` or `!`. For simplicity they'll be ended in `!` in this doc. __Any invalid statement (except the starting line) will be treated as a no-op.__

All variables should only contain English alphabets.

## Variable Declaration

### Simple Declaration

`Sell <name> at price <value>!`

__e.g.__ `Sell cherry at price 5!`

### Complicated Declaration (Linear Combination)

`Bundle <list> as a <name>!`

where

`<list> = (<number> <name>, )*`

where

`<number> = a | ...(some number)...`

notice the whitespaces.

__e.g.__ `Bundle a cherry, 2 watermelon, as a cherrermelon!`

## Variable Transformation

### Negate

`We buy <name>!`

Turn `<name>` into a negative number, while absolute value remains the same.

### Positive

`We sell <name>!`

Similar to `We buy ...`, but turns it into a positive number.

### Division

`Divide <name> into <number_literal> pieces!`

Transform `<name>` into `<name>/<number_literal>`.

## Procedures (functions)

Procedures are super useful (and essential) for future updates: control sequences and loops.

### Definition

A procedure always starts with `Teach how to <proc_name> with <var_list>!`.

*proc_name* is the name of the procedure.

*var_list* is a list of parameters, split by `, `. Notice the whitespaces. __*The names of the parameters should differ from variable names, because they are discarded after procedure call.*__

A procedure ends with `The procedure ends!`.

### Calling

`Do "<proc_name>"!`pops expected number of values off from the stack and call the procedure. See section "Stack".

### Inside the procedure

Inside the procedure you can write everything, using outer variables and parameters.

Remember to __push the results into the stack, and discard the newly defined variables__, unless you know what you're doing. __WHY?__ Because there's _no return statements_, but _the stack is shared_ inside and outside the procedure call. This means, if you push a value into the stack, it'll be kept after the procedure ends, and you can then pop it. Also, _the variables is shared_ unless _the temporarily-created parameter variables will be discarded_. (See also section "Discarding", "Stack".) See the diagram below:

```
Open the fruit store!
Teach how to makeCake with egg, butter, flour, cream, strawberry.
	Bundle 2 egg, 1 butter, 10 flour, 1 cream, 5 strawberry, as a cake.
	Put cake onto the table.
	Throw away the cake!
The procedure ends.
Sell cherry at price 5.
Put cherry onto the table.
Put cherry onto the table.
Put cherry onto the table.
Put cherry onto the table.
Put cherry onto the table.  (stack: [5, 5, 5, 5, 5], vars: {cherry: 5})
Do "makeCake" with the things on the table!
			-----Behind the scene-----
							(popping)
							(stack: [5, 5, 5, 5], vars: {cherry: 5, egg: 5})
							(stack: [5, 5, 5], vars: {cherry: 5, egg: 5, butter: 5})
							(stack: [5, 5], vars: {cherry: 5, egg: 5, butter: 5, flour: 5})
							(stack: [5], vars: {cherry: 5, egg: 5, butter: 5, flour: 5, cream: 5})
							(stack: [], vars: {cherry: 5, egg: 5, butter: 5, flour: 5, cream: 5, strawberry: 5})
				
				Bundle 2 egg, 1 butter, 10 flour, 1 cream, 5 strawberry, as a cake.
							(stack: [], vars: {cherry: 5, egg: 5, butter: 5, flour: 5, cream: 5, strawberry: 5, cake: 95})
				Put cake onto the table.
							(stack: [95], vars: {cherry: 5, egg: 5, butter: 5, flour: 5, cream: 5, strawberry: 5, cake: 95})
				Throw away the cake!
							(stack: [95], vars: {cherry: 5, egg: 5, butter: 5, flour: 5, cream: 5, strawberry: 5, cake: undefined})

							(discard parameters)
							(stack: [95], vars: {cherry: 5, egg: undefined, butter: undefined, flour: undefined, cream: undefined, strawberry: undefined, cake: undefined})
Grab allCherryCake from the table!
							(stack: [], vars: {cherry: 5, egg: undefined, butter: undefined, flour: undefined, cream: undefined, strawberry: undefined, cake: undefined, allCherryCake: 95})
Show our allCherryCake!
Close the store please!
```

## Discarding

### Discard all

`Discard everything!`

This resets `vars` to `{}`.

### Discard a variable

`Throw away the <var_name>!`

This sets `vars[var_name]` to `undefined`. __WHY?__ Because all uninitialized variables in JS is `undefined`.

## Stacks

Procedures accepts parameters. The parameters should be first pushed into a stack.

`Put <var_name> outo the table!`

When calling a procedure, expected number of variables will be poped out.

### Other usages

The stack is shared __over the whole program__. Push a value into the stack inside a procedure will allow you to pop them out after procedure call.

`Grab <var_name> from the table!` pops a value from the stack and name it `var_name`.

## Terminating Program

### Ending

`Close the store please!` terminates the program.

### Error Throwing

This statement is special: It doesn't have to end with `!` or `.`. RegEx for this:

```
^[ \t]*[Ee]mergency close! .*$
```

`Emergency close! <reason>` throws an error: `new Error(reason)`.

## Control sequences

### IF_NEG, IF_POS, IF_ZERO

`Do we buy <var_name>? If so, do "<proc_name>"!`. Check if `var_name < 0`, and if so, call procedure `proc_name`.

`Do we sell <var_name>? If so, do "<proc_name>"!`. Check if `var_name > 0`, and if so, call procedure `proc_name`.

`is <var_name> free? If so, do "<proc_name>"!`. Check if `var_name == 0`, and if so, call procedure `proc_name`.
