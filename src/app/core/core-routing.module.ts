import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../system/home/home.component';
import { AboutUsComponent } from '../system/about-us/about-us.component';
import { ContactUsComponent } from '../system/contact-us/contact-us.component';
import { ShopComponent } from '../system/shop/shop.component';
import { LoginComponent } from '../system/user/login/login.component';
import { SignupComponent } from '../system/user/signup/signup.component';
import { LogoutComponent } from '../system/user/logout/logout.component';
import { CartComponent } from '../system/cart/cart.component';
import { CheckOutComponent } from '../system/check-out/check-out.component';
import { BuyComponent } from '../system/buy/buy.component';
import { ProductComponent } from '../system/product/product.component';
import { ProfileComponent } from '../system/profile/profile.component';
import { SearchComponent } from '../system/search/search.component';
import { OrderViewComponent } from '../system/order-view/order-view.component';
import { ForgetPasswordComponent } from '../system/user/forget-password/forget-password.component';
import { ShippingAndDeliveryComponent } from '../system/information/shipping-and-delivery/shipping-and-delivery.component';
import { PrivacyPolicyComponent } from '../system/information/privacy-policy/privacy-policy.component';
import { CancellationAndRefundComponent } from '../system/information/cancellation-and-refund/cancellation-and-refund.component';
import { TermsAndConditionComponent } from '../system/information/terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'product', component: ProductComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: ProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: 'vieworder', component: OrderViewComponent },
  { path: 'shipping', component: ShippingAndDeliveryComponent },
  { path: 'priacypolicy', component: PrivacyPolicyComponent },
  { path: 'cancellation', component: CancellationAndRefundComponent },
  { path: 'termscondition', component: TermsAndConditionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
