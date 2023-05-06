const sessionUserKey = "userInfo"
const sessionAlbumsKey = "userAlbums"
const sessionSongsKey = "userSongs"
const sessionArtistsKey = "userArtists"
const storedUsersKey = "pro-music-lib-users";
// const storedAlbumsKey = "pro-music-lib-albums";
// const storedSongsKey = "pro-music-lib-songs";
// const storedArtistsKey = "pro-music-lib-artists";

// Deletion of item syntax
// delete userArtists.test2 // for object
// userArtists.test.splice(0, 1) // for array

const getData = (key) => {
    return JSON.parse(sessionStorage.getItem(key))
}

const setData = (key, val) => {
    sessionStorage.setItem(key, JSON.stringify(val));
}

const getLocalData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const setLocalData = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

const Data = {
    // session storage functions
    getLoggedIn: () => {
        return JSON.parse(getData("loggedin"));
    } ,
    getUserInfo: () => {
        return getData(sessionUserKey);
    },
    getUserAlbums: () => {
        return getData(sessionAlbumsKey);
    },
    getUserSongs: () => {
        return getData(sessionSongsKey);
    },
    getUserArtists: () => {
        return getData(sessionArtistsKey);
    },
    setLoggedIn: (val) => {
        setData("loggedin", val)
    },
    setUserInfo: (info) => {
        setData(sessionUserKey, info);
    },
    setUserAlbums: (albums) => {
        setData(sessionAlbumsKey, albums);
    },
    setUserSongs: (songs) => {
        setData(sessionSongsKey, songs);
    },
    setUserArtists: (artists) => {
        setData(sessionArtistsKey, artists);
    },
    //creation functions
    createUser: (firstName, lastName, username, password) => {
        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        return user
    },
    // local storage functions
    getAllUsers:() => {
        return getLocalData(storedUsersKey)
    },
    setAllUsers:(val) => {
        setLocalData(storedUsersKey, val)
    }
}

export default Data;

export {sessionUserKey, sessionAlbumsKey, sessionSongsKey, sessionArtistsKey,
        storedUsersKey}