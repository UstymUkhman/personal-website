let routes = [
  '/',
  '/about',
  '/works',
  '/contacts',
  '/more',
  '/hole',
  '/experiments'
]

const experiments = require('../src/assets/data/experiments.json')

for (let i = 0; i < experiments.length; i++) {
  routes.push(`/experiments/${experiments[i].route}`)
}

routes.push('/experiments/ColorGrading')
routes.push('/experiments/FaceTracking')
module.exports = routes
