const Mcdo = require('../')
const mcdo = new Mcdo()

async function init() {
  try {
    await mcdo.getAccessToken()
    await mcdo.getRestaurantDetails(12)
  } catch (err) {
    console.log(err)
  }
}

init()