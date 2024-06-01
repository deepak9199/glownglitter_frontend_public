import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './system/contact-us/contact-us.component';
import { DefaultPageComponent } from './shared/default-page/default-page.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AboutUsComponent } from './system/about-us/about-us.component';
import { CartComponent } from './system/cart/cart.component';
import { ProfileComponent } from './system/profile/profile.component';
import { ShopComponent } from './system/shop/shop.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './system/user/login/login.component';
import { SignupComponent } from './system/user/signup/signup.component';
import { LogoutComponent } from './system/user/logout/logout.component';
import { CheckOutComponent } from './system/check-out/check-out.component';
import { BuyComponent } from './system/buy/buy.component';
import { ProductComponent } from './system/product/product.component';
import { firebaseConfig } from './shared/base_url/firebaseconfig';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './system/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './shared/loading/loading.component';
import { SearchComponent } from './system/search/search.component';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { OrderViewComponent } from './system/order-view/order-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImgPopUpComponent } from './shared/img-pop-up/img-pop-up.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ForgetPasswordComponent } from './system/user/forget-password/forget-password.component';
import { CancellationAndRefundComponent } from './system/information/cancellation-and-refund/cancellation-and-refund.component';
import { PrivacyPolicyComponent } from './system/information/privacy-policy/privacy-policy.component';
import { ShippingAndDeliveryComponent } from './system/information/shipping-and-delivery/shipping-and-delivery.component';
import { TermsAndConditionComponent } from './system/information/terms-and-condition/terms-and-condition.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    DefaultPageComponent,
    NavBarComponent,
    SideBarComponent,
    HomeComponent,
    AboutUsComponent,
    CartComponent,
    ProfileComponent,
    ShopComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    CheckOutComponent,
    BuyComponent,
    ProductComponent,
    LoadingComponent,
    SearchComponent,
    OrderViewComponent,
    ImgPopUpComponent,
    ForgetPasswordComponent,
    TermsAndConditionComponent,
    ShippingAndDeliveryComponent,
    PrivacyPolicyComponent,
    CancellationAndRefundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    MatDialogModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    CarouselModule,
  ],
  providers: [
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
