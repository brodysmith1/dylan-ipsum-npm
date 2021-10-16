# dylan-ipsum-npm
A JavaScript module for generating placeholder text from Bob Dylan lyrics.

Bob's catalogue has 136,392 words, 520 mentions of love, 52 mentions of law, and 5 mentions of ... country pie.

If you're just after some quick filler text without adding another package to your project, consider using the project site instead: [https://www.dylanlyrics.app/](https://www.dylanlyrics.app/)

To show some ❤️ for this project, let's grab [a coffee](https://www.buymeacoffee.com/brods).

Enjoy!

## Install
```
npm i dylan-ipsum
```

## Usage
```
import DylanIpsum from "dylan-ipsum"

// Default settings
const bob = new DylanIpsum()

// Custom settings
const bob2 = new DylanIpsum({
  years: [1963, 1967],
  phraseLength: [10, 20],
  paragraphLength: [100, 150]
})

bob.words(3)        // ["Ramble", "Highway", "Wiggle"]
bob.phrases(2)      // ["With no direction home", "Purple clover, Queen Anne’s lace"]
bob.paragraphs(1)   // ["I’m sailin’ away my ... across that lonesome ocean."]
```

You can also override default lengths on a function call:
```
bob.phrases(5, [10, 20])  // 5 phrases between 10–20 words
bob.paragraphs(7, 120)    // 7 paragraphs of exactly 120 words
```


## Functions

The `DylanIpsum` class contains 3 functions. Each return an array of _n_ length:

- `bob.words(n)` – A capitalised word. Good for menu items and small lists.
- `bob.phrases(n)` – A single line. Good for lists, titles and taglines.
- `bob.paragraphs(n)` – A block of lyrics. Good for body content.


## Options

All options are [min, max] arrays. A single value can also be provided.

The values for `paragraphLength` and `phraseLength` denote word count.

Default values shown below.

```
const options = {
  "paragraphLength": [50, 200],
  "phraseLength": [3, 15],
  "years": [1962, 2020]
}
```
