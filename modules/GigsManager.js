const remoteURL = "https://standup-jyrny-jyrnyl.on-render.com/api/"

export default {
  get(id) {
    return fetch(`${remoteURL}/gigs/${id}`).then(result => result.json())
  },
  getAll(userId) {
    return fetch(`${remoteURL}/gigs?userId=${userId}`).then(result => result.json())
  },


  post(newGig) {
    return fetch(`${remoteURL}/gigs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGig)
    }).then(data => data.json())
},

update(editedGig) {
    return fetch(`${remoteURL}/gigs/${editedGig.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedGig)
    }).then(data => data.json());
  },
  
    delete(id) {
      return fetch(`http://localhost:8088/gigs/${id}`, {
          method: "DELETE"
      })
      .then(result => result.json())
    }

}
