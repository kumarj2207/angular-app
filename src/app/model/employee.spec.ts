import { Employee } from './employee';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee(1, "Rajeev", "Pune", "rajeev@gmail.com", "9422884299")).toBeTruthy();
  });
});
