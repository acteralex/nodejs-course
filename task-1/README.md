# Caesar cipher CLI tool
***
**Caesar cipher CLI tool** is tool to encode/decode text from a file or an input by **[Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

CLI tool support 5 options (short alias and full name):
1. **-a, --action**: an action.
*Required*. Allow type is string — "encode" | "decode".
2. **-s, --shift**: a shift.
*Required*. Allow type is number — 1, 2, 3, ..., 25.
3. **-i, --input**: an input file
*Optional*. If it doesn't set, text will be taken from the *process.stdin*
4. **-o, --output**: an output file
*Optional*. If it doesn't set, text will be written to the *process.stdout*
5. **-h, --help**: show help


## Usage examples:

```bash
$ node caesar-cipher -h
```

***

```bash
$ node caesar-cipher --action encode --shift 1
```
> **Input:**
`abc`

> **Output:**
`zab`

***

```bash
$ node caesar-cipher --a decode --s 7 --i input.txt --o output.txt
```

> **input.txt**
> `This is secret. Message about "_" symbol!`

> **output.txt**
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`