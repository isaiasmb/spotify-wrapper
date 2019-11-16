global.fetch = require('node-fetch')

import SpotifyWrapper from '../src/index'

const spotify = new SpotifyWrapper({
  token: 'BQDdABTywDRGOsNcAIzr8euigHy0qbFFi5hLFpI7hJg4PjhIF88OszwsDOZxyBjhMIGGjSqO0GaZATOBOUaHiiKgZSaF5p6SspcDP0WhLuqBPJg5wEPBnCtxFFN2mkvOEml9J_xH-9djzHuGKJovxA'
})

const albums = spotify.search.albums('Incubus')

albums.then(data => data.albums.items.map(item => console.log(item.name)))
