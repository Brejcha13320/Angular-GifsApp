import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gitfs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = 'KTIMHmJykXcNSHPMuy9BOybXYFj08Wm6';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string) {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    this.http
      .get<SearchResponse>(
        `${this.serviceUrl}/search?api_key=${this.apiKey}&q=${tag}&limit=10`
      )
      .subscribe(({ data }) => {
        this.gifList = data;
      });
  }
}
