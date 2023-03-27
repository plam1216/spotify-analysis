import { Pool } from 'pg'

// npm package 'pg' knows to search for environment variables
const pool = new Pool()

module.exports = {
    query: (text: any, params: any) => {
        return pool.query(text, params)
    },
}