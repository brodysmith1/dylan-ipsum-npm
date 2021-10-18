import defaults from "../data/defaults.js"
import database from "../data/songs.js"
import * as RX from "./regex.js"
import {
  rand,
  pluck,
  format,
  minmax,
  between,
  punctuate,
  capitalise,
  wordcount
} from "./utils.js"

class DylanIpsum {
  
  constructor(options) {
    this.config = {...defaults}
    this.songs = this.validate(options)
    
    if (options) {
      let entries = Object.entries(options)
      for (const [k, v] of entries) this.config[k] = v
    }
  }
  
  paragraphs(n, range = this.config.paragraphLength) {
    let song, start, end, count, text
    let [min, max] = minmax(range, [10,400], "paragraph")
    
    let list = new Array(n).fill(0)
      .map(() => {  
        do {
          song = pluck(this.songs)
          count = wordcount(song)
        } while (count < min)
        
        // Pick random start and end indices
        start = count > max ? rand(count - max) : 0
        end = min + start + rand(max - min) + 1
        
        // Stringify and slice the lyrics
        text = format(song.lyrics.flat())
          .split(/\s/)
          .slice(start, end)
          .join(" ")
        
        // Tidy things up
        text = punctuate(capitalise(text))

        return text
      })
      
    return list
  }
  
  phrases(n, range = this.config.phraseLength) {
    let song, subset
    let [min, max] = minmax(range, [1,14], "phrase")

    let list = new Array(n).fill(0)
      .map(() => {
        do {
          song = pluck(this.songs)
          subset = song.lyrics.flat(2).filter((s) =>
            between(min, max, s.split(/\s/).length))
        } while (!subset.length)
        
        return pluck(subset)
      })

    return list
  }

  titles(n, range = this.config.titleLength) {
    let title
    let [min, max] = minmax(range, [1, 8], "title")

    let list = new Array(n).fill(0)
      .map(() => {
        do title = pluck(this.songs).title
        while (!between(min, max, title.split(/\s/).length))
        return title
      })

    return list
  }
  
  words(n) {
    let words, w
    let list = new Array(n).fill(0)
      .map(() => pluck(this.songs).lyrics)
      .map((l) => {
        words = l.join(" ").split(RX.WORD_BOUNDARIES)
        do w = pluck(words)
        while(w.length < 4 || w.match(RX.EXCLUDE))
        return w
      })
    
    return list
      .map(capitalise)
      .map(w => w.replace(RX.JUNK, "").replace(RX.NUMS, ""))
  }
  
  validate(options, list = database) {
    if (options?.years) {
      if (typeof options.years === "number")
        options.years = [options.years, options.years]

      list = list.filter(s =>
        between(options.years[0], options.years[1], s.year))

      if (!list.length) {
        console.error(
          `Dylan Ipsum: No songs found for specified years [${options.years}].`,
          `Using all available years [${defaults.years}]`
        )
        this.config.years = defaults.years
        list = database
      }
    }
    return list
  }

}

export default DylanIpsum
