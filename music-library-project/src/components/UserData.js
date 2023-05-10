const sessionUserKey = "userInfo"
const sessionAlbumsKey = "userAlbums"
const sessionSongsKey = "userSongs"
const sessionArtistsKey = "userArtists"
const storedUsersKey = "pro-music-lib-users";
const storedAlbumsKey = "pro-music-lib-albums";
const storedSongsKey = "pro-music-lib-songs";
const storedArtistsKey = "pro-music-lib-artists";

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
    },
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
    getAllUsers: () => {
        return getLocalData(storedUsersKey)
    },
    getAllAlbums: () => {
        return getLocalData(storedAlbumsKey)
    },
    getAllSongs: () => {
        return getLocalData(storedSongsKey)
    },
    getAllArtists: () => {
        return getLocalData(storedArtistsKey)
    },
    saveUserInfoLocally: (userData) => {
        let localData = getLocalData(storedUsersKey) === null? {}: getLocalData(storedAlbumsKey)
        localData[userData.username] = userData
        setLocalData(storedUsersKey, localData)
    },
    saveUserAlbumsLocally: (userAlbums) => {
        const userInfo = getData(sessionUserKey);
        let localData = getLocalData(storedAlbumsKey) === null? {}: getLocalData(storedAlbumsKey)
        if (userAlbums !== null)
            localData[userInfo.username] = userAlbums
        setLocalData(storedAlbumsKey, localData)
    },
    saveUserSongsLocally: (userSongs) => {
        const userInfo = getData(sessionUserKey);
        let localData = getLocalData(storedSongsKey) === null? {}: getLocalData(storedSongsKey)
        if (userSongs !== null)
            localData[userInfo.username] = userSongs
        setLocalData(storedSongsKey, localData)
    },
    saveUserArtistsLocally: (userArtists) => {
        const userInfo = getData(sessionUserKey);
        let localData = getLocalData(storedArtistsKey) === null? {}: getLocalData(storedArtistsKey)
        if (userArtists !== null)
            localData[userInfo.username] = userArtists
        setLocalData(storedArtistsKey, localData)
    }
}

export default Data;