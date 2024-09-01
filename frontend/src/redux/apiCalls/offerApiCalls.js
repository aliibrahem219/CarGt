import { offerActions } from "../slices/offerSlice";

import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch Posts Based on Page Number
export function fetchOffers(pageNumber, userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `api/offer?userId=${userId}&pageNumber=${pageNumber}`
      );

      dispatch(offerActions.setOffers(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
export function fetchOffersSearch(searchQuery) {
  return async (dispatch) => {
    try {
      console.log(searchQuery);
      const { data } = await request.get(`/api/offer/search?${searchQuery}`);

      dispatch(offerActions.setOffers(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Fetch Offers by its owner
export function fetchOffersByOwner(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/offer?userId=${userId}`);
      dispatch(offerActions.setOffers(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Get Offers User Count
export function getOffersUserCount(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/offer/count?userId=${userId}`);

      dispatch(offerActions.setOffersCount(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Get Offers Count
export function getOffersCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/offer/count`);

      dispatch(offerActions.setOffersCount(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Fetch Offers Based on Category
export function fetchOffersBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/offer?category=${category}`);
      dispatch(offerActions.setOffersCate(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}
//Fetch Offers Based on Making Company
export function fetchOffersBasedOnMakingCompany(makingCompany) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/offer?makingCompany=${makingCompany}`
      );
      dispatch(offerActions.setOffersMaking(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}
//Create offer
export function createOffer(newOffer) {
  return async (dispatch, getState) => {
    try {
      dispatch(offerActions.setLoading());
      await request.post(`/api/offer`, newOffer, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(offerActions.setIsOfferCreated());
      setTimeout(() => {
        dispatch(offerActions.clearIsOfferCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
      dispatch(offerActions.clearLoading());
    }
  };
}

//Fetch Single offer
export function fetchSingleOffer(offerId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/offer/${offerId}`);

      dispatch(offerActions.setOffer(data));
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}

//Update Offer Image
export function updateOfferImage(newImage, offerId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/offer/update-image/${offerId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-type": "multipart/form-data",
        },
      });
      toast.success("New Image Uploaded Successfully");
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Update Offer
export function updateOffer(newOffer, offerId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/offer/${offerId}`, newOffer, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(offerActions.setOffer(data));
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Delete Offer
export function deleteOffer(offerId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/offer/${offerId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(offerActions.deleteOffer(data.offerId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Get All Offers

export function getALLOffers() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/offer`);

      dispatch(offerActions.setOffers(data));
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Get All Offers Admin

export function getALLOffersAdmin() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/offer/admin`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(offerActions.setOffers(data));
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Accept Offer

export function acceptOffer(offerId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/offer/accept/${offerId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(offerActions.acceptOffer(data));
      toast.success("The offer accepted , it will be showen on the main page");
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Accept Offer

export function isHighlited(offerId, hightlighting) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/offer/highlighted/${offerId}`,
        { hightlighting: hightlighting },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(offerActions.isHighlited(data));

      toast.success(
        `The offer will be ${
          hightlighting ? "hightlighting" : `un hightlighting`
        } in main page`
      );
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Accept Offer

export function isTop(offerId, top) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/offer/top/${offerId}`,
        { top: top },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(offerActions.isTop(data));
      toast.success(`The offer will be ${top ? "top" : `un top`} in main page`);
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
//Toggle Views Offer
export function toggleViewsOffer(offerId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/offer/view/${offerId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(offerActions.setView(data));
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
export function bookingOffer(offerId, booking) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/offer/booking/${offerId}`,
        { booking: booking },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(offerActions.booking(data));
      toast.success(
        `The offer will ${
          booking === 2 || booking === 1 ? "book" : "un book"
        } ${booking === 1 ? "after owner accepting" : ""}`
      );
    } catch (error) {
      toast.error(error.response.data?.message);

      console.log(error.message);
    }
  };
}
