# LIRI Bot

### Overview

This node Liri.js bot runs from the command line and acts as a Siri-esque personal assistant. It uses Spotify, Bands In Town, and OMDb APIs to request information, which is done through the node package axios, and the Moment package to format the time as "MM/DD/YYYY".

### Modes

## concert-this

The liri.js bot can request information in one of two ways. If no search query is supplied by the user, "Ariana Grande" is the default query. A user may enter optionally enter in a search term and have the Bands In Town API pull up relevant information on them instead. The following information is supplied from this command:

1. Name of artist
2. Name of concert venue
3. Venue location
4. Date of the concert ("MM/DD/YYY")

	* node liri.js concert-this [optional artist]

## spotify-this-song

Much like the concert-this functionality, the Spotify API is called upon to provide information about a song, either "The Sign" by Ace of Base, or a user supplied argument. The following information is supplied by this command: 

1. Artist name
2. Song name
3. Spotify URL
4. Song album

	* node liri.js spotify-this-song [optional artist]

## movie-this

This time the Open Movie Database API will be called via axis to provide information about a user requested movie. If no movie is provided, the default is "Mr Nobody". The following information is supplied by this command: 

1. Movie title
2. Year of release
3. IMDB rating
4. Rotten Tomato score
5. Country of production
6. Language(s)
7. Plot synopsis
8. Actors in the movie

	* node liri.js movie-this [optional movie]

## do-what-it-says

Rather than taking in a search query from the command line by the user, the liri bot will read from a "random.txt" file in the root directory and run whatever commands are written in it and provide the relevant information based on the command supplied. The format of the text document must be as follows:
	* [command],"[search-query]"
	* ex: spotify-this-song,"I Want it That Way"

Invocation from the command line is as follows:
	* node liri.js do-what-it-says