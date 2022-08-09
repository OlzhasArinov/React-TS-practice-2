import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAirport } from "../../models/model"

interface AirportState {
    loading: boolean
    error: string
    count: number
    airports: IAirport[]
}

const initialState: AirportState = {
    loading: false,
    count: 0,
    error: '',
    airports: []
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
            state.count = action.payload.count
            state.error = ''
        },
        fetchError(state: AirportState, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default airportSlice.reducer