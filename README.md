# dylan-ipsum-npm
A JavaScript module for generating passages of placeholder text from Bob Dylan lyrics. Project site: [https://www.dylanlyrics.app/](https://www.dylanlyrics.app/)

Bob's catalogue includes 136,392 words, 520 mentions of love, 52 mentions of law, and 5 mentions of ... country pie.

If you want to show some ❤️ for this project, let's have [a coffee](https://www.buymeacoffee.com/brods).

Enjoy!

## Install
```
npm i dylan-ipsum
```

## Usage
```
import DylanIpsum from "dylan-ipsum"

// Use default settings
const bob = new DylanIpsum()

// Specify custom settings
const bob2 = new DylanIpsum({
  years: [1962, 1970],
  phraseLength: 10,
  paragraphLength: [150, 200]
})

bob.words(3)        // ["Ramble", "Highway", "Wiggle"]
bob.phrases(2)      // ["Just take everything down to Highway 61", "Purple clover, Queen Anne’s lace"]
bob.paragraphs(1)   // ["I’m sailin’ away my own true love. I’m sailin’ away in ... across that lonesome ocean."]

// You can also specify instance-specific wordcount ranges
bob.phrases(5, [10, 20])  // 5 phrases between 10–20 words
bob.paragraphs(7, 120)    // 7 paragraphs of exactly 120 words
```

## Options

Default values are shown below.

`paragraphLength` and `phraseLength` are [min, max] arrays denoting word count. A single value can also be provided.

```
const options = {
  "paragraphLength": [50, 200],
  "phraseLength": [5, 15],
  "years": [1962, 2020]
}
```
