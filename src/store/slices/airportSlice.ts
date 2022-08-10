import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAirport, IFilter } from "../../models/model"

interface AirportState {
    loading: boolean
    error: string
    count: number
    airports: IAirport[]
    airportsContainer: IAirport[]
}

const initialState: AirportState = {
    loading: false,
    count: 0,
    error: '',
    airports: [],
    airportsContainer: []
}

interface AirportPayload {
    airports: IAirport[],
    count: number
}

export const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        fetching(state: AirportState) {
            state.loading = true
        },
        fetchSuccess(state: AirportState, action: PayloadAction<AirportPayload>) {
            state.loading = false
            state.airports = action.payload.airports
            state.airportsContainer = action.payload.airports
            state.count = action.payload.count
            state.error = ''
        },
        fetchError(state: AirportState, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        },
        filter(state: AirportState, action: PayloadAction<IFilter>) {
            state.airports = state.airportsContainer
            .filter(a => a.type.includes(action.payload.type))
            .filter(a => a.region.includes(action.payload.region))
            .filter(a => a.country.includes(action.payload.country))
        }
    }
})

export default airportSlice.reducer