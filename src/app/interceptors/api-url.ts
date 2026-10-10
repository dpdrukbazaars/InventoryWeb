
import { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {

  const backendUrl = 'https://inventoryapi-axqp.onrender.com';

  let apiPath: string | null = null;

  if (req.url.startsWith('/api/')) {
    apiPath = req.url;
  } else if (req.url.startsWith('api/')) {
    apiPath = '/' + req.url;
  } else if (/^https?:\/\//i.test(req.url)) {
    try {
      const url = new URL(req.url);

      if (url.pathname.startsWith('/api/')) {
        apiPath = url.pathname + url.search + url.hash;
      }
    } catch {
      // Leave invalid URLs unchanged.
    }
  }

  if (apiPath) {
    return next(req.clone({
      url: backendUrl + apiPath
    }));
  }

  return next(req);
};
