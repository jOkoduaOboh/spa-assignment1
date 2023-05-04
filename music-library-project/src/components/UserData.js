let userInfo = {}
let userAlbums = {}
let userSongs = {}
let userArtists = {}
const storedUsersKey = "pro-music-lib-users";
const storedAlbumsKey = "pro-music-lib-albums";
const storedSongsKey = "pro-music-lib-songs";
const storedArtistsKey = "pro-music-lib-artists";

// Deletion of item syntax
// delete userArtists.test2 // for object
// userArtists.test.splice(0, 1) // for array

const getUserAlbums = () => {
    return userAlbums;
}
const setUserAlbums = (albums) => {
    userAlbums = albums;
}

export { getUserAlbums, setUserAlbums }

const Data = {
    getUserInfo: () => {
        return userInfo;
    },
    getUserAlbums: () => {
        return userAlbums;
    },
    getUserSongs: () => {
        return userSongs;
    },
    getUserArtists: () => {
        return userArtists;
    },
    setUserInfo: (info) => {
        userInfo = info;
    },
    setUserAlbums: (albums) => {
        userAlbums = albums;
    },
    setUserSongs: (songs) => {
        userSongs = songs;
    },
    setUserArtists: (artists) => {
        userArtists = artists;
    },
}

export default Data;