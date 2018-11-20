import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { HeadderComponent } from './component/header/headder.component';
import { CampaignManagementComponent } from './component/campaign/manage/campaignmanagement.component';
import { CreateCampaignComponent } from './component/campaign/create/createcampaign.component';
import { EditCampaignComponent } from './component/campaign/edit/editcampaign.component';
import { ListContentComponent } from './component/campaign/listcontent/listcontent.component';
import { MapContentComponent } from './component/campaign/mapcontent/mapcontent.component';
import { InventoryManagementComponent } from './component/inventory/manage/inventorymanagement.component';
import { PrimeTimeComponent } from './component/inventory/listcampaign/primetime.component';
import { MapCampaignComponent } from './component/inventory/mapcampaign/mapcampaign.component';
import { ContentManagementComponent } from './component/content/manage/contentmanagement.component';
import { CreateContentComponent } from './component/content/create/createcontent.component';
import { ImagecontentComponent } from './component/content/create/imagecontent/imagecontent.component';
import { FileUploadComponent } from './component/content/create/imagecontent/fileupload/fileupload.component';
import { MenuComponent } from './component/menu/menu.component';
// import { AuthgaurdGuard } from '../_gaurds/authgaurd.guard';

const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
    },
    { 
        path: 'login',
        component: LoginComponent
    },
    { 
        path: 'home',
        component: HomeComponent
    },
    {
        path:'campaign',
        component: HomeComponent,
        // canActivate: [AuthgaurdGuard],
        children:[
            {
                path:'',
                pathMatch:'full',
                redirectTo:'manage'
            },
            {
                path:'manage',
                component: CampaignManagementComponent
            },
            {
                path:'create',
                component: CreateCampaignComponent
            },
            {
                path:'edit',
                component:EditCampaignComponent
            },
            {
                path:'listcontent',
                component: ListContentComponent
            },
            {
                path:'mapcontent',
                component: MapContentComponent
            }   
        ]
    },
    {
        path:'inventory',
        component:HomeComponent,
        children:[
            {
                path:'',
                pathMatch:'full',
                redirectTo:'manage'
            },
            {
                path:'manage',
                component: InventoryManagementComponent
            },
            {
                path:'listcampaign',
                component:PrimeTimeComponent
            },
            {
                path:'mapcampaign',
                component:MapCampaignComponent
            }
        ]
    },
    {
        path:'content',
        component:   HomeComponent,
        children:[
            {
                path:'',
                pathMatch:'full',
                redirectTo:'manage'
            },
            {
                path:'manage',
                component: ContentManagementComponent
            },
            {
                path:'create',
                component:CreateContentComponent
            }
        ]
    }
    
];
  
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule {}

export const AppComponents = [
    LoginComponent,
    HomeComponent,
    HeadderComponent,
    MenuComponent,
    CampaignManagementComponent,
    CreateCampaignComponent,
    EditCampaignComponent,
    ListContentComponent,
    MapContentComponent,
    InventoryManagementComponent,
    PrimeTimeComponent,
    MapCampaignComponent,
    ContentManagementComponent,
    CreateContentComponent,
    ImagecontentComponent,
    FileUploadComponent
  ];
  