const remoteURL = "https://standup-jyrny-jyrnyl.on-render.com/api/"

export default {

    get(id) {
        return fetch (`${remoteURL}/users/${id}`)
        .then(event => event.json())
    },

    createNewUser(user) {
        return fetch (`${remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(results => results.json()) 

    }
}
