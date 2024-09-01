import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import OffersPage from "./pages/offers-page/OffersPage";
import CreatePost from "./pages/create post/CreatePost";
import CreateOffer from "./pages/create offer/CreateOffer";
import PostDetails from "./pages/post-details/PostDetails";
import OfferDetails from "./pages/offer-details/OfferDetails";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import Footer from "./Components/footer/Footer";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/Admin/UsersTable";
import PostsTable from "./pages/Admin/PostsTable";
import CategoriesTable from "./pages/Admin/CategoriesTable";
import CommentsTable from "./pages/Admin/CommentsTable";
import ForgetPassword from "./pages/forms/ForgetPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not found/NotFound";
import Search from "./pages/search/Search.jsx";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import OffersTable from "./pages/Admin/OffersTable.jsx";
import WaitingOffers from "./pages/waiting offers/WaitingOffers.jsx";
import WaitingOffersTable from "./pages/Admin/WaitingOffersTable.jsx";
import WaitingPosts from "./pages/waitingposts/WaitingPosts.jsx";
import WaitingPostsTable from "./pages/Admin/WaitingPostsTable.jsx";
import CarsMakeCompaniesTable from "./pages/Admin/CarsMakeCompaniesTable.jsx";
import CarsCategoriesTable from "./pages/Admin/CarsCategoriesTable .jsx";
import CarCategory from "./pages/car category/CarCategory.jsx";
import MakingCompany from "./pages/making company/MakingCompany.jsx";
import AbousUs from "./Components/header/AbousUs.jsx";
function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter className="App">
      <ToastContainer theme="colored" position="top-center" />
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/forget-password"
          element={<ForgetPassword></ForgetPassword>}
        ></Route>
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/profile/:id" element={<Profile></Profile>}></Route>
        {/************ */}
        <Route path="posts">
          <Route index element={<PostsPage></PostsPage>} />
          <Route
            path="create-post"
            element={user ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route
            path="accept-posts"
            element={user ? <WaitingPosts /> : <Navigate to="/" />}
          ></Route>
          <Route path="details/:id" element={<PostDetails></PostDetails>} />
          <Route path="categories/:category" element={<Category />} />
        </Route>
        {/*** */}
        <Route path="offers">
          <Route index element={<OffersPage></OffersPage>} />
          <Route
            path="accept-offers"
            element={user ? <WaitingOffers /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="create-offer"
            element={user ? <CreateOffer /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<OfferDetails />} />
          <Route path="categories/:category" element={<CarCategory />} />
          <Route path="companies/:makingCompany" element={<MakingCompany />} />
        </Route>
        {/** */}
        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashBoard /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="waiting-posts-table"
            element={
              user?.isAdmin ? <WaitingPostsTable /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="cars-categories-table"
            element={
              user?.isAdmin ? <CarsCategoriesTable /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="offers-table"
            element={user?.isAdmin ? <OffersTable /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="waiting-offers-table"
            element={
              user?.isAdmin ? <WaitingOffersTable /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="make-companies-table"
            element={
              user?.isAdmin ? <CarsMakeCompaniesTable /> : <Navigate to="/" />
            }
          ></Route>
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/about-us" element={<AbousUs />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
