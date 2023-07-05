import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allwishlistItem:any=[]

constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.getWishlist().subscribe((result:any)=>{
      console.log(result);
      this.allwishlistItem=result
      },
    (result:any)=>{ 
      console.log(result.error);
    })

    }

    deleteWishlist(id:any){
          //delete api call
       this.api.deleteWishlist(id ).subscribe((result:any)=>{
        this.allwishlistItem=result
        // alert("Product deleted Successfully")
      },
      (result:any)=>{
        alert(result.error)
      })

    }

   addToCart(product:any){
      //add quantity to cart
     Object.assign(product,{ quantity:1 })
     console.log(product);
     
     //api call to add quantity
     this.api.addToCart(product).subscribe((result:any)=>{
       //call cart count
       this.api.cartCount()
       this.deleteWishlist(product.id)
       alert(result)//added to cart
     },
     (result:any)=>{
       alert(result.error)//error message
     })
   }


}
