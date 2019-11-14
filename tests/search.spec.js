import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/search'

import { API_URL } from '../src/config'

chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('Search', () => {

  let fetchedStub

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist
    })

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist
    })

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist
    })

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist
    })

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist
    })
  })

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should receive the correct url to fetch', () => {
      context('Passing one type', () => {
        const artists = search('Incubus', 'artist')
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=artist`)

        const albums = search('Incubus', 'album')
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=album`)
      })

      context('passing more one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album'])
        expect(fetchedStub).to.have.been
          .calledWith(`${API_URL}/search?q=Incubus&type=artist,album`)
      })
    })

    it('should return the JSON Data from the Promise', () => {
      const artists = search('Incubus', 'artist')
      artists.then(data => {
        expect(data).to.be.eql({ album: 'name' })
      })
    })
  })

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      searchArtists()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=artist`)

      const artists2 = searchArtists('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=artist`)
    })
  })

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      searchAlbums()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=album`)

      const albums2 = searchAlbums('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=album`)
    })
  })

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      searchTracks()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=track`)

      const tracks2 = searchTracks('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=track`)
    })
  })

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      searchPlaylists()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = searchPlaylists('Incubus')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Incubus&type=playlist`)

      const tracks2 = searchPlaylists('Muse')
      expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Muse&type=playlist`)
    })
  })

})
