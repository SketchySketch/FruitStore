# Syntax

This language is case-insensitive.

A valid Fruit Store program should always start with `Open the fruit store!`.

A valid statement should always be in only 1 line, and end with `.` or `!`. For simplicity they'll be ended in `!` in this doc.

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

Similat as `We buy ...`, but turns it into a positive number.

### Division

`Divide <name> into <number_literal> pieces!`

Transform `<name>` into `<name>/<number_literal>`.

## Procedures (functions)

> Not completed yet

