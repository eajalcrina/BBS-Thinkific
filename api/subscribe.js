export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, country, plan } = req.body

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
          COUNTRY: country,
          PLAN: plan
        },
        listIds: [2],
        updateEnabled: true
      })
    })

    if (!response.ok) {
      const error = await response.json()
      return res.status(400).json({ error })
    }

    return res.status(200).json({ success: true })

  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
}
