import app from './app'
import './database'

const PORT = 35005

app.listen(PORT,'0.0.0.0')

console.log('Server listen on port '+PORT)