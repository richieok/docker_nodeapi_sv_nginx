import { connect } from 'mongoose'
import { DB_URI } from './initDB.js'
import { Worker } from './models/worker.js'

export const getWorkers = async (req, res) => {
    try {
        connect(DB_URI)
        const workers = await Worker.find({}).exec()
        return res.json(workers)
    } catch (error) {
        console.error("Error fetching workers:", error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}