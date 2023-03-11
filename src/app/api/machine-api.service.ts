import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MachineApiService {
  readonly URL = "https://amperoid.tenants.foodji.io/machines/4bf115ee-303a-4089-a3ea-f6e7aae0ab94";

  constructor(private http: HttpClient) { }

  getMachine() {
    return this.http.get<ApiResponse<Machine>>(this.URL);
  }

}

export interface ApiResponse<T> {
  apiVersion: string;
  status: string;
  data: T;
}

export interface Machine {
  id: string;
  name: string;
  machineProducts: Product[];
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  manufacturer: string;
  imageSet: ImageSet[];
  attributesMap: { freshProduct: ProductAttribute };
}

export interface ProductAttribute {
  name: string;
  value: boolean;
}

export interface ImageSet {
  id: string;
  title: string;
  url: string;
  fileName: string;
}
