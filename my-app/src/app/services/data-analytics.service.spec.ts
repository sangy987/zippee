import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataAnalyticsService } from './data-analytics.service';

describe('DataAnalyticsService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [DataAnalyticsService]
  }));

   it('should be created', () => {
    const service: DataAnalyticsService = TestBed.get(DataAnalyticsService);
    expect(service).toBeTruthy();
   });

});