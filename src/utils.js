export const rand = n => Math.floor(Math.random() * n)

// Return the [min, max] of an array of numbers
export const minmax = (arr) => [Math.min(...arr), Math.max(...arr)]

// check if value v is between [a,b]
export const between = (a,b,v) => v >= a && v <= b

// Pluck a random item from array
export const pluck = arr => arr[rand(arr.length)]

// Return total wordcount in song
export const wordcount = song => song?.lyrics.join().split(/\s/).length

// Convert a string to sentence case, handling any leading non-word characters
export const capitalise = w =>
	w.replace(/^(\W*)(\w)/, s => (s[1] ? s[0] : "") + (s[1] || s[0]).toUpperCase() )

// Format array of songlines into punctuated sentences
export const format = a =>
	a.map((str, i) => {
		if (i === a.length - 1) str.replace(/[,;]$/, ".")
		return str.match(/[^,!?:;\.(\.”)(\.")]$/) ? `${str}.` : str
	})
	.join(" ")

export const punctuate = str => {
	const end = str[str.length - 1]

	if (end.match(/[\w’”\)]/))
		str += "."
	else if (end.match(/[,‘“:;'"-\s]/))
		str = str.slice(0, str.length - 1) + "."

	return str
}
