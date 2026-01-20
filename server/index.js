import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Form submission endpoint
app.post('/api/request-form', (req, res) => {
  try {
    const { fullName, email, phone, serviceType, formType } = req.body

    // Basic validation
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      })
    }

    // TODO: Validate with SendGrid, save to database, etc.
    console.log(`Form submission received: ${formType}`, {
      fullName,
      email,
      phone,
      serviceType,
    })

    res.json({
      success: true,
      message: 'Form submitted successfully',
      id: `form-${Date.now()}`,
    })
  } catch (error) {
    console.error('Form submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
