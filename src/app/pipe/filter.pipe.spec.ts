import { FilterPipe } from './filter.pipe';
import { ApiDataService } from '../service/api-data.service';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });
});
