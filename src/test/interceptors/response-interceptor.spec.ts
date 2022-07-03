import { firstValueFrom, of } from 'rxjs';
import { ResponseInterceptor } from '../../interceptors';
describe('ResponseInterceptor', () => {
  const mockContext: any = {
    switchToHttp: () => ({
      getResponse: () => ({
        statusCode: 200,
        message: 'message',
      }),
    }),
  };

  const mockNest: any = {
    handle: () => of({ bodyMock: 'mock' }),
  };

  let responseInterceptor: ResponseInterceptor<any>;
  beforeEach(() => {
    responseInterceptor = new ResponseInterceptor();
  });

  it('should return a Response', async () => {
    const response = await firstValueFrom(responseInterceptor.intercept(mockContext, mockNest));
    expect(response).toEqual({
      body: expect.any(Object),
      statusCode: expect.any(Number),
      message: expect.any(String),
    });
  });
});
