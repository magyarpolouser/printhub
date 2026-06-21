import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { AccountPage } from "./pages/AccountPage";
import { ArtistPortalPage } from "./pages/ArtistPortalPage";
import { LoginPage } from "./components/LoginPage";
import { ProductPage } from "./pages/ProductPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ContactPage } from "./pages/ContactPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "shop", Component: ShopPage },
      { path: "cart", Component: CartPage },
      { path: "account", Component: AccountPage },
      { path: "artist-portal", Component: ArtistPortalPage },
      { path: "product/:id", Component: ProductPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "contact", Component: ContactPage },
      { path: "terms", Component: TermsPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "login", Component: LoginPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
