import { createSlice } from "@reduxjs/toolkit";

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    offers: [],
    offersCount: null,
    offersMaking: [],
    offersCate: [],
    loading: false,
    isOfferCreated: false,
    offer: null,
    views: [],
  },

  reducers: {
    setOffers(state, action) {
      state.offers = action.payload;
    },
    setOffersCount(state, action) {
      state.offersCount = action.payload;
    },

    setOffersCate(state, action) {
      state.offersCate = action.payload;
    },
    setOffersMaking(state, action) {
      state.offersMaking = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsOfferCreated(state) {
      state.isOfferCreated = true;
      state.loading = false;
    },
    clearIsOfferCreated(state) {
      state.isOfferCreated = false;
    },
    setOffer(state, action) {
      state.offer = action.payload;
    },
    acceptOffer(state, action) {
      state.offer = action.payload;
    },
    isHighlited(state, action) {
      state.offer = action.payload;
    },
    isTop(state, action) {
      state.offer = action.payload;
    },
    booking(state, action) {
      state.offer = action.payload;
    },
    setView(state, action) {
      state.views = action.payload.views;
    },
    deleteOffer(state, action) {
      state.offers = state.offers.filter((p) => p._id !== action.payload);
    },
  },
});

const offerReducer = offerSlice.reducer;
const offerActions = offerSlice.actions;
export { offerActions, offerReducer };
