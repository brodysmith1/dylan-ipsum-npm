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
import { DylanIpsum } from "dylan-ipsum"

const bob = new DylanIpsum()
const bob = new DylanIpsum({ years: 1962 })
const bob = new DylanIpsum({ years: [1962, 1970] })

bob.words(1)
bob.phrases(5)
bob.paragraphs(7)

// Instance-specific min/max
bob.phrases(5, [10,20])
bob.paragraphs(7, 120)
```

## Options

Default values shown below.

`paragraphLength` and `phraseLength` are [min, max] arrays denoting word count. A fixed value can also be provided.

```
const options = {
  paragraphLength: [5, 200],
  phraseLength: [2, 20],
  years: [1962, 2020]
}
```
