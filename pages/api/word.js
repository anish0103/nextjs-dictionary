// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const wordData = JSON.parse(req.body)
  const response = await fetch(`https://od-api.oxforddictionaries.com/api/v2/words/en-gb?q=${wordData.word}`,
      {
        method: 'GET',
        headers: {
          'app_id': '744b9852',
          'app_key': 'f244c5e5828e37a779d60661812844dc'
        }
      })
    const data = await response.json()
    if (!response.ok) {
      return res.status(404).json({ message: `Information related to ${wordData.word} does not exist!` })
    }
    res.status(200).json({ data: data })
}
