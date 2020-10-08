import { Routes } from '@angular/router';
import { LoginComponent} from "./components/login/login.component";
import { DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {MainComponent} from "./components/main/main.component";
import {AdminNewCustomerComponent} from "./components/admin-new-customer/admin-new-customer.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AdminTicketsComponent} from "./components/admin-tickets/admin-tickets.component";
import {AdminCustomerManagementComponent} from "./components/admin-customer-management/admin-customer-management.component";
import {RegisterComponent} from "./components/register/register.component";

export const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'order',
    component: OrdersComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'tickets',
    component: TicketsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'checkout/:pid',
    component: CheckoutComponent
  },
  {
    path: 'addCustomer',
    component: AdminNewCustomerComponent
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'adminTickets',
    component: AdminTicketsComponent
  },
  {
    path: 'customerManagement',
    component: AdminCustomerManagementComponent
  }
];
