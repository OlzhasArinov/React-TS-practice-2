import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../axios"
import { useDebounce } from "../hook/debounce"
import { useInput } from "../hook/input"
import { IAirport, ServerResponse } from "../models/model"

function AirportSearch() {
  const input = useInput('')
  const [airports, setAirports] = useState<IAirport[]>([])
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  const debounced = useDebounce(input.value, 400)

  async function searchAirports() {
      const response = await axios.get<ServerResponse<IAirport>>(`airports`, {
        params: {
          search: debounced, 
          count: 10
        }
      })
      setAirports(response.data.results)
  }

  useEffect(() => {
    if (debounced.length > 3) {
      searchAirports().then(() => setDropdown(true))
    } else {
      setDropdown(false)
    }
    console.log('first')
  }, [debounced])

  return (
    <div className='mb-4 relative'>
        <input 
          type="text" 
          className='border py-2 px-4 outline-0 w-full h-[42px]'
          placeholder='Type something here ...'
          {...input}
        />

        {dropdown && <ul className="absolute left-0 right-0 top-[42px] h-[200px] shadow-md bg-white overflow-y-scroll">
          {
            airports.map(airport => (
              <li 
                key={airport.id}
                className='py-2 px-4 mb-2 hover:bg-gray-500 hover:transition-colors cursor-pointer hover:text-white'
                onClick={() => navigate(`/airport/${airport.id}`)}
              >
                {airport.name}
              </li>
            ))
          }
        </ul>}

    </div>
  )
}

export default AirportSearch