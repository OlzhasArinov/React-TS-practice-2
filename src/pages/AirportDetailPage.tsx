import React from 'react'
import { useParams } from 'react-router-dom'

function AirportDetailPage() {
    const params = useParams<'id'>()

  return (
    <div>
        <h1>Airport {params.id}</h1>
    </div>
  )
}

export default AirportDetailPage