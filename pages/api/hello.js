// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from '../../config/db'

const handler = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW()')
    console.log(rows[0]['NOW()'])
    return res.status(200).json({ date: rows[0]['NOW()'] })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data', desc: err })
  }
}

export default handler