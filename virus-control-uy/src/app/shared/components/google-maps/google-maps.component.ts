import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { Ciudadano } from '@shared/model/Ciudadano';
import { AuxiliaresService } from '@shared/services/auxiliares.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent   {
  
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  @Input() coords: { lat: number; lng: number };
  center = {lat: -34.901113, lng: -56.164531};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  constructor(private auxiliarService: AuxiliaresService) {
    console.log('coords: ', this.coords);
    
  }
  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

  /*@ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  @Input() coords: { lat: number; lng: number };

  center = {
    lat: -34.901113,
    lng: -56.164531,
  };
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerPosition: google.maps.LatLngLiteral;
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  constructor(private auxiliarService: AuxiliaresService) {}

  ngOnInit(): void {
    //this.getCoordenadas();
  }

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }*/
}
