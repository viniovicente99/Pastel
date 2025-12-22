import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment"; 
import { Post } from "../models/post.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root' 
})

export class PostService{

    private url = environment.api

    constructor(private httpClient: HttpClient){
        
    };

    getPosts(){
        return this.httpClient.get<Post[]>(`${this.url}/posts/all`);        
    };

    createPost(formData : FormData){
        return this.httpClient.post<any>(`${this.url}/posts/create`, formData);
    };

    getPostById(id: string): Observable<Post>{
        return this.httpClient.get<Post>(`${this.url}/posts/view/${id}`);
    };

    myPosts(){

        const token = localStorage.getItem('accessToken');

        return this.httpClient.get<Post[]>(`${this.url}/posts/my-posts`,
            { headers: {
                Authorization: `Bearer ${token}`
            }
          }
        );
    };

    deletePost(id: string) {
        const token = localStorage.getItem('accessToken');

        return this.httpClient.delete<any>(`${this.url}/posts/delete/${id}`,
            { headers: {
                Authorization: `Bearer ${token}`
            } 
          }
        )
    };

    editPost(id: string, formData: FormData) {
        const token = localStorage.getItem('accessToken');

        return this.httpClient.patch(`${this.url}/posts/edit/${id}`, formData,
            { headers: {
                Authorization: `Bearer ${token}`
            } 
          }
        )
    };

    searchPost(term: string){
     const params = new HttpParams().set('term', term);

     return this.httpClient.get<Post[]>(`${this.url}/posts/search`, {params});
    }

};