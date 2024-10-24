import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {


  private stream :  MediaStream | null=null ;
  
  constructor() { }

     async requestMediaAccess( constraints: MediaStreamConstraints): Promise<boolean>{

       try{

         this.stream = await await navigator.mediaDevices.getUserMedia(constraints);
         return true ; //  permission is granted
       }catch(err){
        console.error('Access to media devices denied' , err);
        return false;
       }
     }


     AttachMediaStream ( videoElement:HTMLVideoElement):void{
      
      if(this.stream){
        videoElement.srcObject = this.stream;

      }else{
         console.error(' No media steam available to attach');
      }

     }

     stopMediaStream():void{
      if(this.stream){
          const tracks = this.stream.getTracks();
          console.log(' My STREAM TRACKS : ' , tracks);
         this.stream.getTracks().forEach(track =>{ track.stop();});
         this.stream = null;
         console.log('Media stream stopped !!!')
      }else{
         console.error(' No media steam available to stop');
      }
     }

     //Get supported contraints for the media track
     getSupportedConstraints(){
       return navigator.mediaDevices.getSupportedConstraints();
     }

     // Get capabilities of the video track
     getTrackCapabilities(): MediaTrackCapabilities | null {
       if( this.stream){
         const videoTrack = this.stream.getVideoTracks()[0];
         return videoTrack.getCapabilities();
       }
       return null;
     }

     modifyVideoTrackSize( width:number , height:number):boolean{
        if(this.stream){
           const videoTrack = this.stream?.getVideoTracks()[0];
           const trackCapabilities = videoTrack?.getCapabilities();

            if(trackCapabilities?.width && trackCapabilities?.height ){
              videoTrack?.applyConstraints({
                 width: {ideal:width},
                 height: {ideal:height}
              });
              return true;
            }
        }
        return false;

     }

}
