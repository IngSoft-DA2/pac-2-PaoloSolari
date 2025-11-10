import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReflectionService {
  private readonly endpointUrl = '/api/reflection/importers';

  constructor(private readonly http: HttpClient) {}

  fetchImporterAssemblies(): Observable<string[]> {
    return this.http.get<string[]>(this.endpointUrl);
  }
}
