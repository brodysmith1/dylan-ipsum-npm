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
    this.config = defaults
    this.songs = this.validate(options)
    
    if (options) {
      let entries = Object.entries(options)
      for (const [k, v] of entries) this.config[k] = v
    }
  }
  
  paragraphs(n, range = this.config.paragraphLength) {
    if (this.error) return this.warn()
    range = this.adjustRanges(range, this.config.paragraphLength)
    
    let song, start, end, count, text, last
    let [min, max] = minmax(range)

    let list = new Array(n).fill(0)
      .map(() => {
        
        do {
          song = pluck(this.songs)
          count = wordcount(song)
        } while (count < min)
        
        // Pick random start and end indices
        start = count > max ? rand(count - max) : 0
        end = min + start + rand(max - min)
        
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
    if (this.error) return this.warn()
    range = this.adjustRanges(range, this.config.phraseLength)
    
    let song, subset
    let [min, max] = minmax(range)

    let list = new Array(n).fill(0)
      .map(() => {
        do {
          song = pluck(this.songs)
          subset = song.lyrics.flat(2)
            .filter((s) => between(min, max, s.split(/\s/).length))
        } while (!subset.length)
        
        return pluck(subset)
      })

    return list
  }

  words(n) {
    if (this.error) return this.warn()
    
    let list = new Array(n).fill(0)
      .map(() => pluck(this.songs).lyrics)
      .map((l) => 
        pluck(l.join(" ").split(RX.WORD_BOUNDARIES)
          .map(w => w.replace(RX.JUNK, "").replace(RX.NUMS, ""))
          .filter(w => w.length > 3 && !w.match(RX.EXCLUDE))
          .map(capitalise)
        )
      )
    
    return list
  }
  
  validate(options, list = database) {
    if (options?.years) {
      if (typeof options.years === "number")
        options.years = [options.years, options.years]

      list = list.filter(s =>
        between(options.years[0], options.years[1], s.year))

      if (!list.length) {
        this.error = `No songs found in specified years: ${options.years}`
        this.warn()
      }
    }
    return list
  }
  
  adjustRanges(range, defaults) {
    if (typeof range === "number") range = [range, range]
    if (range.length === 1) range = [range[0], range[0]]
    
    if (range[1] < defaults[0]) {
      range[1] = defaults[0]
      console.warn("Targeted maximum out of range. Using smallest possible maximum ", `(${defaults[0]})`)
    }
    
    if (range[0] > defaults[1]) {
      range[0] = defaults[1]
      console.warn("Specified minimum out of range. Using largest possible minimum ", `(${defaults[1]})`)
    }
      
    return range
  }
  
  warn(fn) {
    if (fn) console.error("Could not execute ", fn)
    console.error("Error: ", this.error)
    return null
  }

}

export default DylanIpsum
