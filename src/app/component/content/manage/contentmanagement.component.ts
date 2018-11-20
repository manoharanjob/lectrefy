import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Content } from '../../../model/content';
import { ContentService } from '../../../service/content.service';
import { StaticDataConst } from 'src/app/constant/staticdata.constant';

@Component({
  selector: 'app-contentmanagement',
  templateUrl: './contentmanagement.component.html',
  styleUrls: ['./contentmanagement.component.css']
})
export class ContentManagementComponent implements OnInit {

  // displayedColumns: string[] = ['title', 'uploaderBrand', 'digitalAgency', 'status', 'description', 'actions'];
  displayedColumns: string[] = ['title', 'status', 'digitalAgency', 'uploadedDate', 'description', 'actions'];
  contentDataValues: Content;
  dataSource: MatTableDataSource<Content>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public router: Router, private contentService: ContentService) { 

  }

  ngOnInit() {
    this.getContents(StaticDataConst.getUserId());
  }

  createContent(){
    this.router.navigateByUrl('content/create');
  }

  getContents(userId){
    this.contentService.getContents(userId).subscribe((data:any) => {
      console.log(data);
      if(data){

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;  
      }
    });
  }
}
