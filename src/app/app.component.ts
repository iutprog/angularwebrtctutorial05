import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MediaService } from './services/media.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const mediaConstraints = {
  audio: false,
  video: true,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , CommonModule , FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'angularhttps';

   @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement> | undefined ;
 
   videoWidth:number = 640;
   videoHeight:number = 480;
   mediaGranted : boolean = false;
   supportedConstraints: any ={};
   trackCapabilities: MediaTrackCapabilities | null=null;

   constructor (private mediaService: MediaService){}


  ngOnInit(): void {
     
  }

    async requestMediaAccess(){

      this.mediaGranted = await this.mediaService.requestMediaAccess(mediaConstraints);

       if(this.mediaGranted){
          console.log('Media Access Granted to you ')
       }else {
        console.log('Media Access Denied to you ')
       }
   }

  attachStream(){
    if(this.mediaGranted && this.videoElement){
       this.mediaService.AttachMediaStream(this.videoElement.nativeElement);
    }else{
      console.log('Stream not available or media access was not granted.');
    }
  }


  stopStream(){
    this.mediaService.stopMediaStream();
    if(this.videoElement){
      this.videoElement.nativeElement.srcObject = null; 
    }
  }


  applyVideoSize(){
     if(this.videoElement){
      this.videoElement.nativeElement.width= this.videoWidth;
      this.videoElement.nativeElement.height= this.videoHeight;
      console.log(`Video size changed to ${this.videoWidth}x ${this.videoHeight}`);
     }
  }

  //Fet the supported constraints and track capabilities
  getCapabilitiesAndConstraints(){
    this.trackCapabilities = this.mediaService.getTrackCapabilities();
    if(this.trackCapabilities){
      console.log('Track Capabilities : ', this.trackCapabilities);
    }
  }
  modifyVideoTrackSize(){
    const success = this.mediaService.modifyVideoTrackSize(this.videoWidth, this.videoHeight);
    if(success){
      console.log(`Track size modified to ${this.videoWidth}x${this.videoHeight}`);
    }
    else{
      console.log('Unable to modify video track size');
    }

  }
}
