const remoteURL = "https://standup-jyrny-jyrnyl.on-render.com/api/"

export default {
  get(id) {
    return fetch(`${remoteURL}/venues/${id}`).then(result => result.json())
  },
  getAll(userId) {
    return fetch(`${remoteURL}/venues?userId=${userId}`).then(result => result.json())
  },

  post(newVenue) {
    return fetch(`${remoteURL}/venues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newVenue)
    }).then(data => data.json())
},

update(editedVenue) {
    return fetch(`${remoteURL}/venues/${editedVenue.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedVenue)
    }).then(data => data.json());
  },
  
    delete(id) {
      return fetch(`http://localhost:8088/venues/${id}`, {
          method: "DELETE"
      })
      .then(result => result.json())
    }

}
