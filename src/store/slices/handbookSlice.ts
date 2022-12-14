import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAirport, IAirportCountry, IAirportRegion, IAirportType } from "../../models/model"

interface HandbookState {
    loading: boolean
    types: IAirportType[]
    regions: IAirportRegion[]
    countries: IAirportCountry[]
}

const initialState: HandbookState = {
    loading: false,
    types: [],
    regions: [],
    countries: []
}

interface HandbookPayload {
    types: IAirportType[]
    regions: IAirportRegion[]
    countries: IAirportCountry[]
}

export const handbookSlice = createSlice({
    name: 'handbook',
    initialState,
    reducers: {
        fetching(state: HandbookState) {
            state.loading = true
        },
        fetchSuccess(state: HandbookState, action: PayloadAction<HandbookPayload>) {
            state.loading = false
            state.types = action.payload.types
            state.regions = action.payload.regions
            state.countries = action.payload.countries
        }
    }
})

export default handbookSlice.reducer