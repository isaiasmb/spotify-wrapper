import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { API_URL } from '../src/config'
import SpotifyWrapper from '../src/index'

chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('Album', () => {
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
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist
    })

    it('should have getTracks method', () => {
      expect(spotify.album.getTracks).to.exist
    })

    describe('getAlbum', () => {
      it('should call fetch method', () => {
        const albums = spotify.album.getAlbum()
        expect(fetchedStub).to.have.been.calledOnce
      })

      it('should call fetch with the correct URL', () => {
        const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`)

        const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk')
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTk`)
      })

      it('should return the correct data from Promise', () => {
        const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
        album.then(data => {
          expect(data).to.be.eql({ album: 'name' }) // Entender pq o teste fica verde mesmo com um erro de assertion
        })
      })
    })

    describe('getAlbums', () => {
      it('should call fetch method', () => {
        const albums = spotify.album.getAlbums()
        expect(fetchedStub).to.have.been.calledOnce
      })

      it('should call fetch with the correct URL', () => {
        const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk'])
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk`)
      })

      it('should return the correct data from Promise', () => {
        const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk'])
          .then(data => {
            expect(data).to.be.eql({ album: 'name' })
          })
      })
    })

    describe('getTracks', () => {
      it('should call fetch method', () => {
        const tracks = spotify.album.getTracks()
        expect(fetchedStub).to.have.been.calledOnce
      })

      it('should call fetch with the correct URL', () => {
        const tracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy')
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`)
      })

      it('should return the correct data from Promise', () => {
        const tracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy')
          .then(data => {
            expect(data).to.be.eql({ album: 'name' })
          })
      })
    })
  })
})
