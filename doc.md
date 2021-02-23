# Syntax

This language is case-insensitive.

A valid Fruit Store program should always start with `Open the fruit store!`.

A valid statement should always be in only 1 line, and end with `.` or `!`.

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
