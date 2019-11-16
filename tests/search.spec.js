import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import SpotifyWrapper from '../src/index'

import { API_URL } from '../src/config'

chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('Search', () => {
  let spotify
  let fetchedStub

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    })
    fetchedStub = sinon.stub(global, 'fetch')
    fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist
    })

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist
    })

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist
    })

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist
    })
  })

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      spotify.search.artists()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=artist`)

      const artists2 = spotify.search.artists('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=artist`)
    })
  })

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      spotify.search.albums()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=album`)

      const albums2 = spotify.search.albums('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=album`)
    })
  })

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      spotify.search.tracks()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=track`)

      const tracks2 = spotify.search.tracks('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=track`)
    })
  })

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      spotify.search.playlists()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.playlists('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=playlist`)

      const tracks2 = spotify.search.playlists('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=playlist`)
    })
  })

})
