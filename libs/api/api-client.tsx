import Axios from 'axios'

class Api {
  axios = Axios.create()
}

const api = new Api()

export default api
