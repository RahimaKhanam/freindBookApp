import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://3.17.216.66:3000/';

  createPost(postData: any) {
    return this.http.post(this.apiurl + 'posts/createpost', postData)
  }

  allPosts(){
    return this.http.get(this.apiurl+ 'posts/')
  }

  getPostsByPostId(postId: any){
    // key is post id
    return this.http.get(this.apiurl+ 'posts/' + postId);
  }

  getPostsByUserId(userId: any){
    // key is user id
    return this.http.post(this.apiurl+ 'posts/findpostbyuserid', {id: userId})
  }

  updateBulkPosts(updatePayLoad: any){
    // provide photoId and userId which will change all the userId whose all the posts will be updated with the provided photoId
    return this.http.post(this.apiurl + 'posts/updatemanyposts', updatePayLoad)
  }

  updatePost(updatedPost: any){
    return this.http.put(this.apiurl + 'posts/' + updatedPost.id, updatedPost)
  }

  deletePost(postId: any){
    return this.http.delete(this.apiurl + 'posts/' + postId)
  }

}
