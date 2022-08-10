import { type } from '@testing-library/user-event/dist/type'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { IFilter } from '../models/model'
import airportSlice from '../store/slices/airportSlice'

function AirportFilter() {
  const dispatch = useAppDispatch()
  const {regions, countries, loading, types} = useAppSelector(state => state.handbook)
  const [hasFilter, setHasFilter] = useState(false)
  const [filter, setFilter] = useState<IFilter>({
    type: '',
    region: '',
    country: ''
  })

  const isFilterEnabled = () => {
    return filter.type || filter.region || filter.country
  }

  useEffect(() => {
    if (isFilterEnabled()) {
      setHasFilter(true)
    } else {
      setHasFilter(false)
    }

    dispatch(airportSlice.actions.filter(filter))
  }, [filter])

  if (loading) return <p className='text-center'>Loading...</p>

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const clearFilter = () => {
    setFilter({
      type: '',
      region: '',
      country: ''
    })
  }

  return (
    <div className='border px-2 py-4 mb-2'>
      <span className='font-bold mr-2'>Filter</span>

      <select 
        name="type" 
        className='mr-2 border py-1 px-2'
        onChange={changeHandler}
        value={filter.type}
      >
        <option value="" disabled>Type</option>
        { types.map(t => <option key={t}>{t}</option>) }
      </select>

      <select 
        name="country" 
        className='mr-2 border py-1 px-2'
        onChange={changeHandler}
        value={filter.country}
      >
        <option value="" disabled>Country</option>
        { countries.map(c => <option key={c}>{c}</option>) }
      </select>

      <select 
        name="region" 
        className='mr-2 border py-1 px-2'
        onChange={changeHandler}
        value={filter.region}
      >
        <option value="" disabled>Region </option>
        { regions.map(r => <option key={r}>{r}</option>) }
      </select>

      <button onClick={clearFilter} className='py-1 px-4 bg-red-700 text-white rounded-md mr-4'>&times;</button>
    </div>
  )
}

export default AirportFilter