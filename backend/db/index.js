import mysql from 'mysql2'
import ApiError from '../utils/ApiError.js'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
<<<<<<< HEAD
  password: '',
=======
  password: 'Chinmay@1824',
>>>>>>> c0a12aa87d818656b227f26b125df14720c45c7e
  database: 'aakarerp',
})

connection.connect((err) => {
  if (err) {
    console.log(new ApiError(500, 'Database connection failed.'))
    process.exit(1)
  } else {
    console.log('Connected to database as ID: ' + connection.threadId)
  }
})

export { connection }
