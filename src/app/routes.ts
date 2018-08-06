import {
    EventListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver
} from './events/index'

import { Error404Component } from './errors/404.component';
import { Routes } from '@angular/router'

export const appRoutes: Routes = [
    { path: "events", component: EventListComponent, resolve: { events: EventListResolver } },
    { path: "events/new", component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: "events/:id", component: EventDetailsComponent, canActivate: [EventRouteActivator] },
    { path: "404", component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'user', loadChildren: './user/user.module#UserModule' }
]
