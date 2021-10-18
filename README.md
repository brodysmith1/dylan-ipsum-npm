# dylan-ipsum-npm
A JavaScript module for generating placeholder text from Bob Dylan lyrics.

Bob's catalogue has 136,392 words, 520 mentions of love, 52 mentions of law, and 5 mentions of ... country pie.

If you're just after some quick filler text without adding a package to your project, consider using the pretty app instead: [https://www.dylanlyrics.app/](https://www.dylanlyrics.app/)

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
  titleLength: [5, 10],
  phraseLength: [10, 20],
  paragraphLength: [100, 150]
})

bob.words(4)        // ["Ramble", "Highway", "Wiggle", "Mama"]
bob.titles(3)       // ["Hurricane", "Masters of War, New Morning"]
bob.phrases(2)      // ["With no direction home", "Purple clover, Queen Anne’s lace"]
bob.paragraphs(1)   // ["I’m sailin’ away my own true love. I'm sailing away in the morning ..."]
```

You can also override default lengths on a function call:
```
bob.titles(3, [3, 4])     // 3 titles of 3 or 4 words
bob.phrases(5, [10, 20])  // 5 phrases between 10–20 words
bob.paragraphs(7, 120)    // 7 paragraphs of exactly 120 words
```


## Functions

The `DylanIpsum` class contains 4 functions. Each return an array of _n_ length:

- `bob.words(n)` – A capitalised word. Good for menu items and small lists.
- `bob.titles(n)` – A song title. Good for titles, lists, names.
- `bob.phrases(n)` – A single line. Good for lists, quotes, attributes.
- `bob.paragraphs(n)` – A block of lyrics. Good for body content.


## Options

All options are [min, max] arrays. A single value can also be provided.

The values for `paragraphLength` and `phraseLength` denote word count.

Default values shown below.

```
const options = {
  "paragraphLength": [50, 200],
  "phraseLength": [3, 15],
  "titleLength": [1, 14],
  "years": [1962, 2020]
}
```
