import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../service/product-service.service';
import { ProductDTO } from '../model/productModel';
import { FilesStorageImagenService } from '../service/files-storage-imagen.service';
import { HomeComponent } from "../home/home.component";
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    RouterLink, 
    RouterModule,
],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit{

  data : ProductDTO[] = [];
  imageUrls: { [key: string]: string } = {};

  constructor(
      private _productService : ProductServiceService,
      private _fileStorageImagen : FilesStorageImagenService,
  ){}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(){
    this._productService.getAllProduct().subscribe(res => {
      this.data = res;
      this.data.forEach(product => {
        if(product.productImagen){
          this.storeFile(product.productImagen);
        }
      })
      console.log(res);
    },
    error => {
      console.error('Error al obtener los productos', error);
    })
  }

  storeFile(imageName : string){
    this._fileStorageImagen.getImagenesFilesStorage(imageName).subscribe(res => {
      const url = URL.createObjectURL(res);
      this.imageUrls[imageName] = url;
    })
  }




}
